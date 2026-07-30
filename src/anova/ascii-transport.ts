import type { Bytes } from '../ble/bytes';
import {
  ANOVA_ASCII_CHAR_UUID,
  NANO_CHUNK_SIZE,
  type TempUnit,
} from './constants';
import { EMPTY_SNAPSHOT, type NanoSnapshot, type NanoTransport } from './transport';

const COMMAND_TIMEOUT_MS = 6000;

/**
 * Anova's ASCII "serial over BLE" protocol.
 *
 * Commands are plain text terminated by a carriage return, written to a single
 * characteristic that also carries the reply as notifications. Documented for
 * the A2/A3 family, but some units badged as a Nano expose it too.
 *
 * Every reading comes back in whatever unit the cooker is currently displaying,
 * so `read unit` is issued before anything is interpreted.
 */
export class AsciiTransport implements NanoTransport {
  readonly label = 'ASCII serial protocol';

  private buffer = '';
  private queue: Promise<unknown> = Promise.resolve();
  private pending: {
    resolve: (line: string) => void;
    reject: (error: Error) => void;
    timer: ReturnType<typeof setTimeout>;
  } | null = null;

  private readonly characteristic: BluetoothRemoteGATTCharacteristic;

  constructor(characteristic: BluetoothRemoteGATTCharacteristic) {
    this.characteristic = characteristic;
    characteristic.addEventListener('characteristicvaluechanged', this.handleNotification);
  }

  static async attach(service: BluetoothRemoteGATTService): Promise<AsciiTransport> {
    const characteristic = await service.getCharacteristic(ANOVA_ASCII_CHAR_UUID);
    await characteristic.startNotifications();
    return new AsciiTransport(characteristic);
  }

  dispose(error: Error): void {
    this.characteristic.removeEventListener('characteristicvaluechanged', this.handleNotification);
    this.settle(error);
  }

  private handleNotification = (event: Event): void => {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (!value) return;

    this.buffer += new TextDecoder().decode(value);

    // Replies end with a carriage return; some firmware adds a newline too.
    const breakAt = this.buffer.search(/[\r\n]/);
    if (breakAt === -1) return;

    const line = this.buffer.slice(0, breakAt).trim();
    this.buffer = this.buffer.slice(breakAt + 1).replace(/^[\r\n]+/, '');
    if (line.length > 0) this.settle(null, line);
  };

  private settle(error: Error | null, line?: string): void {
    const pending = this.pending;
    if (!pending) return;
    this.pending = null;
    clearTimeout(pending.timer);
    if (error) pending.reject(error);
    else pending.resolve(line ?? '');
  }

  /** Sends one command and resolves with its reply line. Serialized. */
  private send(command: string): Promise<string> {
    const run = async (): Promise<string> => {
      const reply = new Promise<string>((resolve, reject) => {
        this.pending = {
          resolve,
          reject,
          timer: setTimeout(() => {
            this.pending = null;
            reject(new Error(`Timed out waiting for a reply to “${command}”`));
          }, COMMAND_TIMEOUT_MS),
        };
      });

      this.buffer = '';
      const frame: Bytes = new TextEncoder().encode(`${command}\r`);
      for (let i = 0; i < frame.length; i += NANO_CHUNK_SIZE) {
        const chunk = frame.subarray(i, i + NANO_CHUNK_SIZE);
        if (this.characteristic.properties.write) {
          await this.characteristic.writeValueWithResponse(chunk);
        } else {
          await this.characteristic.writeValueWithoutResponse(chunk);
        }
      }

      return reply;
    };

    const result = this.queue.then(run, run);
    this.queue = result.catch(() => undefined);
    return result;
  }

  async read(): Promise<NanoSnapshot> {
    const unit = parseUnit(await this.send('read unit'));
    const waterTemp = parseNumber(await this.send('read temp'));
    const targetTemp = parseNumber(await this.send('read set temp'));
    const timerMinutes = parseNumber(await this.send('read timer'));
    const status = (await this.send('status')).toLowerCase();

    return {
      ...EMPTY_SNAPSHOT,
      waterTemp,
      targetTemp,
      timerMinutes: timerMinutes === null ? null : Math.round(timerMinutes),
      unit,
      isCooking: parseRunning(status),
      // This protocol reports faults through the same status string rather than
      // as discrete sensors.
      waterLow: status.includes('low water'),
      waterLeak: status.includes('leak'),
    };
  }

  async setTargetTemp(temp: number): Promise<void> {
    await this.send(`set temp ${temp.toFixed(1)}`);
  }

  async setTimer(minutes: number): Promise<void> {
    await this.send(`set timer ${Math.round(minutes)}`);
    // Setting the timer does not arm it; that takes a separate command.
    await this.send(minutes > 0 ? 'start time' : 'stop time');
  }

  async setUnit(unit: TempUnit): Promise<void> {
    await this.send(`set unit ${unit.toLowerCase()}`);
  }

  async startCooking(): Promise<void> {
    await this.send('start');
  }

  async stopCooking(): Promise<void> {
    await this.send('stop');
  }
}

/** Replies are bare values, but some firmware prefixes or suffixes extra words. */
export function parseNumber(reply: string): number | null {
  const match = reply.match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  const value = Number(match[0]);
  return Number.isFinite(value) ? value : null;
}

export function parseUnit(reply: string): TempUnit | null {
  const normalized = reply.trim().toLowerCase();
  if (normalized.startsWith('c')) return 'C';
  if (normalized.startsWith('f')) return 'F';
  return null;
}

/**
 * `status` returns a short phrase. Treat only an explicit running state as
 * cooking — an unrecognized phrase should not read as "on".
 */
export function parseRunning(status: string): boolean | null {
  const normalized = status.trim().toLowerCase();
  if (normalized.includes('running') || normalized.includes('started')) return true;
  if (normalized.includes('stopped') || normalized.includes('stop')) return false;
  return null;
}
