import type { TempUnit } from './constants';

/**
 * What a single poll of the cooker yields, independent of which wire protocol
 * produced it. Fields a given protocol cannot report stay null.
 */
export interface NanoSnapshot {
  /** Water temperature, in the cooker's current display unit. */
  waterTemp: number | null;
  /** Target temperature, in the cooker's current display unit. */
  targetTemp: number | null;
  timerMinutes: number | null;
  unit: TempUnit | null;
  /** Null when the protocol offers no way to tell. */
  isCooking: boolean | null;
  waterLow: boolean;
  waterLeak: boolean;
  motorSpeed: number | null;
  heaterTemp: number | null;
  /**
   * Undecoded protocol payloads, for protocols whose schema Anova has not
   * published. Surfaced in the UI so an unexpected shape is inspectable rather
   * than silently swallowed.
   */
  raw?: unknown;
}

export const EMPTY_SNAPSHOT: NanoSnapshot = {
  waterTemp: null,
  targetTemp: null,
  timerMinutes: null,
  unit: null,
  isCooking: null,
  waterLow: false,
  waterLeak: false,
  motorSpeed: null,
  heaterTemp: null,
};

/**
 * One of Anova's wire protocols, wired up to a live GATT service.
 *
 * Temperatures crossing this boundary are always in the cooker's own display
 * unit, matching how both protocols express them on the wire.
 */
export interface NanoTransport {
  /** Human-readable protocol name, shown in the UI so surprises are visible. */
  readonly label: string;
  read(): Promise<NanoSnapshot>;
  setTargetTemp(temp: number): Promise<void>;
  setTimer(minutes: number): Promise<void>;
  setUnit(unit: TempUnit): Promise<void>;
  startCooking(): Promise<void>;
  stopCooking(): Promise<void>;
  /** Rejects anything still in flight; called on disconnect. */
  dispose(error: Error): void;
}
