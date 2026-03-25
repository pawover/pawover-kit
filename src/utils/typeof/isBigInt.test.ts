import { describe, it, expect } from "vitest";
import { isBigInt } from "./isBigInt";

describe("isBigInt", () => {
  it("should return true for BigInt values", () => {
    expect(isBigInt(BigInt(123))).toBe(true);
    expect(isBigInt(BigInt("12345678901234567890"))).toBe(true);
    expect(isBigInt(123n)).toBe(true); // Literal syntax
    expect(isBigInt(0n)).toBe(true);
  });

  it("should return false for non-BigInt values", () => {
    expect(isBigInt(undefined)).toBe(false);
    expect(isBigInt(null)).toBe(false);
    expect(isBigInt(true)).toBe(false);
    expect(isBigInt(false)).toBe(false);
    expect(isBigInt(0)).toBe(false); // Number type
    expect(isBigInt(1)).toBe(false); // Number type
    expect(isBigInt(NaN)).toBe(false);
    expect(isBigInt(Infinity)).toBe(false);
    expect(isBigInt("")).toBe(false);
    expect(isBigInt("string")).toBe(false);
    expect(isBigInt({})).toBe(false);
    expect(isBigInt([])).toBe(false);
    expect(isBigInt(new Map())).toBe(false);
    expect(isBigInt(new Set())).toBe(false);
    expect(isBigInt(() => {})).toBe(false);
    expect(isBigInt(Symbol("a"))).toBe(false);
  });
});
