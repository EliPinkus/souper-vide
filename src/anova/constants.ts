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

/**
 * Anova ships at least three mutually incompatible BLE protocols, and the model
 * name on the box does not tell you which one a given unit speaks. The
 * developer docs treat them as separate device families:
 *
 *  - Nano          protobuf + COBS on 0e140000-…
 *  - A2/A3         ASCII commands terminated by \r on 0000ffe0-…
 *  - Mini          base64-wrapped JSON on 910772a8-…
 *
 * An "Anova Precision Cooker Nano 3.0" has been observed exposing the ASCII
 * service rather than the protobuf one, so the client probes for all of these
 * and speaks whichever it actually finds.
 */
export const ANOVA_ASCII_SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
/** Single characteristic used for both writes and notifications. */
export const ANOVA_ASCII_CHAR_UUID = '0000ffe1-0000-1000-8000-00805f9b34fb';

/**
 * Anova's "Gen 3" protocol — base64-wrapped JSON over dedicated read/write
 * characteristics. Their reference implementation calls it the Precision Cooker
 * Mini protocol, but hardware badged "Precision Cooker Nano 3.0" speaks it too,
 * which the `GEN_3_` prefix in Anova's own source rather gives away.
 *
 * UUIDs are taken from the reference implementation, not the docs page: the two
 * disagree on SET_CLOCK (`96e3` in code, `96c3` in prose) and working code wins.
 */
export const ANOVA_MINI_SERVICE_UUID = '910772a8-a5e7-49a7-bc6d-701e9a783a5c';
export const MINI_CHARS = {
  setTemperature: '0f5639f7-3c4e-47d0-9496-0672c89ea48a',
  currentTemperature: '6ffdca46-d6a8-4fb2-8fd9-c6330f1939e3',
  timer: 'a2b179f8-944e-436f-a246-c66caaf7061f',
  state: '54e53c60-367a-4783-a5c1-b1770c54142b',
  setClock: 'd8a89692-cae8-4b74-96e3-0b99d3637793',
  systemInfo: '153c9432-7c83-4b88-9252-7588229d5473',
} as const;

export const ANOVA_CANDIDATE_SERVICES = [
  { uuid: NANO_SERVICE_UUID, label: 'Nano protobuf protocol' },
  { uuid: ANOVA_ASCII_SERVICE_UUID, label: 'ASCII serial protocol' },
  { uuid: ANOVA_MINI_SERVICE_UUID, label: 'Precision Cooker Mini protocol' },
] as const;

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
