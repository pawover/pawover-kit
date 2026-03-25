import { describe, it, expect } from "vitest";
import { objectEntries } from "./objectEntries";

describe("objectEntries", () => {
  it("should return an array of [key, value] pairs for a plain object", () => {
    const result = objectEntries({ a: 1, b: "hello", c: true });
    // The order might vary, but all key-value pairs must be present
    expect(result).toContainEqual(["a", 1]);
    expect(result).toContainEqual(["b", "hello"]);
    expect(result).toContainEqual(["c", true]);
    expect(result.length).toBe(3);
  });

  it("should return an array of [key, value] pairs for an object with numeric keys (keys become strings)", () => {
    const result = objectEntries({ 0: "zero", 2: "two", 1: "one" });
    // Object.entries sorts numeric keys first, and keys are always strings
    expect(result).toEqual([["0", "zero"], ["1", "one"], ["2", "two"]]);
  });

  it("should return an array of [key, value] pairs for an object with symbol keys (symbols are ignored by Object.entries)", () => {
    const sym = Symbol("sym");
    const result = objectEntries({ a: 1, [sym]: "symbol_value", b: "str" });
    // The symbol property is not included in the result
    expect(result).toEqual([["a", 1], ["b", "str"]]);
  });

  it("should return an array of [index, value] pairs for an array", () => {
    const result = objectEntries(["a", "b", "c"]);
    expect(result).toEqual([["0", "a"], ["1", "b"], ["2", "c"]]);
  });

  it("should return an array of [key, value] pairs for an object with mixed key types", () => {
    const result = objectEntries({ "stringKey": "str", 1: "one", "3": "three", 2: "two" });
    // Numeric keys come first as strings, then string keys
    expect(result).toEqual([["1", "one"], ["2", "two"], ["3", "three"], ["stringKey", "str"]]);
  });

  it("should return an empty array for an object with no enumerable properties", () => {
    const result = objectEntries({});
    expect(result).toEqual([]);
  });

  it("should return an array of [index, char] pairs for a string", () => {
    const result = objectEntries("ab");
    expect(result).toEqual([["0", "a"], ["1", "b"]]);
  });

  it("should handle properties from the prototype chain", () => {
    const parent = { inherited: "value" };
    const obj = Object.create(parent);
    obj.ownProp = "ownValue";

    // Object.entries only returns own, enumerable properties
    const result = objectEntries(obj);
    expect(result).toEqual([["ownProp", "ownValue"]]);
  });

  it("should handle non-enumerable properties", () => {
    const obj = { a: 1, b: 2 };
    Object.defineProperty(obj, "nonEnum", {
      value: "non-enumerable",
      enumerable: false,
    });

    const result = objectEntries(obj);
    // The non-enumerable property should not be included
    expect(result).toEqual([["a", 1], ["b", 2]]);
  });

  // Note: Type inference tests are harder to write directly with `expect`.
  // The following tests ensure the return type is compatible with `Array<[string, unknown]>` at runtime.
  it("should return an array of tuples that can be handled generically", () => {
    const result = objectEntries({ a: 1, b: "hello" });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
    // Can destructure the tuples
    const [[firstKey, firstValue]] = result;
    expect(typeof firstKey).toBe("string");
    expect(firstValue).toBeDefined();
  });
});
