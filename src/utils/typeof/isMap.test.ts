import { describe, it, expect } from "vitest";
import { isMap, isWeakMap } from "./isMap";

describe("isMap", () => {
  it("should return true for Map instances", () => {
    expect(isMap(new Map())).toBe(true);
    const map = new Map([[1, "one"], [2, "two"]]);
    expect(isMap(map)).toBe(true);
  });

  it("should return false for non-Map values", () => {
    expect(isMap(undefined)).toBe(false);
    expect(isMap(null)).toBe(false);
    expect(isMap(true)).toBe(false);
    expect(isMap(false)).toBe(false);
    expect(isMap(0)).toBe(false);
    expect(isMap(1)).toBe(false);
    expect(isMap(NaN)).toBe(false);
    expect(isMap(Infinity)).toBe(false);
    expect(isMap("")).toBe(false);
    expect(isMap("Map")).toBe(false);
    expect(isMap({})).toBe(false);
    expect(isMap([])).toBe(false);
    expect(isMap(new Set())).toBe(false);
    expect(isMap(new WeakMap())).toBe(false);
    expect(isMap(new WeakSet())).toBe(false);
    expect(isMap(() => {})).toBe(false);
    expect(isMap(Symbol("a"))).toBe(false);
    expect(isMap(BigInt(123))).toBe(false);
  });
});

describe("isWeakMap", () => {
  it("should return true for WeakMap instances", () => {
    expect(isWeakMap(new WeakMap())).toBe(true);
    const wm = new WeakMap();
    expect(isWeakMap(wm)).toBe(true);
  });

  it("should return false for non-WeakMap values", () => {
    expect(isWeakMap(undefined)).toBe(false);
    expect(isWeakMap(null)).toBe(false);
    expect(isWeakMap(true)).toBe(false);
    expect(isWeakMap(false)).toBe(false);
    expect(isWeakMap(0)).toBe(false);
    expect(isWeakMap(1)).toBe(false);
    expect(isWeakMap(NaN)).toBe(false);
    expect(isWeakMap(Infinity)).toBe(false);
    expect(isWeakMap("")).toBe(false);
    expect(isWeakMap("WeakMap")).toBe(false);
    expect(isWeakMap({})).toBe(false);
    expect(isWeakMap([])).toBe(false);
    expect(isWeakMap(new Map())).toBe(false);
    expect(isWeakMap(new Set())).toBe(false);
    expect(isWeakMap(new WeakSet())).toBe(false);
    expect(isWeakMap(() => {})).toBe(false);
    expect(isWeakMap(Symbol("a"))).toBe(false);
    expect(isWeakMap(BigInt(123))).toBe(false);
  });
});
