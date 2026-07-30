import {
  DomainType,
  ConfigDomainMessageType,
  FirmwareInfo,
  IntegerValue,
  SensorValueList,
  SysAlertBitVector,
} from './generated/nano.js';
import type { Bytes } from '../ble/bytes';
import { CobsFramer, cobsDecode, cobsEncode } from '../ble/cobs';
import {
  NANO_ASYNC_CHAR_UUID,
  NANO_CHUNK_SIZE,
  NANO_RX_CHAR_UUID,
  NANO_SERVICE_UUID,
  NANO_TX_CHAR_UUID,
  SET_UNIT_VALUE,
  TARGET_TEMP_SCALE,
  UNIT_TYPE_INFO,
  unitFromRaw,
  type TempUnit,
} from './constants';

const CONFIG_DOMAIN = DomainType.ANOVA_DOMAIN_ID_CONFIG; // 0
const COMMAND_TIMEOUT_MS = 6000;

/** Bit flags from `SysAlertBitVector`, which the ASYNC characteristic pushes. */
const ALERT_FLAGS = {
  COOKING_STARTED: 2,
  SET_POINT_REACHED: 4,
  WATER_LEAK: 16,
  WATER_LOW: 32,
  MOTOR_STUCK: 64,
  HEATER_OVER_TEMP: 128,
  TRIAC_OVER_TEMP: 256,
  COOKING_TIMER_STARTED: 512,
  COOKING_TIMER_EXPIRED: 8192,
} as const;

export interface NanoStatus {
  /** Water temperature in the device's current display unit. */
  waterTemp: number | null;
  /** Target temperature in the device's current display unit. */
  targetTemp: number | null;
  /** Remaining/configured cooking timer, in minutes. */
  timerMinutes: number | null;
  unit: TempUnit | null;
  isCooking: boolean;
  waterLow: boolean;
  waterLeak: boolean;
  motorSpeed: number | null;
  heaterTemp: number | null;
  /** Human-readable names of currently-asserted alert flags. */
  alerts: string[];
  updatedAt: number;
}

export const EMPTY_NANO_STATUS: NanoStatus = {
  waterTemp: null,
  targetTemp: null,
  timerMinutes: null,
  unit: null,
  isCooking: false,
  waterLow: false,
  waterLeak: false,
  motorSpeed: null,
  heaterTemp: null,
  alerts: [],
  updatedAt: 0,
};

interface PendingCommand {
  msgType: number;
  resolve: (payload: Uint8Array) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}

export interface NanoClientEvents {
  onStatus?: (status: NanoStatus) => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Talks to an Anova Nano over GATT.
 *
 * Wire format, per Anova's published spec and reference implementation:
 *   [domain byte][message-type byte][protobuf payload] -> COBS -> 0x00 -> 20-byte chunks
 *
 * Responses echo the same two-byte header before their payload. Only one
 * command may be in flight at a time — the RX characteristic carries no
 * correlation id, so responses are matched purely by order plus a header check.
 */
export class NanoClient {
  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | null = null;
  private txChar: BluetoothRemoteGATTCharacteristic | null = null;
  private framer = new CobsFramer();
  private asyncFramer = new CobsFramer();

  /** Serializes commands: every send chains onto the previous one. */
  private queue: Promise<unknown> = Promise.resolve();
  private pending: PendingCommand | null = null;

  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private status: NanoStatus = { ...EMPTY_NANO_STATUS };
  /** Set optimistically by start/stop, since the Nano exposes no "is cooking" read. */
  private assumeCooking = false;

  private readonly events: NanoClientEvents;

  constructor(events: NanoClientEvents = {}) {
    this.events = events;
  }

  get connected(): boolean {
    return this.server?.connected ?? false;
  }

  get deviceName(): string | null {
    return this.device?.name ?? null;
  }

