import { assertBluetoothAvailable, type ConnectOptions } from '../ble/availability';
import { AsciiTransport } from './ascii-transport';
import {
  ANOVA_ASCII_SERVICE_UUID,
  ANOVA_CANDIDATE_SERVICES,
  ANOVA_DEVICE_INFO_CHARS,
  ANOVA_DEVICE_INFO_SERVICE,
  ANOVA_MINI_SERVICE_UUID,
  NANO_SERVICE_UUID,
  type TempUnit,
} from './constants';
import { MiniTransport } from './mini-transport';
import { ProtobufTransport } from './protobuf-transport';
import type { NanoSnapshot, NanoTransport } from './transport';

/** `isCooking` narrows to a definite boolean once the client has resolved it. */
export interface NanoStatus extends Omit<NanoSnapshot, 'isCooking'> {
  isCooking: boolean;
  /** Which wire protocol this cooker turned out to speak. */
  protocol: string | null;
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
  protocol: null,
  alerts: [],
  updatedAt: 0,
};

export interface NanoClientEvents {
  onStatus?: (status: NanoStatus) => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Connects to an Anova cooker and speaks whichever protocol it actually
 * exposes.
 *
 * Anova has shipped at least three incompatible BLE protocols across its
 * cookers, and the model name does not reliably predict which one a unit
 * implements — hardware sold as a "Precision Cooker Nano 3.0" turns out to
 * speak the Gen 3 JSON protocol that Anova documents under the Mini, not the
 * protobuf protocol documented under the Nano. So rather than trusting the
 * label, this probes the known services and reports what it actually found.
 */
export class NanoClient {
  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | null = null;
  private transport: NanoTransport | null = null;

  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private status: NanoStatus = { ...EMPTY_NANO_STATUS };
  /** Set optimistically by start/stop, for protocols that cannot report it. */
  private assumeCooking: boolean | null = null;

  /** Standard Device Information strings, when the cooker publishes them. */
  deviceInfo: Record<string, string> | null = null;

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
  async connect(options: ConnectOptions = {}): Promise<void> {
    await assertBluetoothAvailable();

    // Every candidate service has to be declared up front: Web Bluetooth will
    // not let you enumerate, or even look up, a service you did not ask for.
    const optionalServices: BluetoothServiceUUID[] = [
      ...ANOVA_CANDIDATE_SERVICES.map((candidate) => candidate.uuid),
      // Standard Device Information: model and firmware strings identify which
      // hardware revision a cooker actually is, which the box does not.
      ANOVA_DEVICE_INFO_SERVICE,
    ];

    // Filters match only advertised data, and Anova does not document whether
    // its cookers advertise their service UUIDs. Filters are OR'd, so the name
    // prefix is a second chance before falling back to an unfiltered chooser.
    this.device = await navigator.bluetooth.requestDevice(
      options.acceptAllDevices
        ? { acceptAllDevices: true, optionalServices }
        : {
            filters: [
              { services: [NANO_SERVICE_UUID] },
              { services: [ANOVA_ASCII_SERVICE_UUID] },
              { namePrefix: 'Anova' },
            ],
            optionalServices,
          },
    );

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

    this.server = await this.device.gatt.connect();
    await this.readDeviceInfo(this.server);
    this.transport = await this.selectTransport(this.server);

    this.status = { ...this.status, protocol: this.transport.label };
    await this.refresh();
    this.startPolling();
  }

  /** Best-effort: absence of Device Information is not an error. */
  private async readDeviceInfo(server: BluetoothRemoteGATTServer): Promise<void> {
    try {
      const service = await server.getPrimaryService(ANOVA_DEVICE_INFO_SERVICE);
      const decoder = new TextDecoder();
      const info: Record<string, string> = {};
      for (const [name, uuid] of Object.entries(ANOVA_DEVICE_INFO_CHARS)) {
        try {
          const characteristic = await service.getCharacteristic(uuid);
          info[name] = decoder.decode(await characteristic.readValue()).replace(/\s+$/, '');
        } catch {
          // characteristic absent
        }
      }
      this.deviceInfo = info;
      console.info('[SouperVide] Anova device information:', info);
    } catch {
      console.info('[SouperVide] No Device Information service on this cooker.');
    }
  }

