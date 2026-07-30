/**
 * A `Uint8Array` explicitly backed by a plain `ArrayBuffer`.
 *
 * TypeScript 5.7 made `Uint8Array` generic over its buffer, and a bare
 * `Uint8Array` widens to `ArrayBufferLike` — which includes `SharedArrayBuffer`
 * and therefore is not assignable to the `BufferSource` that
 * `writeValue*()` expects. Annotating the wire-facing helpers with `Bytes`
 * keeps that width from leaking into the GATT calls.
 */
export type Bytes = Uint8Array<ArrayBuffer>;