  /** Opens Chrome's device chooser. Must be called from a user gesture. */
  async connect(): Promise<void> {
    if (!navigator.bluetooth) {
      throw new Error('Web Bluetooth is not available in this browser.');
    }

    this.device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [NANO_SERVICE_UUID] }],
      optionalServices: [NANO_SERVICE_UUID],
    });

    this.device.addEventListener('gattserverdisconnected', this.handleDisconnect);
    await this.openGatt();
  }

  /** Re-opens GATT on the already-chosen device, with no chooser prompt. */
  async reconnect(): Promise<void> {
    if (!this.device) throw new Error('No device has been selected yet.');
    await this.openGatt();
  }

  private async openGatt(): Promise<void> {
    if (!this.device?.gatt) throw new Error('Device does not expose a GATT server.');

    this.framer.reset();
    this.asyncFramer.reset();
    this.server = await this.device.gatt.connect();

    const service = await this.server.getPrimaryService(NANO_SERVICE_UUID);
    this.txChar = await service.getCharacteristic(NANO_TX_CHAR_UUID);

    const rxChar = await service.getCharacteristic(NANO_RX_CHAR_UUID);
    rxChar.addEventListener('characteristicvaluechanged', this.handleRxNotification);
    await rxChar.startNotifications();

    // The ASYNC characteristic is optional on some firmware; losing it costs us
    // unsolicited alerts but not core functionality, so failure is not fatal.
    try {
      const asyncChar = await service.getCharacteristic(NANO_ASYNC_CHAR_UUID);
      asyncChar.addEventListener('characteristicvaluechanged', this.handleAsyncNotification);
      await asyncChar.startNotifications();
    } catch {
      // ignored on purpose
    }

    await this.refresh();
    this.startPolling();
  }

  disconnect(): void {
    this.stopPolling();
    this.failPending(new Error('Disconnected'));
    if (this.device?.gatt?.connected) this.device.gatt.disconnect();
    this.server = null;
    this.txChar = null;
  }

  private handleDisconnect = (): void => {
    this.stopPolling();
    this.failPending(new Error('Device disconnected'));
    this.server = null;
    this.txChar = null;
    this.events.onDisconnect?.();
  };

  // ---------------------------------------------------------------- transport

  private handleRxNotification = (event: Event): void => {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (!value) return;

    for (const frame of this.framer.push(new Uint8Array(value.buffer))) {
      if (!this.pending) continue; // unsolicited traffic on RX — nothing is waiting

      try {
        const decoded = cobsDecode(frame);
        if (decoded.length < 2) throw new Error('Response frame is too short for a header');
        // Match on the domain byte only. Not every command echoes the request's
        // message type in its ack, and requiring an exact match would stall the
        // queue on those; a wrong-domain frame is the only unambiguous mismatch.
        if (decoded[0] !== CONFIG_DOMAIN) continue;
        this.settlePending(null, decoded.subarray(2));
      } catch (error) {
        this.settlePending(error as Error);
      }
    }
  };

  private handleAsyncNotification = (event: Event): void => {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (!value) return;

    for (const frame of this.asyncFramer.push(new Uint8Array(value.buffer))) {
      try {
        const decoded = cobsDecode(frame);
        if (decoded.length < 3) continue;
        if (decoded[1] !== ConfigDomainMessageType.SYSTEM_ALERT_VECTOR) continue;

        const alert = SysAlertBitVector.decode(decoded.subarray(2));
        this.applyAlertVector(alert.currVector);
      } catch {
        // Malformed async frames are informational-only; drop them quietly.
      }
    }
  };

  private applyAlertVector(vector: number): void {
    const names: string[] = [];
    for (const [name, bit] of Object.entries(ALERT_FLAGS)) {
      if (vector & bit) names.push(name);
    }

    this.status = {
      ...this.status,
      alerts: names,
      waterLow: this.status.waterLow || (vector & ALERT_FLAGS.WATER_LOW) !== 0,
      waterLeak: this.status.waterLeak || (vector & ALERT_FLAGS.WATER_LEAK) !== 0,
    };
    this.events.onStatus?.(this.status);
  }

  private settlePending(error: Error | null, payload?: Uint8Array): void {
    const pending = this.pending;
    if (!pending) return;
    this.pending = null;
    clearTimeout(pending.timer);
    if (error) pending.reject(error);
    else pending.resolve(payload ?? new Uint8Array());
  }

  private failPending(error: Error): void {
    this.settlePending(error);
  }

  /**
   * Sends one framed command and resolves with the response payload (header
   * stripped). Calls are serialized through `this.queue`.
   */
  private send(msgType: number, payload?: Uint8Array): Promise<Uint8Array> {
    const run = async (): Promise<Uint8Array> => {
      const tx = this.txChar;
      if (!tx || !this.connected) throw new Error('Not connected');

      const body: Bytes = new Uint8Array(2 + (payload?.length ?? 0));
      body[0] = CONFIG_DOMAIN;
      body[1] = msgType;
      if (payload) body.set(payload, 2);

      const frame = cobsEncode(body);

      const response = new Promise<Uint8Array>((resolve, reject) => {
        this.pending = {
          msgType,
          resolve,
          reject,
          timer: setTimeout(() => {
            this.pending = null;
            reject(new Error(`Timed out waiting for response to message type ${msgType}`));
          }, COMMAND_TIMEOUT_MS),
        };
      });

      for (let i = 0; i < frame.length; i += NANO_CHUNK_SIZE) {
        const chunk = frame.subarray(i, i + NANO_CHUNK_SIZE);
        if (tx.properties.write) await tx.writeValueWithResponse(chunk);
        else await tx.writeValueWithoutResponse(chunk);
      }

      return response;
    };

    // Chain onto the queue, but keep the queue alive when a command fails.
    const result = this.queue.then(run, run);
    this.queue = result.catch(() => undefined);
    return result;
  }

  private async sendInteger(msgType: number, value: number): Promise<Uint8Array> {
    const payload = IntegerValue.encode(IntegerValue.create({ value })).finish();
    return this.send(msgType, payload);
  }

  private static decodeInteger(payload: Uint8Array): number {
    return IntegerValue.decode(payload).value;
  }

  // ----------------------------------------------------------------- commands

  async getTempUnit(): Promise<TempUnit | null> {
    const payload = await this.send(ConfigDomainMessageType.GET_TEMP_UNITS);
    return unitFromRaw(NanoClient.decodeInteger(payload));
  }

  async setTempUnit(unit: TempUnit): Promise<void> {
    await this.sendInteger(ConfigDomainMessageType.SET_TEMP_UNITS, SET_UNIT_VALUE[unit]);
    await this.refresh();
  }

  async getTargetTemp(): Promise<number> {
    const payload = await this.send(ConfigDomainMessageType.GET_TEMP_SETPOINT);
    return NanoClient.decodeInteger(payload) / TARGET_TEMP_SCALE;
  }

  /** `temp` is in the device's current display unit. */
  async setTargetTemp(temp: number): Promise<void> {
    await this.sendInteger(
      ConfigDomainMessageType.SET_TEMP_SETPOINT,
      Math.round(temp * TARGET_TEMP_SCALE),
    );
    await this.refresh();
  }

  async getTimer(): Promise<number> {
    const payload = await this.send(ConfigDomainMessageType.GET_COOKING_TIMER);
    return NanoClient.decodeInteger(payload);
  }

  /** The Nano's cooking timer is expressed in whole minutes. */
  async setTimer(minutes: number): Promise<void> {
    await this.sendInteger(ConfigDomainMessageType.SET_COOKING_TIMER, Math.round(minutes));
    await this.refresh();
  }

  async startCooking(): Promise<void> {
    await this.send(ConfigDomainMessageType.START_COOKING);
    this.assumeCooking = true;
    await this.refresh();
  }

  async stopCooking(): Promise<void> {
    await this.send(ConfigDomainMessageType.STOP_COOKING);
    this.assumeCooking = false;
    await this.refresh();
  }

  async getFirmwareInfo(): Promise<{ commitId: string; tagId: string; dateCode: number }> {
    const payload = await this.send(ConfigDomainMessageType.GET_FIRMWARE_INFO);
    const info = FirmwareInfo.decode(payload);
    return { commitId: info.commitId, tagId: info.tagId, dateCode: info.dateCode };
  }

  // ------------------------------------------------------------------- status

  /** Reads every value the dashboard shows, in one pass. */
  async refresh(): Promise<NanoStatus> {
    const sensorsPayload = await this.send(ConfigDomainMessageType.GET_SENSORS);
    const sensors = SensorValueList.decode(sensorsPayload);

    let waterTemp: number | null = null;
    let heaterTemp: number | null = null;
    let motorSpeed: number | null = null;
    let waterLow = false;
    let waterLeak = false;

    for (const sensor of sensors.values) {
      const info = UNIT_TYPE_INFO[sensor.units];
      const scaled = info ? sensor.value / info.scale : sensor.value;
      switch (sensor.sensorType) {
        case 0: // WaterTemp
          waterTemp = scaled;
          break;
        case 1: // HeaterTemp
          heaterTemp = scaled;
          break;
        case 5: // WaterLow
          waterLow = sensor.value !== 0;
          break;
        case 6: // WaterLeak
          waterLeak = sensor.value !== 0;
          break;
        case 7: // MotorSpeed
          motorSpeed = sensor.value;
          break;
      }
    }

    const [unit, targetTemp, timerMinutes] = await Promise.all([
      this.getTempUnit(),
      this.getTargetTemp(),
      this.getTimer(),
    ]);

    // The Nano has no "am I cooking?" query. A spinning circulator is the one
    // directly observable signal; the optimistic flag covers the window before
    // the motor spins up.
    const isCooking = motorSpeed !== null ? motorSpeed > 0 || this.assumeCooking : this.assumeCooking;

    this.status = {
      waterTemp,
      targetTemp,
      timerMinutes,
      unit,
      isCooking,
      waterLow,
      waterLeak,
      motorSpeed,
      heaterTemp,
      alerts: this.status.alerts,
      updatedAt: Date.now(),
    };
    this.events.onStatus?.(this.status);
    return this.status;
  }

  private startPolling(intervalMs = 5000): void {
    this.stopPolling();
    this.pollTimer = setInterval(() => {
      if (!this.connected) return;
      this.refresh().catch((error: Error) => this.events.onError?.(error));
    }, intervalMs);
  }

  private stopPolling(): void {
    if (this.pollTimer !== null) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }
}