  /**
   * Finds the first known Anova service the device exposes and wires up the
   * matching protocol. The error path names every service that was checked,
   * because "not the Nano" is not a useful thing to tell someone holding one.
   */
  private async selectTransport(server: BluetoothRemoteGATTServer): Promise<NanoTransport> {
    const found: { uuid: string; label: string; service: BluetoothRemoteGATTService }[] = [];

    for (const candidate of ANOVA_CANDIDATE_SERVICES) {
      try {
        found.push({ ...candidate, service: await server.getPrimaryService(candidate.uuid) });
      } catch {
        // Service absent on this device; try the next.
      }
    }

    const protobuf = found.find((entry) => entry.uuid === NANO_SERVICE_UUID);
    if (protobuf) {
      return ProtobufTransport.attach(protobuf.service, (alerts) => this.applyAlerts(alerts));
    }

    const ascii = found.find((entry) => entry.uuid === ANOVA_ASCII_SERVICE_UUID);
    if (ascii) return AsciiTransport.attach(ascii.service);

    const mini = found.find((entry) => entry.uuid === ANOVA_MINI_SERVICE_UUID);
    if (mini) return MiniTransport.attach(mini.service);

    const name = this.device?.name ?? 'That device';
    throw new Error(
      `“${name}” connected, but exposes none of Anova's known cooker services ` +
        `(${ANOVA_CANDIDATE_SERVICES.map((c) => c.label).join(', ')}). ` +
        `It may use a protocol Anova has not published.`,
    );
  }

  disconnect(): void {
    this.stopPolling();
    this.transport?.dispose(new Error('Disconnected'));
    this.transport = null;
    if (this.device?.gatt?.connected) this.device.gatt.disconnect();
    this.server = null;
  }

  private handleDisconnect = (): void => {
    this.stopPolling();
    this.transport?.dispose(new Error('Device disconnected'));
    this.transport = null;
    this.server = null;
    this.events.onDisconnect?.();
  };

  private applyAlerts(names: string[]): void {
    this.status = {
      ...this.status,
      alerts: names,
      waterLow: this.status.waterLow || names.includes('WATER_LOW'),
      waterLeak: this.status.waterLeak || names.includes('WATER_LEAK'),
    };
    this.events.onStatus?.(this.status);
  }

  private requireTransport(): NanoTransport {
    if (!this.transport || !this.connected) throw new Error('Not connected');
    return this.transport;
  }

  // ----------------------------------------------------------------- commands

  /** `temp` is in the cooker's current display unit. */
  async setTargetTemp(temp: number): Promise<void> {
    await this.requireTransport().setTargetTemp(temp);
    await this.refresh();
  }

  async setTimer(minutes: number): Promise<void> {
    await this.requireTransport().setTimer(minutes);
    await this.refresh();
  }

  async setTempUnit(unit: TempUnit): Promise<void> {
    await this.requireTransport().setUnit(unit);
    await this.refresh();
  }

  async startCooking(): Promise<void> {
    await this.requireTransport().startCooking();
    this.assumeCooking = true;
    await this.refresh();
  }

  async stopCooking(): Promise<void> {
    await this.requireTransport().stopCooking();
    this.assumeCooking = false;
    await this.refresh();
  }

  // ------------------------------------------------------------------- status

  async refresh(): Promise<NanoStatus> {
    const snapshot = await this.requireTransport().read();

    // Protocols that can report run state win; the optimistic flag only fills
    // the gap for those that cannot, and only until a real reading arrives.
    const isCooking = snapshot.isCooking ?? this.assumeCooking ?? false;
    if (snapshot.isCooking !== null) this.assumeCooking = null;

    this.status = {
      ...snapshot,
      isCooking,
      protocol: this.transport?.label ?? null,
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
