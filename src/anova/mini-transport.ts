import { MINI_CHARS, MINI_SET_CLOCK_ALT, type TempUnit } from './constants';
import { EMPTY_SNAPSHOT, type NanoSnapshot, type NanoTransport } from './transport';

/**
 * Anova's "Gen 3" protocol, per their `developer-project-mini` reference.
 *
 * Every payload is a JSON object, UTF-8 encoded, then base64 encoded, and the
 * base64 *text* is what goes on the wire. Reads come back the same way. There
 * are no notifications here — state is polled by reading characteristics.
 *
 * Field names confirmed by the reference implementation:
 *   CURRENT_TEMPERATURE -> { "current": number }
 *   STATE               -> { "temperatureUnit": "C" | "F", ... }
 *   set temperature     -> { "setpoint": number }
 *   change unit         -> { "command": "changeUnit", "payload": { "temperatureUnit": unit } }
 *   start               -> { "command": "start", "payload": { setpoint, timer, cookableId, cookableType } }
 *   stop                -> { "command": "stop" }
 *
 * Not every Gen 3 unit implements every characteristic — a Nano 3.0 has been
 * seen without SET_CLOCK in either of its two documented UUIDs. So the
 * characteristic list is enumerated on connect and everything optional
 * degrades rather than aborting the connection. The remaining STATE and TIMER
 * schemas are unpublished, so those are read defensively and the raw JSON is
 * kept on the snapshot for inspection.
 */
export class MiniTransport implements NanoTransport {
  readonly label = 'Gen 3 JSON protocol (Mini / Nano 3.0)';

  private readonly service: BluetoothRemoteGATTService;
  /** Lowercased UUIDs the device actually exposes; empty means "unknown". */
  private readonly available: Set<string>;
  /** The Mini only accepts a timer as part of `start`, so it is held here. */
  private pendingTimerSeconds: number | null = null;
  /** Populated when the device matches none of Anova's documented UUIDs. */
  private discovery: CharacteristicReport[] | null = null;
  /** Latest payload seen on each notifying characteristic, newest wins. */
  private readonly notifications = new Map<string, NotificationRecord>();
  private subscriptions: BluetoothRemoteGATTCharacteristic[] = [];

  constructor(service: BluetoothRemoteGATTService, available: Set<string>) {
    this.service = service;
    this.available = available;
  }

  static async attach(service: BluetoothRemoteGATTService): Promise<MiniTransport> {
    // Characteristics of an already-permitted service can be enumerated, so ask
    // the device what it implements instead of assuming the reference's list.
    let available = new Set<string>();
    try {
      const characteristics = await service.getCharacteristics();
      available = new Set(characteristics.map((entry) => entry.uuid.toLowerCase()));
      console.info('[SouperVide] Gen 3 characteristics found:', [...available]);
    } catch {
      // Enumeration unsupported; fall back to blind lookups.
    }

    const transport = new MiniTransport(service, available);

    // If none of the documented characteristics are present, this is a variant
    // Anova has not published. Read what it does have so the layout is visible
    // rather than leaving every field silently empty.
    const documented = Object.values(MINI_CHARS).map((uuid) => uuid.toLowerCase());
    if (available.size > 0 && !documented.some((uuid) => available.has(uuid))) {
      try {
        transport.discovery = await probeCharacteristics(service);
        console.info('[SouperVide] Undocumented Gen 3 layout. Probe:', transport.discovery);
        // These characteristics are write+notify with no read, so the only way
        // to see what they carry is to subscribe and wait. Purely passive.
        await transport.listenToEverything(service);
      } catch (error) {
        console.warn('[SouperVide] Characteristic probe failed.', error);
      }

      // A live handle for working out an undocumented layout from the console,
      // without a reload dropping the connection on every attempt.
      if (import.meta.env.DEV) {
        (window as unknown as Record<string, unknown>).__souperVideGen3 = { service, transport };
      }
    }
    // Anova's reference sets the clock immediately on connect. Do the same
    // where possible, but never let its absence block the connection — it is
    // housekeeping, not a prerequisite for reading or controlling the cooker.
    await transport.setClock();
    return transport;
  }

  dispose(): void {
    for (const characteristic of this.subscriptions) {
      characteristic.removeEventListener('characteristicvaluechanged', this.handleNotification);
      void characteristic.stopNotifications().catch(() => undefined);
    }
    this.subscriptions = [];
  }

  /** Subscribes to every notifying characteristic and records what arrives. */
  private async listenToEverything(service: BluetoothRemoteGATTService): Promise<void> {
    for (const characteristic of await service.getCharacteristics()) {
      if (!characteristic.properties.notify) continue;
      try {
        characteristic.addEventListener('characteristicvaluechanged', this.handleNotification);
        await characteristic.startNotifications();
        this.subscriptions.push(characteristic);
      } catch (error) {
        console.warn(`[SouperVide] Could not subscribe to ${characteristic.uuid}`, error);
      }
    }
  }

