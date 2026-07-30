import { MINI_CHARS, type TempUnit } from './constants';
import { EMPTY_SNAPSHOT, type NanoSnapshot, type NanoTransport } from './transport';

/**
 * Anova's "Gen 3" protocol, per their `developer-project-mini` reference.
 *
 * Every payload is a JSON object, UTF-8 encoded, then base64 encoded, and the
 * base64 *text* is what goes on the wire. Reads come back the same way. There
 * are no notifications here — state is polled by reading characteristics.
 *
 * Field names below that are confirmed by the reference implementation:
 *   CURRENT_TEMPERATURE -> { "current": number }
 *   STATE               -> { "temperatureUnit": "C" | "F", ... }
 *   set temperature     -> { "setpoint": number }
 *   change unit         -> { "command": "changeUnit", "payload": { "temperatureUnit": unit } }
 *   start               -> { "command": "start", "payload": { setpoint, timer, cookableId, cookableType } }
 *   stop                -> { "command": "stop" }
 *
 * The rest of the STATE and TIMER schemas are not published, so those are read
 * defensively and the raw JSON is kept on the snapshot for inspection.
 */
export class MiniTransport implements NanoTransport {
  readonly label = 'Gen 3 JSON protocol (Mini / Nano 3.0)';

  private readonly service: BluetoothRemoteGATTService;
  /** The Mini only accepts a timer as part of `start`, so it is held here. */
  private pendingTimerSeconds: number | null = null;

  constructor(service: BluetoothRemoteGATTService) {
    this.service = service;
  }

  static async attach(service: BluetoothRemoteGATTService): Promise<MiniTransport> {
    const transport = new MiniTransport(service);
    // Anova's reference sets the clock immediately on connect, before anything
    // else, so this mirrors that rather than risking undefined behaviour.
    await transport.setClock();
    return transport;
  }

  dispose(): void {
    // Nothing subscribed; reads are one-shot.
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

  private async readJson(uuid: string): Promise<Record<string, unknown>> {
    const characteristic = await this.service.getCharacteristic(uuid);
    const view = await characteristic.readValue();
    const text = new TextDecoder().decode(view).trim();
    if (text.length === 0) return {};
    try {
      const parsed: unknown = JSON.parse(atob(text));
      return typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : {};
    } catch {
      return {};
    }
  }

  private async setClock(): Promise<void> {
    const currentTime = new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');
    await this.writeJson(MINI_CHARS.setClock, { currentTime }, true);
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
      raw: { state, temperature, timer },
    };
  }

  async setTargetTemp(temp: number): Promise<void> {
    await this.writeJson(MINI_CHARS.setTemperature, { setpoint: temp }, false);
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
      MINI_CHARS.state,
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
      MINI_CHARS.state,
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
    await this.writeJson(MINI_CHARS.state, { command: 'stop' }, false);
  }
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
