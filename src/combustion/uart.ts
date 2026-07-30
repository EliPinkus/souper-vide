import { writeBits } from '../ble/bits';
import type { Bytes } from '../ble/bytes';
import { crc16ccitt } from '../ble/crc16';
import { PredictionMode, UART_SYNC_BYTES, UartMessageType } from './constants';

/**
 * Combustion's UART framing.
 *
 *   Request:  CA FE | CRC16 (LE) | type | payloadLen | payload
 *   Response: CA FE | CRC16 (LE) | type | success    | payloadLen | payload
 *
 * The CRC is CRC-16/CCITT-FALSE over every byte after the CRC field itself.
 */

const REQUEST_HEADER_LENGTH = 6;
const RESPONSE_HEADER_LENGTH = 7;

export function buildRequest(type: UartMessageType, payload: Uint8Array = new Uint8Array()): Bytes {
  const body = new Uint8Array(2 + payload.length);
  body[0] = type;
  body[1] = payload.length;
  body.set(payload, 2);

  const crc = crc16ccitt(body);

  const frame = new Uint8Array(REQUEST_HEADER_LENGTH + payload.length);
  frame[0] = UART_SYNC_BYTES[0];
  frame[1] = UART_SYNC_BYTES[1];
  frame[2] = crc & 0xff;
  frame[3] = (crc >> 8) & 0xff;
  frame.set(body, 4);
  return frame;
}

export interface UartResponse {
  type: UartMessageType;
  success: boolean;
  payload: Uint8Array;
  crcValid: boolean;
}

/**
 * Pulls complete responses out of a notification stream.
 *
 * Frames are not guaranteed to be notification-aligned, and a garbled byte can
 * leave a false sync marker in the buffer, so the parser resynchronizes by
 * scanning forward for the next `CA FE` whenever a frame fails to validate.
 */
export class UartParser {
  private buffer: number[] = [];

  push(chunk: Uint8Array): UartResponse[] {
    for (const byte of chunk) this.buffer.push(byte);

    const responses: UartResponse[] = [];

    while (true) {
      const start = this.findSync();
      if (start === -1) {
        // Keep only a trailing byte that might be the first half of a marker.
        this.buffer = this.buffer.slice(Math.max(0, this.buffer.length - 1));
        break;
      }
      if (start > 0) this.buffer = this.buffer.slice(start);
      if (this.buffer.length < RESPONSE_HEADER_LENGTH) break;

      const payloadLength = this.buffer[6];
      const frameLength = RESPONSE_HEADER_LENGTH + payloadLength;
      if (this.buffer.length < frameLength) break;

      const frame = Uint8Array.from(this.buffer.slice(0, frameLength));
      const response = decodeResponse(frame);

      if (response.crcValid) {
        this.buffer = this.buffer.slice(frameLength);
        responses.push(response);
      } else {
        // Probably a false sync marker inside payload data. Step past it and
        // look for the next one rather than discarding the whole buffer.
        this.buffer = this.buffer.slice(2);
      }
    }

    return responses;
  }

  reset(): void {
    this.buffer = [];
  }

  private findSync(): number {
    for (let i = 0; i + 1 < this.buffer.length; i++) {
      if (this.buffer[i] === UART_SYNC_BYTES[0] && this.buffer[i + 1] === UART_SYNC_BYTES[1]) return i;
    }
    return -1;
  }
}

export function decodeResponse(frame: Uint8Array): UartResponse {
  const crc = frame[2] | (frame[3] << 8);
  const body = frame.subarray(4);
  return {
    type: frame[4] as UartMessageType,
    success: frame[5] === 1,
    payload: frame.subarray(RESPONSE_HEADER_LENGTH),
    crcValid: crc16ccitt(body) === crc,
  };
}

/**
 * Set Prediction (0x05) payload: a packed 16-bit field holding the removal
 * target in tenths of a degree Celsius (bits 1-10) and the prediction mode
 * (bits 11-12).
 */
export function buildSetPrediction(setPointC: number, mode: PredictionMode): Bytes {
  const raw = Math.round(setPointC * 10);
  if (raw < 0 || raw > 1023) {
    throw new RangeError(`Removal target ${setPointC} °C is outside the probe's 0–102.3 °C range`);
  }

  const payload = writeBits(2, [
    { value: raw, width: 10 },
    { value: mode, width: 2 },
  ]);

  return buildRequest(UartMessageType.SetPrediction, payload);
}

export interface SessionInformation {
  sessionId: number;
  samplePeriodMs: number;
}

export function parseSessionInformation(payload: Uint8Array): SessionInformation {
  const view = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
  return {
    sessionId: view.getUint32(0, true),
    samplePeriodMs: view.getUint16(4, true),
  };
}
