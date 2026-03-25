import { describe, it, expect } from "vitest";
import { isNull } from "./isNull";

describe("isNull", () => {
  it("should return true for null values", () => {
    expect(isNull(null)).toBe(true);
  });

  it("should return false for non-null values", () => {
    expect(isNull(undefined)).toBe(false);
    expect(isNull(true)).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull(1)).toBe(false);
    expect(isNull(NaN)).toBe(false);
    expect(isNull(Infinity)).toBe(false);
    expect(isNull("")).toBe(false);
    expect(isNull("string")).toBe(false);
    expect(isNull({})).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull(new Map())).toBe(false);
    expect(isNull(new Set())).toBe(false);
    expect(isNull(() => {})).toBe(false);
    expect(isNull(Symbol("a"))).toBe(false);
    expect(isNull(BigInt(123))).toBe(false);
  });
});
