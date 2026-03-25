import { describe, it, expect } from "vitest";
import { isArray, isTypedArray } from "./isArray";

describe("isArray", () => {
  it("should return true for arrays", () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(["a", "b", "c"])).toBe(true);
    expect(isArray(new Array(5))).toBe(true); // Using Array constructor
  });

  it("should return false for non-arrays", () => {
    expect(isArray(undefined)).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(false)).toBe(false);
    expect(isArray(0)).toBe(false);
    expect(isArray(1)).toBe(false);
    expect(isArray(NaN)).toBe(false);
    expect(isArray(Infinity)).toBe(false);
    expect(isArray("")).toBe(false);
    expect(isArray("array")).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray({ length: 0 })).toBe(false); // An object with a length property is not an array
    expect(isArray(() => {})).toBe(false);
    expect(isArray(Symbol("a"))).toBe(false);
    expect(isArray(BigInt(123))).toBe(false);
    expect(isArray(new Int8Array(5))).toBe(false); // TypedArray is not an Array
    expect(isArray(new Map())).toBe(false);
  });
});

describe("isTypedArray", () => {
  it("should return true for all TypedArray instances", () => {
    expect(isTypedArray(new Int8Array())).toBe(true);
    expect(isTypedArray(new Uint8Array())).toBe(true);
    expect(isTypedArray(new Uint8ClampedArray())).toBe(true);
    expect(isTypedArray(new Int16Array())).toBe(true);
    expect(isTypedArray(new Uint16Array())).toBe(true);
    expect(isTypedArray(new Int32Array())).toBe(true);
    expect(isTypedArray(new Uint32Array())).toBe(true);
    expect(isTypedArray(new Float32Array())).toBe(true);
    expect(isTypedArray(new Float64Array())).toBe(true);
    expect(isTypedArray(new BigInt64Array())).toBe(true);
    expect(isTypedArray(new BigUint64Array())).toBe(true);
  });

  it("should return false for non-TypedArray values", () => {
    expect(isTypedArray(undefined)).toBe(false);
    expect(isTypedArray(null)).toBe(false);
    expect(isTypedArray(true)).toBe(false);
    expect(isTypedArray(false)).toBe(false);
    expect(isTypedArray(0)).toBe(false);
    expect(isTypedArray(1)).toBe(false);
    expect(isTypedArray(NaN)).toBe(false);
    expect(isTypedArray(Infinity)).toBe(false);
    expect(isTypedArray("")).toBe(false);
    expect(isTypedArray("Int8Array")).toBe(false);
    expect(isTypedArray({})).toBe(false);
    expect(isTypedArray([])).toBe(false);
    expect(isTypedArray(() => {})).toBe(false);
    expect(isTypedArray(Symbol("a"))).toBe(false);
    expect(isTypedArray(BigInt(123))).toBe(false);
    expect(isTypedArray(new ArrayBuffer(8))).toBe(false); // ArrayBuffer is not a TypedArray
  });
});
