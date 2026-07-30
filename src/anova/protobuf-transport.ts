import {
  ConfigDomainMessageType,
  DomainType,
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
  NANO_TX_CHAR_UUID,
  SET_UNIT_VALUE,
  TARGET_TEMP_SCALE,
  UNIT_TYPE_INFO,
  unitFromRaw,
  type TempUnit,
} from './constants';
import { EMPTY_SNAPSHOT, type NanoSnapshot, type NanoTransport } from './transport';

const CONFIG_DOMAIN = DomainType.ANOVA_DOMAIN_ID_CONFIG; // 0
const COMMAND_TIMEOUT_MS = 6000;

/** Bit flags from `SysAlertBitVector`, which the ASYNC characteristic pushes. */
export const ALERT_FLAGS = {
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

interface PendingCommand {
  resolve: (payload: Uint8Array) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}

/**
 * Anova's protobuf protocol for the Nano.
 *
 *   [domain byte][message-type byte][protobuf payload] -> COBS -> 0x00 -> 20-byte chunks
 *
 * Responses echo the same two-byte header before their payload. Only one
 * command may be in flight at a time — the RX characteristic carries no
 * correlation id, so responses are matched by order plus a domain check.
 */
export class ProtobufTransport implements NanoTransport {
  readonly label = 'Nano protobuf protocol';

  private framer = new CobsFramer();
  private asyncFramer = new CobsFramer();
  private queue: Promise<unknown> = Promise.resolve();
  private pending: PendingCommand | null = null;

  private readonly txChar: BluetoothRemoteGATTCharacteristic;
  private readonly rxChar: BluetoothRemoteGATTCharacteristic;
  private readonly asyncChar: BluetoothRemoteGATTCharacteristic | null;
  private readonly onAlerts: (names: string[]) => void;

  constructor(
    txChar: BluetoothRemoteGATTCharacteristic,
    rxChar: BluetoothRemoteGATTCharacteristic,
    asyncChar: BluetoothRemoteGATTCharacteristic | null,
    onAlerts: (names: string[]) => void,
  ) {
    this.txChar = txChar;
    this.rxChar = rxChar;
    this.asyncChar = asyncChar;
    this.onAlerts = onAlerts;

    rxChar.addEventListener('characteristicvaluechanged', this.handleRx);
    asyncChar?.addEventListener('characteristicvaluechanged', this.handleAsync);
  }

  static async attach(
    service: BluetoothRemoteGATTService,
    onAlerts: (names: string[]) => void,
  ): Promise<ProtobufTransport> {
    const txChar = await service.getCharacteristic(NANO_TX_CHAR_UUID);
    const rxChar = await service.getCharacteristic(NANO_RX_CHAR_UUID);
    await rxChar.startNotifications();

    // The ASYNC characteristic is optional on some firmware; losing it costs
    // unsolicited alerts but not core functionality, so failure is not fatal.
    let asyncChar: BluetoothRemoteGATTCharacteristic | null = null;
    try {
      asyncChar = await service.getCharacteristic(NANO_ASYNC_CHAR_UUID);
      await asyncChar.startNotifications();
    } catch {
      asyncChar = null;
    }

    return new ProtobufTransport(txChar, rxChar, asyncChar, onAlerts);
  }

  dispose(error: Error): void {
    this.rxChar.removeEventListener('characteristicvaluechanged', this.handleRx);
    this.asyncChar?.removeEventListener('characteristicvaluechanged', this.handleAsync);
    this.settle(error);
  }

  // ---------------------------------------------------------------- transport

  private handleRx = (event: Event): void => {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (!value) return;

    for (const frame of this.framer.push(new Uint8Array(value.buffer))) {
      if (!this.pending) continue; // unsolicited traffic — nothing is waiting

      try {
        const decoded = cobsDecode(frame);
        if (decoded.length < 2) throw new Error('Response frame is too short for a header');
        // Match on the domain byte only. Not every command echoes the request's
        // message type in its ack, and requiring an exact match would stall the
        // queue on those; a wrong-domain frame is the only unambiguous mismatch.
        if (decoded[0] !== CONFIG_DOMAIN) continue;
        this.settle(null, decoded.subarray(2));
      } catch (error) {
        this.settle(error as Error);
      }
    }
  };

  private handleAsync = (event: Event): void => {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (!value) return;

    for (const frame of this.asyncFramer.push(new Uint8Array(value.buffer))) {
      try {
        const decoded = cobsDecode(frame);
        if (decoded.length < 3) continue;
        if (decoded[1] !== ConfigDomainMessageType.SYSTEM_ALERT_VECTOR) continue;

        const vector = SysAlertBitVector.decode(decoded.subarray(2)).currVector;
        this.onAlerts(Object.entries(ALERT_FLAGS).filter(([, bit]) => vector & bit).map(([name]) => name));
      } catch {
        // Malformed async frames are informational-only; drop them quietly.
      }
    }
  };

  private settle(error: Error | null, payload?: Uint8Array): void {
    const pending = this.pending;
    if (!pending) return;
    this.pending = null;
    clearTimeout(pending.timer);
    if (error) pending.reject(error);
    else pending.resolve(payload ?? new Uint8Array());
  }

  private send(msgType: number, payload?: Uint8Array): Promise<Uint8Array> {
    const run = async (): Promise<Uint8Array> => {
      const body: Bytes = new Uint8Array(2 + (payload?.length ?? 0));
      body[0] = CONFIG_DOMAIN;
      body[1] = msgType;
      if (payload) body.set(payload, 2);

      const frame = cobsEncode(body);

      const response = new Promise<Uint8Array>((resolve, reject) => {
        this.pending = {
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
        if (this.txChar.properties.write) await this.txChar.writeValueWithResponse(chunk);
        else await this.txChar.writeValueWithoutResponse(chunk);
      }

      return response;
    };

    const result = this.queue.then(run, run);
    this.queue = result.catch(() => undefined);
    return result;
  }

  private sendInteger(msgType: number, value: number): Promise<Uint8Array> {
    return this.send(msgType, IntegerValue.encode(IntegerValue.create({ value })).finish());
  }

  private static decodeInteger(payload: Uint8Array): number {
    return IntegerValue.decode(payload).value;
  }

  // ----------------------------------------------------------------- commands

  async read(): Promise<NanoSnapshot> {
    const sensors = SensorValueList.decode(await this.send(ConfigDomainMessageType.GET_SENSORS));

    let waterTemp: number | null = null;
    let heaterTemp: number | null = null;
    let motorSpeed: number | null = null;
    let waterLow = false;
    let waterLeak = false;

    for (const sensor of sensors.values) {
      const info = UNIT_TYPE_INFO[sensor.units];
      const scaled = info ? sensor.value / info.scale : sensor.value;
      switch (sensor.sensorType) {
        case 0: waterTemp = scaled; break;
        case 1: heaterTemp = scaled; break;
        case 5: waterLow = sensor.value !== 0; break;
        case 6: waterLeak = sensor.value !== 0; break;
        case 7: motorSpeed = sensor.value; break;
      }
    }

    const unit = unitFromRaw(
      ProtobufTransport.decodeInteger(await this.send(ConfigDomainMessageType.GET_TEMP_UNITS)),
    );
    const targetTemp =
      ProtobufTransport.decodeInteger(await this.send(ConfigDomainMessageType.GET_TEMP_SETPOINT)) /
      TARGET_TEMP_SCALE;
    const timerMinutes = ProtobufTransport.decodeInteger(
      await this.send(ConfigDomainMessageType.GET_COOKING_TIMER),
    );

    return {
      ...EMPTY_SNAPSHOT,
      waterTemp,
      heaterTemp,
      motorSpeed,
      waterLow,
      waterLeak,
      unit,
      targetTemp,
      timerMinutes,
      // No "am I cooking?" query exists. A spinning circulator is the one
      // directly observable signal.
      isCooking: motorSpeed === null ? null : motorSpeed > 0,
    };
  }

  async setTargetTemp(temp: number): Promise<void> {
    await this.sendInteger(
      ConfigDomainMessageType.SET_TEMP_SETPOINT,
      Math.round(temp * TARGET_TEMP_SCALE),
    );
  }

  /** The Nano's cooking timer is expressed in whole minutes. */
  async setTimer(minutes: number): Promise<void> {
    await this.sendInteger(ConfigDomainMessageType.SET_COOKING_TIMER, Math.round(minutes));
  }

  async setUnit(unit: TempUnit): Promise<void> {
    await this.sendInteger(ConfigDomainMessageType.SET_TEMP_UNITS, SET_UNIT_VALUE[unit]);
  }

  async startCooking(): Promise<void> {
    await this.send(ConfigDomainMessageType.START_COOKING);
  }

  async stopCooking(): Promise<void> {
    await this.send(ConfigDomainMessageType.STOP_COOKING);
  }
}
