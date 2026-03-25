import { describe, it, expect } from "vitest";
import { objectInvert } from "./objectInvert";

describe("objectInvert", () => {
  it("should invert keys and values of an object with string values", () => {
    const result = objectInvert({ a: "x", b: "y" });
    expect(result).toEqual({ x: "a", y: "b" });
  });

  it("should invert keys and values of an object with number values", () => {
    const result = objectInvert({ one: 1, two: 2 });
    expect(result).toEqual({ "1": "one", "2": "two" });
  });

  it("should invert keys and values of an object with symbol values", () => {
    const sym1 = Symbol("s1");
    const sym2 = Symbol("s2");
    const result = objectInvert({ key1: sym1, key2: sym2 });
    expect(result).toEqual({ [sym1]: "key1", [sym2]: "key2" });
  });

  it("should handle an object with mixed primitive key types", () => {
    const sym = Symbol("sym");
    const result = objectInvert({ a: "1", b: 2, c: sym });
    expect(result).toEqual({ "1": "a", "2": "b", [sym]: "c" });
  });

  it("should ignore values that are not valid keys (objects, functions, etc.)", () => {
    const result = objectInvert({ a: 1, b: "valid", c: {}, d: [] });
    // Only '1' and 'valid' are valid keys, so only those should be inverted
    expect(result).toEqual({ "1": "a", "valid": "b" });
  });

  it("should handle duplicate values, where the last key wins", () => {
    const result = objectInvert({ a: "same", b: "same", c: "different" });
    // The value 'same' appears twice. The final key for 'same' should be 'b'.
    expect(result).toEqual({ same: "b", different: "c" });
  });

  it("should return an empty object if the input is not an object", () => {
    // @ts-expect-error: Testing runtime behavior with non-object
    expect(objectInvert(null)).toEqual({});
    // @ts-expect-error
    expect(objectInvert("notAnObject")).toEqual({});
    // @ts-expect-error
    expect(objectInvert(123)).toEqual({});
  });

  it("should return an empty object if the input object has no valid keys to invert", () => {
    const result = objectInvert({ a: [], b: {} });
    expect(result).toEqual({});
  });

  it("should preserve the type of keys after inversion", () => {
    const result = objectInvert({ num: 42, str: "hello", sym: Symbol("test") });
    // The result type should reflect the inversion
    // e.g., result[42] should be 'num'
    expect(result[42]).toBe("num");
    expect(result.hello).toBe("str");
    // @ts-expect-error 'invalid_key' does not exist on the inverted type
    result.invalid_key;
  });

  it("should handle objects with numeric string keys correctly", () => {
    const result = objectInvert({ "1": "one", "2": "two", "three": 3 });
    // Keys are always strings in the result, so '1' and '2' become string keys
    expect(result).toEqual({ "one": "1", "two": "2", "3": "three" });
  });
});
