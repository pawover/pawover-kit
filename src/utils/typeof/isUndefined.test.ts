import { describe, it, expect } from "vitest";
import { isUndefined } from "./isUndefined";

describe("isUndefined", () => {
  it("should return true for undefined values", () => {
    expect(isUndefined(undefined)).toBe(true);

    // An uninitialized variable is undefined
    let someVariable: any;
    expect(isUndefined(someVariable)).toBe(true);

    // A property that does not exist returns undefined
    const obj = {};
    expect(isUndefined((obj as any).nonExistentProperty)).toBe(true);
  });

  it("should return false for non-undefined values", () => {
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined(1)).toBe(false);
    expect(isUndefined(NaN)).toBe(false);
    expect(isUndefined(Infinity)).toBe(false);
    expect(isUndefined("")).toBe(false);
    expect(isUndefined("string")).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined(new Map())).toBe(false);
    expect(isUndefined(new Set())).toBe(false);
    expect(isUndefined(() => {})).toBe(false);
    expect(isUndefined(Symbol("a"))).toBe(false);
    expect(isUndefined(BigInt(123))).toBe(false);
  });
});
