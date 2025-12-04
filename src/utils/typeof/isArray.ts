import { TYPED_ARRAY_TAGS, resolvePrototypeString } from "./types";

type TypedArray = | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

export function isTypedArray(value: unknown): value is TypedArray {
  return typeof value === "object" && value !== null && TYPED_ARRAY_TAGS.has(resolvePrototypeString(value));
}
