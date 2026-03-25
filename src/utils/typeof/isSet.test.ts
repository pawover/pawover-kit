import { describe, it, expect } from "vitest";
import { isSet, isWeakSet } from "./isSet";

describe("isSet", () => {
  it("should return true for Set instances", () => {
    expect(isSet(new Set())).toBe(true);
    const set = new Set([1, 2, 3]);
    expect(isSet(set)).toBe(true);
  });

  it("should return false for non-Set values", () => {
    expect(isSet(undefined)).toBe(false);
    expect(isSet(null)).toBe(false);
    expect(isSet(true)).toBe(false);
    expect(isSet(false)).toBe(false);
    expect(isSet(0)).toBe(false);
    expect(isSet(1)).toBe(false);
    expect(isSet(NaN)).toBe(false);
    expect(isSet(Infinity)).toBe(false);
    expect(isSet("")).toBe(false);
    expect(isSet("Set")).toBe(false);
    expect(isSet({})).toBe(false);
    expect(isSet([])).toBe(false);
    expect(isSet(new Map())).toBe(false);
    expect(isSet(new WeakSet())).toBe(false);
    expect(isSet(new WeakMap())).toBe(false);
    expect(isSet(() => {})).toBe(false);
    expect(isSet(Symbol("a"))).toBe(false);
    expect(isSet(BigInt(123))).toBe(false);
  });
});

describe("isWeakSet", () => {
  it("should return true for WeakSet instances", () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
    const ws = new WeakSet();
    expect(isWeakSet(ws)).toBe(true);
  });

  it("should return false for non-WeakSet values", () => {
    expect(isWeakSet(undefined)).toBe(false);
    expect(isWeakSet(null)).toBe(false);
    expect(isWeakSet(true)).toBe(false);
    expect(isWeakSet(false)).toBe(false);
    expect(isWeakSet(0)).toBe(false);
    expect(isWeakSet(1)).toBe(false);
    expect(isWeakSet(NaN)).toBe(false);
    expect(isWeakSet(Infinity)).toBe(false);
    expect(isWeakSet("")).toBe(false);
    expect(isWeakSet("WeakSet")).toBe(false);
    expect(isWeakSet({})).toBe(false);
    expect(isWeakSet([])).toBe(false);
    expect(isWeakSet(new Set())).toBe(false);
    expect(isWeakSet(new Map())).toBe(false);
    expect(isWeakSet(new WeakMap())).toBe(false);
    expect(isWeakSet(() => {})).toBe(false);
    expect(isWeakSet(Symbol("a"))).toBe(false);
    expect(isWeakSet(BigInt(123))).toBe(false);
  });
});
