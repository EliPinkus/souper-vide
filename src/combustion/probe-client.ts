import {
  DEVICE_INFO_SERVICE_UUID,
  FIRMWARE_REVISION_CHAR_UUID,
  PROBE_STATUS_CHAR_UUID,
  PROBE_STATUS_SERVICE_UUID,
  PredictionMode,
  SERIAL_NUMBER_CHAR_UUID,
  UART_RX_CHAR_UUID,
  UART_SERVICE_UUID,
  UART_TX_CHAR_UUID,
  UartMessageType,
} from './constants';
import { assertBluetoothAvailable, type ConnectOptions } from '../ble/availability';
import type { Bytes } from '../ble/bytes';
import { parseProbeStatus, type ProbeStatus } from './probe-status';
import {
  UartParser,
  buildRequest,
  buildSetPrediction,
  parseSessionInformation,
  type SessionInformation,
  type UartResponse,
} from './uart';

const COMMAND_TIMEOUT_MS = 6000;
const UART_CHUNK_SIZE = 20;

export interface ProbeInfo {
  serialNumber: string | null;
  firmwareRevision: string | null;
}

export interface ProbeClientEvents {
  onStatus?: (status: ProbeStatus) => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

interface PendingRequest {
  type: UartMessageType;
  resolve: (response: UartResponse) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}

/**
 * Talks to a Combustion Predictive Thermometer over GATT.
 *
 * Status arrives unsolicited on the Probe Status characteristic every time the
 * probe takes a measurement, so there is no poll loop here — the probe drives
 * the update rate. Settings changes go out over the Nordic UART service.
 */
export class ProbeClient {
  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | null = null;
  private uartRx: BluetoothRemoteGATTCharacteristic | null = null;
  private parser = new UartParser();

  private queue: Promise<unknown> = Promise.resolve();
  private pending: PendingRequest | null = null;

  private info: ProbeInfo = { serialNumber: null, firmwareRevision: null };

  private readonly events: ProbeClientEvents;

  constructor(events: ProbeClientEvents = {}) {
    this.events = events;
  }

  get connected(): boolean {
    return this.server?.connected ?? false;
  }

  get deviceName(): string | null {
    return this.device?.name ?? null;
  }

  get deviceInfo(): ProbeInfo {
    return this.info;
  }

  /** Opens Chrome's device chooser. Must be called from a user gesture. */
  async connect(options: ConnectOptions = {}): Promise<void> {
    await assertBluetoothAvailable();

    // Combustion documents the Probe Status UUID as being in the scan response,
    // so the filter should hold. The probe advertises no name, so there is no
    // useful name prefix to OR in — acceptAll is the only widening available.
    const optionalServices = [
      PROBE_STATUS_SERVICE_UUID,
      UART_SERVICE_UUID,
      DEVICE_INFO_SERVICE_UUID,
    ];
    this.device = await navigator.bluetooth.requestDevice(
      options.acceptAllDevices
        ? { acceptAllDevices: true, optionalServices }
        : { filters: [{ services: [PROBE_STATUS_SERVICE_UUID] }], optionalServices },
    );

    this.device.addEventListener('gattserverdisconnected', this.handleDisconnect);
    await this.openGatt();
  }

  /** Re-opens GATT on the already-chosen probe, with no chooser prompt. */
  async reconnect(): Promise<void> {
    if (!this.device) throw new Error('No probe has been selected yet.');
    await this.openGatt();
  }

  private async openGatt(): Promise<void> {
    if (!this.device?.gatt) throw new Error('Device does not expose a GATT server.');

    this.parser.reset();
    this.server = await this.device.gatt.connect();

    let statusService: BluetoothRemoteGATTService;
    try {
      statusService = await this.server.getPrimaryService(PROBE_STATUS_SERVICE_UUID);
    } catch {
      throw new Error(
        `“${this.device.name ?? 'That device'}” does not expose Combustion's Probe Status service, so it is probably not the probe.`,
      );
    }

    const statusChar = await statusService.getCharacteristic(PROBE_STATUS_CHAR_UUID);
    statusChar.addEventListener('characteristicvaluechanged', this.handleStatusNotification);
    await statusChar.startNotifications();

    // Seed the UI immediately rather than waiting for the probe's next sample.
    try {
      const initial = await statusChar.readValue();
      this.emitStatus(new Uint8Array(initial.buffer));
    } catch {
      // Some firmware exposes notify-only; the first notification will fill in.
    }

    const uartService = await this.server.getPrimaryService(UART_SERVICE_UUID);
    this.uartRx = await uartService.getCharacteristic(UART_RX_CHAR_UUID);
    const uartTx = await uartService.getCharacteristic(UART_TX_CHAR_UUID);
    uartTx.addEventListener('characteristicvaluechanged', this.handleUartNotification);
    await uartTx.startNotifications();

    await this.readDeviceInfo();
  }