  private handleNotification = (event: Event): void => {
    const characteristic = event.target as BluetoothRemoteGATTCharacteristic;
    if (!characteristic.value) return;

    const decoded = decodeValue(characteristic.value);
    const previous = this.notifications.get(characteristic.uuid);
    this.notifications.set(characteristic.uuid, {
      count: (previous?.count ?? 0) + 1,
      encoding: decoded.encoding,
      value: decoded.value,
    });
    console.info('[SouperVide] notify', characteristic.uuid, decoded);
  };

  /** Everything heard so far, for inspection. */
  get heard(): Record<string, NotificationRecord> {
    return Object.fromEntries(this.notifications);
  }

  /** Whether a UUID is present. Unknown enumeration means "try it and see". */
  private has(uuid: string): boolean {
    return this.available.size === 0 || this.available.has(uuid.toLowerCase());
  }

  private firstAvailable(...uuids: string[]): string | null {
    return uuids.find((uuid) => this.has(uuid)) ?? null;
  }

  get characteristicUuids(): string[] {
    return [...this.available];
  }

  // ---------------------------------------------------------------- transport

  private async writeJson(uuid: string, payload: unknown, withResponse: boolean): Promise<void> {
    const characteristic = await this.service.getCharacteristic(uuid);
    const encoded = new TextEncoder().encode(btoa(JSON.stringify(payload)));
    // These are attribute writes, not a byte stream — no manual chunking. Web
    // Bluetooth performs a long write when the value exceeds the MTU.
    if (withResponse) await characteristic.writeValueWithResponse(encoded);
    else await characteristic.writeValueWithoutResponse(encoded);
  }

  /** Returns `{}` for a characteristic the device does not have or cannot read. */
  private async readJson(uuid: string): Promise<Record<string, unknown>> {
    if (!this.has(uuid)) return {};
    try {
      const characteristic = await this.service.getCharacteristic(uuid);
      const view = await characteristic.readValue();
      const text = new TextDecoder().decode(view).trim();
      if (text.length === 0) return {};
      const parsed: unknown = JSON.parse(atob(text));
      return typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : {};
    } catch {
      return {};
    }
  }

  private async setClock(): Promise<void> {
    const uuid = this.firstAvailable(MINI_CHARS.setClock, MINI_SET_CLOCK_ALT);
    if (!uuid) {
      console.info('[SouperVide] No SET_CLOCK characteristic on this cooker; skipping clock sync.');
      return;
    }

    const currentTime = new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');
    try {
      await this.writeJson(uuid, { currentTime }, true);
    } catch (error) {
      console.warn('[SouperVide] Clock sync failed; continuing without it.', error);
    }
  }

  // ----------------------------------------------------------------- commands

  async read(): Promise<NanoSnapshot> {
    const state = await this.readJson(MINI_CHARS.state);
    const temperature = await this.readJson(MINI_CHARS.currentTemperature);
    const timer = await this.readJson(MINI_CHARS.timer);

    const unit = parseUnit(state.temperatureUnit);
    const currentC = pickNumber(temperature, ['current', 'currentTemperature', 'value']);

    // Anova's reference reads `current` as Celsius and converts it to display in
    // Fahrenheit, while sending the setpoint in the device's own unit. The two
    // therefore live in different scales, and this follows the reference.
    const waterTemp = currentC === null ? null : unit === 'F' ? currentC * 1.8 + 32 : currentC;

    const timerSeconds = pickNumber(timer, ['current', 'remaining', 'initial', 'value', 'timer']);

    return {
      ...EMPTY_SNAPSHOT,
      unit,
      waterTemp,
      targetTemp: pickNumber(state, ['setpoint', 'targetTemperature', 'target']),
      timerMinutes: timerSeconds === null ? null : Math.round(timerSeconds / 60),
      isCooking: parseRunning(state),
      raw: {
        characteristics: this.characteristicUuids,
        ...(this.discovery ? { discovery: this.discovery } : {}),
        ...(this.notifications.size > 0 ? { notifications: this.heard } : {}),
        state,
        temperature,
        timer,
      },
    };
  }

  /** Fails loudly, unlike the reads: a silent no-op on a control is worse. */
  private requireCharacteristic(uuid: string, what: string): string {
    if (!this.has(uuid)) {
      throw new Error(`This cooker does not expose the ${what} characteristic (${uuid}).`);
    }
    return uuid;
  }

  async setTargetTemp(temp: number): Promise<void> {
    await this.writeJson(
      this.requireCharacteristic(MINI_CHARS.setTemperature, 'set-temperature'),
      { setpoint: temp },
      false,
    );
  }

  /**
   * There is no standalone set-timer command; the timer is an argument to
   * `start`. So it is held until the next start, and applied immediately if a
   * cook is already running.
   */
  async setTimer(minutes: number): Promise<void> {
    this.pendingTimerSeconds = Math.max(0, Math.round(minutes * 60));
    const state = await this.readJson(MINI_CHARS.state);
    if (parseRunning(state) === true) await this.startCooking();
  }

