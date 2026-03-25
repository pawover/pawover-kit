import { describe, it, expect } from "vitest";
import { numberWithin } from "./numberWithin";

describe("numberWithin", () => {
  it("should throw an error if input is not a number", () => {
    expect(() => numberWithin("5" as any, [1, 10])).toThrow(
      "params [input] mast be a number.",
    );
    expect(() => numberWithin(null as any, [1, 10])).toThrow(
      "params [input] mast be a number.",
    );
    expect(() => numberWithin(undefined as any, [1, 10])).toThrow(
      "params [input] mast be a number.",
    );
  });

  it("should throw an error if input is infinite", () => {
    expect(() => numberWithin(Infinity, [1, 10])).toThrow(
      "params [input] mast be a finite number.",
    );
    expect(() => numberWithin(-Infinity, [1, 10])).toThrow(
      "params [input] mast be a finite number.",
    );
  });

  it("should throw an error if the interval is invalid (left > right)", () => {
    expect(() => numberWithin(5, [10, 1])).toThrow(
      "Invalid interval: left (10) must be <= right (1).",
    );
  });

  it("should check within an open interval (left, right)", () => {
    expect(numberWithin(5, [1, 10], false, false)).toBe(true); // 5 in (1, 10)
    expect(numberWithin(1, [1, 10], false, false)).toBe(false); // 1 not in (1, 10)
    expect(numberWithin(10, [1, 10], false, false)).toBe(false); // 10 not in (1, 10)
  });

  it("should check within a closed interval [left, right]", () => {
    expect(numberWithin(5, [1, 10], true, true)).toBe(true); // 5 in [1, 10]
    expect(numberWithin(1, [1, 10], true, true)).toBe(true); // 1 in [1, 10]
    expect(numberWithin(10, [1, 10], true, true)).toBe(true); // 10 in [1, 10]
  });

  it("should check within a left-open, right-closed interval (left, right]", () => {
    expect(numberWithin(5, [1, 10], false, true)).toBe(true); // 5 in (1, 10]
    expect(numberWithin(1, [1, 10], false, true)).toBe(false); // 1 not in (1, 10]
    expect(numberWithin(10, [1, 10], false, true)).toBe(true); // 10 in (1, 10]
  });

  it("should check within a left-closed, right-open interval [left, right) by default", () => {
    // Default is [left, right)
    expect(numberWithin(5, [1, 10])).toBe(true); // 5 in [1, 10)
    expect(numberWithin(1, [1, 10])).toBe(true); // 1 in [1, 10)
    expect(numberWithin(10, [1, 10])).toBe(false); // 10 not in [1, 10)
  });

  it("should handle intervals where left equals right", () => {
    expect(numberWithin(5, [5, 5], true, true)).toBe(true); // 5 in [5, 5]
    expect(numberWithin(5, [5, 5], false, true)).toBe(false); // 5 not in (5, 5]
    expect(numberWithin(5, [5, 5], true, false)).toBe(false); // 5 not in [5, 5)
    expect(numberWithin(5, [5, 5], false, false)).toBe(false); // 5 not in (5, 5)
  });

  it("should handle negative numbers and ranges", () => {
    expect(numberWithin(-5, [-10, -1], true, true)).toBe(true); // -5 in [-10, -1]
    expect(numberWithin(-10, [-10, -1], true, false)).toBe(true); // -10 in [-10, -1)
    expect(numberWithin(-1, [-10, -1], false, true)).toBe(true); // -1 in (-10, -1]
  });

  it("should handle decimal numbers", () => {
    expect(numberWithin(1.5, [1, 2], true, true)).toBe(true); // 1.5 in [1, 2]
    expect(numberWithin(1.0, [1, 2], true, false)).toBe(true); // 1.0 in [1, 2)
    expect(numberWithin(2.0, [1, 2], false, true)).toBe(true); // 2.0 in (1, 2]
  });
});
