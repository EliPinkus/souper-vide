import { cToF, fToC, type TempUnit } from '../anova/constants';

/** Converts between display units. A null `from` means the unit is unknown. */
export function convertTemp(value: number, from: TempUnit | null, to: TempUnit): number {
  if (from === null || from === to) return value;
  return from === 'C' ? cToF(value) : fToC(value);
}

export function formatTemp(value: number | null | undefined, unit: TempUnit, digits = 1): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return `${value.toFixed(digits)}°${unit}`;
}

/** Converts a Celsius reading for display; Combustion reports only in °C. */
export function displayFromC(celsius: number, unit: TempUnit): number {
  return unit === 'C' ? celsius : cToF(celsius);
}

export function formatCelsius(celsius: number | null | undefined, unit: TempUnit, digits = 1): string {
  if (celsius === null || celsius === undefined || Number.isNaN(celsius)) return '—';
  return formatTemp(displayFromC(celsius, unit), unit, digits);
}

export function formatDuration(totalSeconds: number | null): string {
  if (totalSeconds === null || totalSeconds < 0) return '—';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, '0')}m`;
  if (minutes > 0) return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
  return `${seconds}s`;
}

export function formatMinutes(minutes: number | null): string {
  if (minutes === null) return '—';
  if (minutes === 0) return 'Off';
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours > 0) return `${hours}h ${String(rest).padStart(2, '0')}m`;
  return `${rest}m`;
}

export function formatAge(timestamp: number): string {
  if (!timestamp) return 'never';
  const seconds = Math.round((Date.now() - timestamp) / 1000);
  if (seconds < 2) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.round(seconds / 60)}m ago`;
}

/**
 * Logs the untouched error before any prettifying, so DevTools always has the
 * exact `name` and `message` Chrome produced. The on-screen text is a summary;
 * this is the record.
 */
export function logBleError(context: string, error: unknown): void {
  const detail =
    error instanceof Error ? { name: error.name, message: error.message } : { value: error };
  console.error(`[SouperVide] ${context} failed`, detail, error);
}

/** Turns a thrown value into something worth showing a user. */
export function describeError(error: unknown): string {
  if (error instanceof Error) {
    // Chrome raises NotFoundError both for a cancelled chooser and for a
    // selection that failed to complete, so its own wording is the only thing
    // that distinguishes them. Never discard it — quote it and add the hint.
    if (error.name === 'NotFoundError') {
      const cancelled = /cancell?ed/i.test(error.message);
      const hint = cancelled
        ? 'If you did click Pair rather than cancelling, the cooker most likely stopped advertising before the selection completed — reset it and try again straight away.'
        : 'If the list was empty, try “Show every Bluetooth device” below.';
      return `${hint} (Chrome said: ${error.message})`;
    }
    if (error.name === 'SecurityError') return 'Bluetooth access was blocked. The page must be served over HTTPS or localhost.';
    if (error.name === 'NetworkError') {
      return `Connection failed — the cooker dropped the link. Gen 3 cookers do this when a pairing prompt is declined or ignored. (Chrome said: ${error.message})`;
    }
    return error.message;
  }
  return String(error);
}
