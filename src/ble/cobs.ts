import type { Bytes } from './bytes';

/**
 * Consistent Overhead Byte Stuffing.
 *
 * Anova's Nano reference implementation appends the 0x00 frame delimiter as
 * part of encoding, so `encode` does the same — the result is a complete,
 * ready-to-write frame.
 */

/** COBS-encode `data` and append the trailing 0x00 frame delimiter. */
export function cobsEncode(data: Uint8Array): Bytes {
  // Worst case: one overhead byte per 254 payload bytes, plus code + delimiter.
  const out = new Uint8Array(data.length + Math.ceil(data.length / 254) + 2);
  let codePtr = 0;
  let len = 1; // reserve out[0] for the first code byte
  let code = 1;

  for (const byte of data) {
    if (byte === 0) {
      out[codePtr] = code;
      codePtr = len++;
      code = 1;
    } else {
      out[len++] = byte;
      code++;
      if (code === 0xff) {
        out[codePtr] = code;
        codePtr = len++;
        code = 1;
      }
    }
  }

  out[codePtr] = code;
  out[len++] = 0x00;
  return out.subarray(0, len);
}

/**
 * COBS-decode a single frame. `data` may include the trailing 0x00 delimiter;
 * it is ignored if present.
 *
 * Throws on a truncated frame rather than returning partial data — a short read
 * means the caller mis-framed the stream, and silently returning garbage would
 * surface much later as a protobuf parse error.
 */
export function cobsDecode(data: Uint8Array): Bytes {
  const end = data.length > 0 && data[data.length - 1] === 0 ? data.length - 1 : data.length;
  const out = new Uint8Array(end);
  let len = 0;
  let i = 0;

  while (i < end) {
    const code = data[i++];
    if (code === 0) throw new Error('COBS: unexpected zero byte inside frame');
    const run = code - 1;
    if (i + run > end) throw new Error('COBS: truncated frame');
    for (let j = 0; j < run; j++) out[len++] = data[i++];
    // A code of 0xFF means a full 254-byte run with no implied zero after it.
    // Any other code implies a zero, except when the frame ends here.
    if (code !== 0xff && i < end) out[len++] = 0;
  }

  return out.subarray(0, len);
}

/**
 * Splits a byte stream on 0x00 delimiters, holding any incomplete trailing
 * frame until more data arrives. BLE notifications arrive in ≤20-byte chunks
 * that do not align to frame boundaries, so every response has to be
 * reassembled this way.
 */
export class CobsFramer {
  private buffer: number[] = [];

  /** Feed a notification chunk; returns every complete frame it completed. */
  push(chunk: Uint8Array): Bytes[] {
    const frames: Bytes[] = [];
    for (const byte of chunk) {
      if (byte === 0) {
        if (this.buffer.length > 0) {
          frames.push(Uint8Array.from(this.buffer));
          this.buffer = [];
        }
        // Empty frames (repeated delimiters) are keep-alive noise; skip them.
      } else {
        this.buffer.push(byte);
      }
    }
    return frames;
  }

  reset(): void {
    this.buffer = [];
  }
}
