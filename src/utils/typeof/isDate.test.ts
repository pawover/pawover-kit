import { describe, it, expect } from "vitest";
import { isDate } from "./isDate";

describe("isDate", () => {
  it("should return false for non-object and null values", () => {
    expect(isDate(undefined)).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(true)).toBe(false);
    expect(isDate(false)).toBe(false);
    expect(isDate(0)).toBe(false);
    expect(isDate(1)).toBe(false);
    expect(isDate(NaN)).toBe(false);
    expect(isDate(Infinity)).toBe(false);
    expect(isDate("")).toBe(false);
    expect(isDate("2023-01-01")).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate(() => {})).toBe(false);
    expect(isDate(Symbol("a"))).toBe(false);
    expect(isDate(BigInt(123))).toBe(false);
  });

  it("should return false for non-Date objects", () => {
    const obj = new (class {})();
    expect(isDate(obj)).toBe(false);
    expect(isDate(new Error())).toBe(false);
    expect(isDate(new Map())).toBe(false);
  });

  it("should return true for a valid Date object when invalidCheck is true (default)", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date(0))).toBe(true); // Unix epoch
    expect(isDate(new Date("2023-01-01"))).toBe(true);
    expect(isDate(new Date("2023-01-01T00:00:00Z"))).toBe(true);
  });

  it("should return false for an Invalid Date object when invalidCheck is true (default)", () => {
    expect(isDate(new Date("invalid_date_string"))).toBe(false);
    expect(isDate(new Date(""))).toBe(false);
    expect(isDate(new Date(NaN))).toBe(false);
  });

  it("should return true for an Invalid Date object when invalidCheck is false", () => {
    expect(isDate(new Date("invalid_date_string"), false)).toBe(true);
    expect(isDate(new Date(""), false)).toBe(true);
    expect(isDate(new Date(NaN), false)).toBe(true);
  });

  it("should return true for a valid Date object when invalidCheck is explicitly true", () => {
    expect(isDate(new Date(), true)).toBe(true);
    expect(isDate(new Date(1234567890000), true)).toBe(true);
  });
});
