import type { Bytes } from './bytes';

/**
 * Bit-level accessors for Combustion's packed status fields.
 *
 * IMPORTANT: Combustion's spec numbers bits starting at 1, and bit 1 is the
 * *least* significant bit of byte 0 — the packing is LSB-first, little-endian
 * across bytes. Their "Mode and ID" byte is the easiest place to see this:
 * mode is `raw & 0x03`, color is `(raw >> 2) & 0x07`, ID is `(raw >> 5) & 0x07`.
 * Reading these fields MSB-first produces plausible-looking but wrong numbers,
 * so every packed field in this project goes through these helpers.
 */

/** Reads a field of `count` bits starting at `bitOffset` (0-indexed, LSB-first). */
export function readBits(data: Uint8Array, bitOffset: number, count: number): number {
  if (count < 1 || count > 32) throw new RangeError(`readBits: unsupported width ${count}`);
  const lastBit = bitOffset + count - 1;
  if (bitOffset < 0 || lastBit >= data.length * 8) {
    throw new RangeError(`readBits: field at ${bitOffset}+${count} exceeds ${data.length} bytes`);
  }

  let value = 0;
  for (let i = 0; i < count; i++) {
    const bit = bitOffset + i;
    const set = (data[bit >> 3] >> (bit & 7)) & 1;
    // Multiply rather than shift so widths >30 stay correct and unsigned.
    value += set * 2 ** i;
  }
  return value;
}

/**
 * Convenience wrapper that walks a packed field sequentially, mirroring the
 * order the spec tables list fields in.
 */
export class BitReader {
  private readonly data: Uint8Array;
  private offset: number;

  constructor(data: Uint8Array, startBitOffset = 0) {
    this.data = data;
    this.offset = startBitOffset;
  }

  read(count: number): number {
    const value = readBits(this.data, this.offset, count);
    this.offset += count;
    return value;
  }

  skip(count: number): void {
    this.offset += count;
  }

  get bitOffset(): number {
    return this.offset;
  }
}

/** Packs fields LSB-first into `byteLength` bytes, in the order given. */
export function writeBits(byteLength: number, fields: Array<{ value: number; width: number }>): Bytes {
  const out = new Uint8Array(byteLength);
  let offset = 0;

  for (const { value, width } of fields) {
    if (offset + width > byteLength * 8) {
      throw new RangeError(`writeBits: field at ${offset}+${width} exceeds ${byteLength} bytes`);
    }
    for (let i = 0; i < width; i++) {
      if (Math.floor(value / 2 ** i) % 2 === 1) {
        const bit = offset + i;
        out[bit >> 3] |= 1 << (bit & 7);
      }
    }
    offset += width;
  }

  return out;
}
