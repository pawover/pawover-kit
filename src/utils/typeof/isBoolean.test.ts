/* eslint-disable no-new-wrappers */
import { describe, it, expect } from "vitest";
import { isBoolean } from "./isBoolean";

describe("isBoolean", () => {
  it("should return true for boolean primitive values", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it("should return false for non-boolean values", () => {
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(NaN)).toBe(false);
    expect(isBoolean(Infinity)).toBe(false);
    expect(isBoolean("")).toBe(false);
    expect(isBoolean("string")).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean(new Map())).toBe(false);
    expect(isBoolean(new Set())).toBe(false);
    expect(isBoolean(() => {})).toBe(false);
    expect(isBoolean(Symbol("a"))).toBe(false);
    expect(isBoolean(BigInt(123))).toBe(false);
  });

  it("should return false for Boolean objects created with new Boolean()", () => {
    // Note: Using 'new Boolean()' creates an object, not a primitive.
    // This is good behavior; we usually don't want to treat Boolean objects as booleans.
    expect(isBoolean(new Boolean(true))).toBe(false);
    expect(isBoolean(new Boolean(false))).toBe(false);
    expect(isBoolean(Object(true))).toBe(false); // Another way to create a Boolean object
  });
});
