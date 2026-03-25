import { describe, it, expect } from "vitest";
import { arrayCast } from "./arrayCast";

describe("arrayCast", () => {
  it("should wrap a single non-array value in an array when checkEmpty is true (default)", () => {
    expect(arrayCast(1)).toEqual([1]);
    expect(arrayCast("hello")).toEqual(["hello"]);
    expect(arrayCast({})).toEqual([{}]);
    expect(arrayCast(true)).toEqual([true]);
  });

  it("should return a shallow copy of the array when input is an array and checkEmpty is true (default)", () => {
    const originalArray = [1, 2, 3];
    const result = arrayCast(originalArray);
    expect(result).toEqual(originalArray);
    expect(result).not.toBe(originalArray); // Ensure it's a different reference
  });

  it("should return an empty array for null or undefined when checkEmpty is true (default)", () => {
    expect(arrayCast(null)).toEqual([]);
    expect(arrayCast(undefined)).toEqual([]);
  });

  it("should return [null] or [undefined] when checkEmpty is false", () => {
    expect(arrayCast(null, false)).toEqual([null]);
    expect(arrayCast(undefined, false)).toEqual([undefined]);
  });

  it("should wrap a single non-array value in an array when checkEmpty is false", () => {
    expect(arrayCast(1, false)).toEqual([1]);
    expect(arrayCast("hello", false)).toEqual(["hello"]);
  });

  it("should return a shallow copy of the array when checkEmpty is false", () => {
    const originalArray = [1, 2, 3];
    const result = arrayCast(originalArray, false);
    expect(result).toEqual(originalArray);
    expect(result).not.toBe(originalArray); // Ensure it's a different reference
  });

  it("should handle mixed arrays correctly, preserving internal null/undefined regardless of checkEmpty flag", () => {
    const mixedInput = [1, "two", null, undefined, {}];

    // When candidate is an array, checkEmpty has NO effect on its internal elements.
    // The array is just copied.
    expect(arrayCast(mixedInput)).toEqual([1, "two", null, undefined, {}]);
    expect(arrayCast(mixedInput, false)).toEqual([1, "two", null, undefined, {}]);
  });

  it("should preserve internal null/undefined when wrapping a single array value", () => {
    const singleArrayValue = [1, null, "test", undefined];
    expect(arrayCast(singleArrayValue)).toEqual([1, null, "test", undefined]);
    expect(arrayCast(singleArrayValue, false)).toEqual([1, null, "test", undefined]);
  });
});
