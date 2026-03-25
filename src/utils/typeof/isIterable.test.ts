import { describe, it, expect } from "vitest";
import { isIterable } from "./isIterable";

describe("isIterable", () => {
  it("should return true for built-in iterable objects", () => {
    expect(isIterable([])).toBe(true); // Array
    expect(isIterable("hello")).toBe(true); // String
    expect(isIterable(new Set())).toBe(true); // Set
    expect(isIterable(new Map())).toBe(true); // Map
    expect(isIterable(new Int8Array(5))).toBe(true); // TypedArray
  });

  it("should return false for non-iterable objects", () => {
    expect(isIterable(undefined)).toBe(false);
    expect(isIterable(null)).toBe(false);
    expect(isIterable(true)).toBe(false);
    expect(isIterable(false)).toBe(false);
    expect(isIterable(0)).toBe(false);
    expect(isIterable(1)).toBe(false);
    expect(isIterable(NaN)).toBe(false);
    expect(isIterable(Infinity)).toBe(false);
    expect(isIterable({})).toBe(false); // Plain object
    expect(isIterable(() => {})).toBe(false); // Function
    expect(isIterable(Symbol("a"))).toBe(false); // Symbol
    expect(isIterable(BigInt(123))).toBe(false); // BigInt
    expect(isIterable(new WeakSet())).toBe(false); // WeakSet is not iterable
    expect(isIterable(new WeakMap())).toBe(false); // WeakMap is not iterable
  });

  it("should return true for custom iterable objects", () => {
    const customIterable = {
      *[Symbol.iterator] () {
        yield 1;
        yield 2;
        yield 3;
      },
    };
    expect(isIterable(customIterable)).toBe(true);

    const anotherCustomIterable = {
      [Symbol.iterator]: function *() {
        yield "a";
        yield "b";
      },
    };
    expect(isIterable(anotherCustomIterable)).toBe(true);
  });

  it("should return false for objects with non-function Symbol.iterator", () => {
    const objWithNonFuncIterator = {
      [Symbol.iterator]: "not a function",
    };
    expect(isIterable(objWithNonFuncIterator)).toBe(false);

    const objWithNumberIterator = {
      [Symbol.iterator]: 123,
    };
    expect(isIterable(objWithNumberIterator)).toBe(false);
  });
});
