/* eslint-disable no-new-wrappers */
import { describe, it, expect } from "vitest";
import { isString } from "./isString";

describe("isString", () => {
  it("should return true for all string values when checkEmpty is false (default)", () => {
    expect(isString("")).toBe(true);
    expect(isString("hello")).toBe(true);
    expect(isString("123")).toBe(true);
    expect(isString("   ")).toBe(true); // String with spaces
    expect(isString(String("from_constructor"))).toBe(true);
  });

  it("should return false for non-string values when checkEmpty is false (default)", () => {
    expect(isString(undefined)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString(0)).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString(NaN)).toBe(false);
    expect(isString(Infinity)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(() => {})).toBe(false);
    expect(isString(Symbol("a"))).toBe(false);
    expect(isString(BigInt(123))).toBe(false);
    // Note: new String() creates a String object, not a primitive string
    expect(isString(new String("primitive_wrapped"))).toBe(false);
  });

  it("should return true for non-empty strings when checkEmpty is true", () => {
    expect(isString("hello", true)).toBe(true);
    expect(isString("123", true)).toBe(true);
    expect(isString("   ", true)).toBe(true); // String with spaces is not empty
    expect(isString(String("from_constructor"), true)).toBe(true);
  });

  it("should return false for empty strings when checkEmpty is true", () => {
    expect(isString("", true)).toBe(false);
  });
});
