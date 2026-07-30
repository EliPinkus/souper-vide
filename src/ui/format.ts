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

/** Turns a thrown value into something worth showing a user. */
export function describeError(error: unknown): string {
  if (error instanceof Error) {
    // Chrome reports a cancelled chooser and an empty chooser identically, and
    // "no device selected" reads as user error when the list was in fact blank.
    if (error.name === 'NotFoundError') {
      return 'No device chosen. If the list was empty, try “Show every Bluetooth device” below.';
    }
    if (error.name === 'SecurityError') return 'Bluetooth access was blocked. The page must be served over HTTPS or localhost.';
    if (error.name === 'NetworkError') return 'Connection failed. Make sure the device is on, in range, and not connected to another app.';
    return error.message;
  }
  return String(error);
}
