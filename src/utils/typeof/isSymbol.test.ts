import { describe, it, expect } from "vitest";
import { isSymbol } from "./isSymbol";

describe("isSymbol", () => {
  it("should return true for Symbol values", () => {
    expect(isSymbol(Symbol("description"))).toBe(true);
    // eslint-disable-next-line symbol-description
    expect(isSymbol(Symbol())).toBe(true); // Symbol without description
    expect(isSymbol(Symbol.iterator)).toBe(true); // Well-known symbols
    expect(isSymbol(Symbol.for("foo"))).toBe(true); // Registered symbols
  });

  it("should return false for non-Symbol values", () => {
    expect(isSymbol(undefined)).toBe(false);
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(true)).toBe(false);
    expect(isSymbol(false)).toBe(false);
    expect(isSymbol(0)).toBe(false);
    expect(isSymbol(1)).toBe(false);
    expect(isSymbol(NaN)).toBe(false);
    expect(isSymbol(Infinity)).toBe(false);
    expect(isSymbol("")).toBe(false);
    expect(isSymbol("string")).toBe(false);
    expect(isSymbol({})).toBe(false);
    expect(isSymbol([])).toBe(false);
    expect(isSymbol(new Map())).toBe(false);
    expect(isSymbol(new Set())).toBe(false);
    expect(isSymbol(() => {})).toBe(false);
    expect(isSymbol(BigInt(123))).toBe(false);
  });
});