  disconnect(): void {
    this.failPending(new Error('Disconnected'));
    if (this.device?.gatt?.connected) this.device.gatt.disconnect();
    this.server = null;
    this.uartRx = null;
  }

  private handleDisconnect = (): void => {
    this.failPending(new Error('Probe disconnected'));
    this.server = null;
    this.uartRx = null;
    this.events.onDisconnect?.();
  };

  private async readDeviceInfo(): Promise<void> {
    try {
      const service = await this.server!.getPrimaryService(DEVICE_INFO_SERVICE_UUID);
      const decoder = new TextDecoder();
      const read = async (uuid: number): Promise<string | null> => {
        try {
          const char = await service.getCharacteristic(uuid);
          // GATT string characteristics are often null-padded to a fixed width.
          const raw = decoder.decode(await char.readValue());
          const nul = raw.indexOf(String.fromCharCode(0));
          return (nul === -1 ? raw : raw.slice(0, nul)).trim();
        } catch {
          return null;
        }
      };
      this.info = {
        serialNumber: await read(SERIAL_NUMBER_CHAR_UUID),
        firmwareRevision: await read(FIRMWARE_REVISION_CHAR_UUID),
      };
    } catch {
      // Device Information is nice-to-have; absence is not an error.
    }
  }

  // ---------------------------------------------------------------- transport

  private handleStatusNotification = (event: Event): void => {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (!value) return;
    this.emitStatus(new Uint8Array(value.buffer));
  };

  private emitStatus(bytes: Uint8Array): void {
    try {
      this.events.onStatus?.(parseProbeStatus(bytes));
    } catch (error) {
      this.events.onError?.(error as Error);
    }
  }

  private handleUartNotification = (event: Event): void => {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (!value) return;

    for (const response of this.parser.push(new Uint8Array(value.buffer))) {
      const pending = this.pending;
      if (!pending || pending.type !== response.type) continue;
      this.pending = null;
      clearTimeout(pending.timer);
      if (response.success) pending.resolve(response);
      else pending.reject(new Error(`Probe rejected message type 0x${response.type.toString(16)}`));
    }
  };

  private failPending(error: Error): void {
    const pending = this.pending;
    if (!pending) return;
    this.pending = null;
    clearTimeout(pending.timer);
    pending.reject(error);
  }

  /** Writes one framed request and waits for the matching response. */
  private request(type: UartMessageType, frame: Bytes): Promise<UartResponse> {
    const run = async (): Promise<UartResponse> => {
      const rx = this.uartRx;
      if (!rx || !this.connected) throw new Error('Not connected');

      const response = new Promise<UartResponse>((resolve, reject) => {
        this.pending = {
          type,
          resolve,
          reject,
          timer: setTimeout(() => {
            this.pending = null;
            reject(new Error(`Timed out waiting for a response to 0x${type.toString(16)}`));
          }, COMMAND_TIMEOUT_MS),
        };
      });

      for (let i = 0; i < frame.length; i += UART_CHUNK_SIZE) {
        await rx.writeValueWithoutResponse(frame.subarray(i, i + UART_CHUNK_SIZE));
      }

      return response;
    };

    const result = this.queue.then(run, run);
    this.queue = result.catch(() => undefined);
    return result;
  }

  // ----------------------------------------------------------------- commands

  /**
   * Sets the removal-temperature target, in °C.
   *
   * `PredictionMode.TimeToRemoval` is the mode the Combustion app uses for a
   * plain "tell me when it hits this temperature" cook.
   */
  async setRemovalTarget(setPointC: number, mode = PredictionMode.TimeToRemoval): Promise<void> {
    await this.request(UartMessageType.SetPrediction, buildSetPrediction(setPointC, mode));
  }

  /** Clears the active prediction. */
  async clearPrediction(): Promise<void> {
    await this.request(UartMessageType.SetPrediction, buildSetPrediction(0, PredictionMode.None));
  }

  async readSessionInformation(): Promise<SessionInformation> {
    const response = await this.request(
      UartMessageType.ReadSessionInfo,
      buildRequest(UartMessageType.ReadSessionInfo),
    );
    return parseSessionInformation(response.payload);
  }
}
