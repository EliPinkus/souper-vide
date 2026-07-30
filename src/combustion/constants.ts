/**
 * Combustion Inc Predictive Thermometer BLE constants.
 *
 * As with the Anova, Combustion's docs print UUIDs uppercase and Web Bluetooth
 * requires lowercase. Normalized once, here.
 */
export const PROBE_STATUS_SERVICE_UUID = '00000100-caab-3792-3d44-97ae51c1407a';
export const PROBE_STATUS_CHAR_UUID = '00000101-caab-3792-3d44-97ae51c1407a';

export const UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
export const UART_RX_CHAR_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'; // we write here
export const UART_TX_CHAR_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'; // probe notifies here

export const DEVICE_INFO_SERVICE_UUID = 0x180a;
export const SERIAL_NUMBER_CHAR_UUID = 0x2a25;
export const FIRMWARE_REVISION_CHAR_UUID = 0x2a26;

export const UART_SYNC_BYTES = [0xca, 0xfe] as const;

/*
 * These are plain const objects rather than TS `enum`s so the project stays
 * within erasable syntax — every one of them is a wire value, and the paired
 * type alias gives the same call-site ergonomics.
 */

export const UartMessageType = {
  SetProbeId: 0x01,
  SetProbeColor: 0x02,
  ReadSessionInfo: 0x03,
  ReadLogs: 0x04,
  SetPrediction: 0x05,
  ReadOverTemperature: 0x06,
  ConfigureFoodSafe: 0x07,
  ResetFoodSafe: 0x08,
  SetPowerMode: 0x09,
  ResetThermometer: 0x0a,
  SetProbeHighLowAlarm: 0x0b,
  SilenceAlarms: 0x0c,
} as const;
export type UartMessageType = (typeof UartMessageType)[keyof typeof UartMessageType];

export const ProbeMode = {
  Normal: 0,
  InstantRead: 1,
  Reserved: 2,
  Error: 3,
} as const;
export type ProbeMode = (typeof ProbeMode)[keyof typeof ProbeMode];

export const PredictionState = {
  ProbeNotInserted: 0,
  ProbeInserted: 1,
  Warming: 2,
  Predicting: 3,
  RemovalPredictionDone: 4,
  Unknown: 15,
} as const;
export type PredictionState = (typeof PredictionState)[keyof typeof PredictionState];

export const PredictionMode = {
  None: 0,
  TimeToRemoval: 1,
  RemovalAndResting: 2,
  Reserved: 3,
} as const;
export type PredictionMode = (typeof PredictionMode)[keyof typeof PredictionMode];

export const PredictionType = {
  None: 0,
  Removal: 1,
  Resting: 2,
  Reserved: 3,
} as const;
export type PredictionType = (typeof PredictionType)[keyof typeof PredictionType];

export const PREDICTION_STATE_LABELS: Record<number, string> = {
  [PredictionState.ProbeNotInserted]: 'Not inserted',
  [PredictionState.ProbeInserted]: 'Inserted',
  [PredictionState.Warming]: 'Warming',
  [PredictionState.Predicting]: 'Predicting',
  [PredictionState.RemovalPredictionDone]: 'Ready to remove',
  [PredictionState.Unknown]: 'Unknown',
};

export const PROBE_COLORS = ['Yellow', 'Grey', 'Color 3', 'Color 4', 'Color 5', 'Color 6', 'Color 7', 'Color 8'];

/** Physical thermistor each virtual-sensor enumeration value maps to (T1 = index 0). */
export const VIRTUAL_CORE_SENSORS = [0, 1, 2, 3, 4, 5];
export const VIRTUAL_SURFACE_SENSORS = [3, 4, 5, 6];
export const VIRTUAL_AMBIENT_SENSORS = [4, 5, 6, 7];

/** Removal-target limits implied by the 10-bit, 0.1 °C set point field. */
export const SET_POINT_LIMITS_C = { min: 0, max: 102.3 } as const;
