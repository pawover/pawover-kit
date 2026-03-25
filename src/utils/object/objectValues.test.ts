import { describe, it, expect } from "vitest";
import { objectValues } from "./objectValues";

describe("objectValues", () => {
  it("should return an array of values for a plain object", () => {
    const obj = { a: 1, b: "hello", c: true };
    const result = objectValues(obj);
    // The order might vary depending on property insertion order, but values must be present
    expect(result.sort()).toEqual([1, "hello", true].sort());
  });

  it("should return an array of values for an object with numeric keys", () => {
    const obj = { 0: "zero", 2: "two", 1: "one" };
    const result = objectValues(obj);
    // Object.values sorts numeric keys first
    expect(result).toEqual(["zero", "one", "two"]);
  });

  it("should return an array of values for an object with symbol keys (symbols are ignored by Object.values)", () => {
    const sym = Symbol("sym");
    const obj = { a: 1, [sym]: "symbol_value", b: "str" };
    const result = objectValues(obj);
    // The symbol property is not included in the result
    expect(result).toEqual([1, "str"]);
  });

  it("should return an array of values for an array-like object (e.g., real Array)", () => {
    const arr = ["a", "b", "c"] as const;
    const result = objectValues(arr);
    expect(result).toEqual(["a", "b", "c"]);
  });

  it("should return an array of values for an array-like object (e.g., arguments object)", () => {
    function getArgs () {
      return arguments;
    }
    // @ts-expect-error
    const args = getArgs(1, "two", true);
    const result = objectValues(args); // Cast to any to satisfy initial object constraint
    expect(result).toEqual([1, "two", true]);
  });

  it("should return an array of values for an object with mixed key types", () => {
    const obj = { "stringKey": "str", 1: "one", "3": "three", 2: "two" } as const;
    const result = objectValues(obj);
    // Numeric keys come first, then string keys in insertion order
    expect(result).toEqual(["one", "two", "three", "str"]);
  });

  it("should return an empty array for an object with no enumerable properties", () => {
    const obj = {};
    const result = objectValues(obj);
    expect(result).toEqual([]);
  });

  it("should return an array of characters for a string", () => {
    const str = "abc";
    const result = objectValues(str);
    expect(result).toEqual(["a", "b", "c"]);
  });

  it("should handle properties from the prototype chain", () => {
    const parent = { inherited: "value" };
    const obj = Object.create(parent);
    obj.ownProp = "ownValue";

    // Object.values only returns own, enumerable properties
    const result = objectValues(obj);
    expect(result).toEqual(["ownValue"]);
  });

  it("should handle non-enumerable properties", () => {
    const obj = { a: 1, b: 2 };
    Object.defineProperty(obj, "nonEnum", {
      value: "non-enumerable",
      enumerable: false,
    });

    const result = objectValues(obj);
    // The non-enumerable property should not be included
    expect(result).toEqual([1, 2]);
  });

  // Note: Type inference tests are harder to write directly with `expect` as they rely on compile-time checks.
  // The following tests ensure the return type is compatible with `unknown[]` at runtime.
  it("should return an array that can be handled generically", () => {
    const obj = { a: 1, b: "hello" };
    const result = objectValues(obj);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
    // Can perform generic array operations
    const joined = result.join(", ");
    expect(typeof joined).toBe("string");
  });
});
