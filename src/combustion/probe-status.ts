import { BitReader, readBits } from '../ble/bits';
import {
  PredictionMode,
  PredictionState,
  PredictionType,
  ProbeMode,
  VIRTUAL_AMBIENT_SENSORS,
  VIRTUAL_CORE_SENSORS,
  VIRTUAL_SURFACE_SENSORS,
} from './constants';

/**
 * Parser for the Probe Status characteristic.
 *
 * Field layout, in order, per Combustion's `probe_ble_specification.rst`:
 *
 *   offset  size  field
 *   0       8     Log range (two uint32 sequence numbers: min, max)
 *   8       13    Current raw temperature data (8 x 13-bit thermistors)
 *   21      1     Mode / colour / probe ID
 *   22      1     Battery status + virtual sensors
 *   23      7     Prediction status
 *   30      10    Food safe data
 *   40      8     Food safe status
 *   48      1     Overheating sensors
 *   49      1     Thermometer preferences
 *   50      22    High alarm status array
 *   72      22    Low alarm status array
 *
 * That totals 94 bytes on current firmware. Older firmware sends a shorter
 * payload with the trailing fields absent, so every field past the prediction
 * status is parsed only if the bytes are actually there — a probe on older
 * firmware degrades to fewer fields rather than throwing.
 */

const OFFSET_LOG_RANGE = 0;
const OFFSET_RAW_TEMPS = 8;
const OFFSET_MODE_ID = 21;
const OFFSET_BATTERY_VIRTUAL = 22;
const OFFSET_PREDICTION = 23;
const OFFSET_OVERHEATING = 48;

/** Shortest payload we can make sense of: through the prediction status. */
export const MIN_PROBE_STATUS_BYTES = OFFSET_PREDICTION + 7;

export interface PredictionStatus {
  state: PredictionState;
  mode: PredictionMode;
  type: PredictionType;
  /** Removal target, °C. */
  setPointC: number;
  /** Core temperature when heating began, °C. */
  heatStartC: number;
  /** Seconds until the predicted event, or null when no prediction is active. */
  secondsRemaining: number | null;
  /** Estimated core temperature, °C. */
  estimatedCoreC: number;
  /** 0..1 progress toward the removal target, or null when not computable. */
  percentToRemoval: number | null;
}

export interface ProbeStatus {
  logRange: { min: number; max: number };
  /** Eight thermistor readings in °C, T1 (tip) first. */
  temperaturesC: number[];
  mode: ProbeMode;
  colorId: number;
  probeId: number;
  batteryLow: boolean;
  /** Index into `temperaturesC` for each virtual sensor. */
  virtualSensors: { core: number; surface: number; ambient: number };
  /** Convenience readings pulled out via `virtualSensors`. */
  coreC: number;
  surfaceC: number;
  ambientC: number;
  prediction: PredictionStatus;
  /** Indices of thermistors reporting an over-temperature condition. */
  overheatingSensors: number[];
  updatedAt: number;
}

/** Raw thermistor counts are 0.05 °C steps offset by -20 °C. */
function rawToCelsius(raw: number): number {
  return raw * 0.05 - 20;
}

/** Reads the eight 13-bit thermistor fields out of the packed 13-byte block. */
export function parseRawTemperatures(data: Uint8Array, byteOffset = 0): number[] {
  const reader = new BitReader(data, byteOffset * 8);
  const temps: number[] = [];
  for (let i = 0; i < 8; i++) temps.push(rawToCelsius(reader.read(13)));
  return temps;
}

/** Decodes the 7-bit virtual-sensor field into physical thermistor indices. */
export function parseVirtualSensors(packed: number): { core: number; surface: number; ambient: number } {
  return {
    core: VIRTUAL_CORE_SENSORS[packed & 0x07] ?? 0,
    surface: VIRTUAL_SURFACE_SENSORS[(packed >> 3) & 0x03] ?? 3,
    ambient: VIRTUAL_AMBIENT_SENSORS[(packed >> 5) & 0x03] ?? 4,
  };
}

/** Decodes the 7-byte prediction status block starting at `byteOffset`. */
export function parsePredictionStatus(data: Uint8Array, byteOffset: number): PredictionStatus {
  const reader = new BitReader(data, byteOffset * 8);

  const state = reader.read(4) as PredictionState;
  const mode = reader.read(2) as PredictionMode;
  const type = reader.read(2) as PredictionType;
  const setPointC = reader.read(10) * 0.1;
  const heatStartC = reader.read(10) * 0.1;
  const rawSeconds = reader.read(17);
  const estimatedCoreC = reader.read(11) * 0.1 - 20;

  // 0x1FFFF is the field's saturation value and means "no prediction", not
  // "36 hours from now".
  const secondsRemaining = rawSeconds === 0x1ffff ? null : rawSeconds;

  const span = setPointC - heatStartC;
  const percentToRemoval =
    span > 0 ? Math.min(1, Math.max(0, (estimatedCoreC - heatStartC) / span)) : null;

  return { state, mode, type, setPointC, heatStartC, secondsRemaining, estimatedCoreC, percentToRemoval };
}

export function parseProbeStatus(data: Uint8Array): ProbeStatus {
  if (data.length < MIN_PROBE_STATUS_BYTES) {
    throw new Error(
      `Probe status payload is ${data.length} bytes; need at least ${MIN_PROBE_STATUS_BYTES}`,
    );
  }

  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const logRange = {
    min: view.getUint32(OFFSET_LOG_RANGE, true),
    max: view.getUint32(OFFSET_LOG_RANGE + 4, true),
  };

  const temperaturesC = parseRawTemperatures(data, OFFSET_RAW_TEMPS);

  const modeId = data[OFFSET_MODE_ID];
  const mode = (modeId & 0x03) as ProbeMode;
  const colorId = (modeId >> 2) & 0x07;
  const probeId = (modeId >> 5) & 0x07;

  const batteryVirtual = data[OFFSET_BATTERY_VIRTUAL];
  const batteryLow = (batteryVirtual & 0x01) === 1;
  const virtualSensors = parseVirtualSensors((batteryVirtual >> 1) & 0x7f);

  const prediction = parsePredictionStatus(data, OFFSET_PREDICTION);

  const overheatingSensors: number[] = [];
  if (data.length > OFFSET_OVERHEATING) {
    const bits = data[OFFSET_OVERHEATING];
    for (let i = 0; i < 8; i++) {
      if (readBits(new Uint8Array([bits]), i, 1)) overheatingSensors.push(i);
    }
  }

  return {
    logRange,
    temperaturesC,
    mode,
    colorId,
    probeId,
    batteryLow,
    virtualSensors,
    coreC: temperaturesC[virtualSensors.core],
    surfaceC: temperaturesC[virtualSensors.surface],
    ambientC: temperaturesC[virtualSensors.ambient],
    prediction,
    overheatingSensors,
    updatedAt: Date.now(),
  };
}