  async setUnit(unit: TempUnit): Promise<void> {
    await this.writeJson(
      this.requireCharacteristic(MINI_CHARS.state, 'state'),
      { command: 'changeUnit', payload: { temperatureUnit: unit } },
      false,
    );
  }

  async startCooking(): Promise<void> {
    // `start` carries the setpoint, so the current one is read back rather than
    // silently substituting a default.
    const state = await this.readJson(MINI_CHARS.state);
    const setpoint = pickNumber(state, ['setpoint', 'targetTemperature', 'target']);
    if (setpoint === null) {
      throw new Error('Could not read the current setpoint, so there is nothing to start at.');
    }

    const timerSeconds =
      this.pendingTimerSeconds ??
      pickNumber(await this.readJson(MINI_CHARS.timer), ['initial', 'current', 'value']) ??
      0;

    await this.writeJson(
      this.requireCharacteristic(MINI_CHARS.state, 'state'),
      {
        command: 'start',
        payload: {
          setpoint,
          timer: Math.round(timerSeconds),
          cookableId: 'souper-vide',
          cookableType: 'recipe',
        },
      },
      false,
    );
  }

  async stopCooking(): Promise<void> {
    await this.writeJson(
      this.requireCharacteristic(MINI_CHARS.state, 'state'),
      { command: 'stop' },
      false,
    );
  }
}

export interface NotificationRecord {
  count: number;
  encoding?: CharacteristicReport['encoding'];
  value?: unknown;
}

export interface CharacteristicReport {
  uuid: string;
  properties: string[];
  encoding?: 'base64-json' | 'json' | 'text' | 'bytes';
  value?: unknown;
  error?: string;
}

/**
 * Reads every characteristic on the service and reports its properties and
 * decoded value.
 *
 * Anova's published UUIDs do not cover every unit in the field, so on hardware
 * that matches none of them the only way forward is to ask the device what it
 * has and look at what comes back. Read-only: nothing here writes.
 */
export async function probeCharacteristics(
  service: BluetoothRemoteGATTService,
): Promise<CharacteristicReport[]> {
  const reports: CharacteristicReport[] = [];

  for (const characteristic of await service.getCharacteristics()) {
    const flags: Record<string, boolean> = {
      read: characteristic.properties.read,
      write: characteristic.properties.write,
      writeWithoutResponse: characteristic.properties.writeWithoutResponse,
      notify: characteristic.properties.notify,
      indicate: characteristic.properties.indicate,
    };
    const report: CharacteristicReport = {
      uuid: characteristic.uuid,
      properties: Object.keys(flags).filter((key) => flags[key]),
    };

    if (characteristic.properties.read) {
      try {
        Object.assign(report, decodeValue(await characteristic.readValue()));
      } catch (error) {
        report.error = (error as Error).message;
      }
    }

    reports.push(report);
  }

  return reports;
}

/** Tries each encoding Anova is known to use, then falls back to raw bytes. */
function decodeValue(view: DataView): Partial<CharacteristicReport> {
  const bytes = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  const text = new TextDecoder().decode(bytes).trim();

  if (text.length > 0) {
    try {
      return { encoding: 'base64-json', value: JSON.parse(atob(text)) };
    } catch {
      // not base64-wrapped JSON
    }
    try {
      return { encoding: 'json', value: JSON.parse(text) };
    } catch {
      // not bare JSON
    }
    // Printable ASCII only — otherwise it is binary that happened to decode.
    if (/^[\x20-\x7e\s]*$/.test(text)) return { encoding: 'text', value: text };
  }

  return {
    encoding: 'bytes',
    value: [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join(' '),
  };
}

/** Reads the first of `keys` that holds a finite number. */
export function pickNumber(source: Record<string, unknown>, keys: string[]): number | null {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) {
      return Number(value);
    }
  }
  return null;
}

export function parseUnit(value: unknown): TempUnit | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toUpperCase();
  return normalized === 'C' || normalized === 'F' ? normalized : null;
}

const STOPPED_WORDS = ['stop', 'idle', 'off', 'standby', 'complete'];
const RUNNING_WORDS = ['run', 'cook', 'preheat', 'heating', 'maintain'];

/**
 * Anova does not publish the STATE schema, so this checks the plausible keys
 * and classifies whatever string it finds. Returns null rather than guessing
 * "off" for an unrecognized value — the UI treats null as unknown.
 */
export function parseRunning(state: Record<string, unknown>): boolean | null {
  const keys = ['state', 'mode', 'status', 'cookStatus', 'cookerStatus', 'jobStatus', 'running'];
  for (const key of keys) {
    const value = state[key];
    if (typeof value === 'boolean') return value;
    if (typeof value !== 'string') continue;

    const normalized = value.trim().toLowerCase();
    // "stopped" contains neither running word, but check stopped first anyway
    // so a value like "stopped, preheat ready" cannot read as running.
    if (STOPPED_WORDS.some((word) => normalized.includes(word))) return false;
    if (RUNNING_WORDS.some((word) => normalized.includes(word))) return true;
  }
  return null;
}
