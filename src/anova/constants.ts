/**
 * Anova Precision Cooker Nano BLE constants.
 *
 * Web Bluetooth rejects uppercase UUIDs — `BluetoothUUID.getService()` throws
 * on anything that is not lowercase hex. Anova's docs print them uppercase, so
 * they are normalized once, here, and nowhere else.
 */
export const NANO_SERVICE_UUID = '0e140000-0af1-4582-a242-773e63054c68';
export const NANO_TX_CHAR_UUID = '0e140001-0af1-4582-a242-773e63054c68'; // write
export const NANO_RX_CHAR_UUID = '0e140002-0af1-4582-a242-773e63054c68'; // notify — command responses
export const NANO_ASYNC_CHAR_UUID = '0e140003-0af1-4582-a242-773e63054c68'; // notify — unsolicited alerts

/** Max bytes per GATT write. The Nano's framing assumes 20-byte chunks. */
export const NANO_CHUNK_SIZE = 20;

/** Setpoints are transmitted as tenths of a degree (65.5 -> 655). */
export const TARGET_TEMP_SCALE = 10;

/** Device-imposed setpoint limits, from Anova's reference implementation. */
export const TEMP_LIMITS = {
  C: { min: 0, max: 92 },
  F: { min: 32, max: 197 },
} as const;

export type TempUnit = 'C' | 'F';

/**
 * `UnitType` values that mean Celsius vs Fahrenheit, and the divisor each
 * implies. Sensor readings carry their own unit, so scaling is per-reading
 * rather than global.
 */
export const UNIT_TYPE_INFO: Record<number, { unit: TempUnit; scale: number }> = {
  0: { unit: 'C', scale: 10 }, // DEGREES_POINT_1C
  1: { unit: 'F', scale: 10 }, // DEGREES_POINT_1F
  4: { unit: 'C', scale: 100 }, // DEGREES_POINT_01C
  5: { unit: 'F', scale: 100 }, // DEGREES_POINT_01F
  6: { unit: 'C', scale: 1 }, // DEGREES_C
  7: { unit: 'F', scale: 1 }, // DEGREES_F
};

/** `UnitType` value to write when setting the display unit. */
export const SET_UNIT_VALUE: Record<TempUnit, number> = {
  C: 0, // DEGREES_POINT_1C
  F: 1, // DEGREES_POINT_1F
};

export function unitFromRaw(raw: number): TempUnit | null {
  return UNIT_TYPE_INFO[raw]?.unit ?? null;
}

export function cToF(c: number): number {
  return c * 1.8 + 32;
}

export function fToC(f: number): number {
  return (f - 32) / 1.8;
}
