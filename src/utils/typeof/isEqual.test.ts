import { describe, it, expect } from "vitest";
import { isEqual } from "./isEqual";

describe("isEqual", () => {
  it("should return true for identical values using Object.is", () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual(+0, +0)).toBe(true);
    expect(isEqual(-0, -0)).toBe(true);
    expect(isEqual(NaN, NaN)).toBe(true);
    expect(isEqual("a", "a")).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
    const obj = {};
    expect(isEqual(obj, obj)).toBe(true);
  });

  it("should return false for different primitive values", () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual(1, "1")).toBe(false);
    expect(isEqual(0, -0)).toBe(false);
    expect(isEqual(NaN, 1)).toBe(false);
    expect(isEqual("a", "b")).toBe(false);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);
  });

  it("should handle Date objects correctly", () => {
    const date1 = new Date("2023-01-01");
    const date2 = new Date("2023-01-01");
    const date3 = new Date("2023-01-02");

    expect(isEqual(date1, date2)).toBe(true);
    expect(isEqual(date1, date3)).toBe(false);
  });

  it("should handle RegExp objects correctly", () => {
    const regex1 = /abc/gi;
    const regex2 = /abc/gi;
    const regex3 = /abc/g;

    expect(isEqual(regex1, regex2)).toBe(true);
    expect(isEqual(regex1, regex3)).toBe(false);
  });

  it("should handle plain objects correctly", () => {
    expect(isEqual({}, {})).toBe(true);
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true); // Order independent
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false); // Different keys
    expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true); // Nested objects
    expect(isEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false); // Nested difference
  });

  it("should handle arrays correctly", () => {
    expect(isEqual([], [])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, 2, 3], [3, 2, 1])).toBe(false); // Order matters for arrays
    expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(isEqual([1, [2, 3]], [1, [3, 2]])).toBe(false);
  });

  it("should handle Symbol keys correctly", () => {
    const sym = Symbol("a");
    expect(isEqual({ [sym]: 1 }, { [sym]: 1 })).toBe(true);
    expect(isEqual({ [sym]: 1 }, { [sym]: 2 })).toBe(false);
  });

  it("should handle circular references correctly", () => {
    const objA: any = { name: "A" };
    objA.ref = objA; // Creates a cycle: objA.ref -> objA

    const objB: any = { name: "A" };
    objB.ref = objB; // Creates an equivalent cycle

    const objC: any = { name: "C" };
    objC.ref = objC;

    expect(isEqual(objA, objB)).toBe(true);
    expect(isEqual(objA, objC)).toBe(false);
  });

  it("should handle complex nested circular references", () => {
    const a: any = { name: "a" };
    const b: any = { name: "b" };

    a.friend = b;
    b.friend = a; // Creates mutual reference: a.friend -> b, b.friend -> a

    const a2: any = { name: "a" };
    const b2: any = { name: "b" };

    a2.friend = b2;
    b2.friend = a2; // Equivalent structure

    expect(isEqual(a, a2)).toBe(true);
    expect(isEqual(a, b)).toBe(false);
  });

  it("should handle deeply nested objects with circular references", () => {
    const deepA: any = { level1: { level2: { name: "deep" } } };
    deepA.level1.level2.self = deepA; // Circular ref back to root

    const deepB: any = { level1: { level2: { name: "deep" } } };
    deepB.level1.level2.self = deepB; // Equivalent circular ref

    expect(isEqual(deepA, deepB)).toBe(true);
  });
});
