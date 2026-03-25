import { describe, it, expect, expectTypeOf } from "vitest";
import { objectMapEntries } from "./objectMapEntries";

describe("objectMapEntries", () => {
  it("should map keys and values using the provided function", () => {
    const mappedObj = objectMapEntries({ a: 1, b: 2, c: 3 }, (key, value) => [key.toUpperCase(), value * 2]);

    expect(mappedObj).toEqual({ A: 2, B: 4, C: 6 });
  });

  it("should return an empty object if the input object is empty", () => {
    const mappedObj = objectMapEntries({}, (key, value) => [`${key}_new`, value]);

    expect(mappedObj).toEqual({});
  });

  it("should return an empty object if the input is null or undefined", () => {
    // @ts-expect-error: Testing runtime behavior
    expect(objectMapEntries(null, (k, v) => [k, v])).toEqual({});
    // @ts-expect-error
    expect(objectMapEntries(undefined, (k, v) => [k, v])).toEqual({});
  });

  it("should create a new object instance", () => {
    const obj = { a: 1 };
    const mappedObj = objectMapEntries(obj, (key, value) => [key, value]);

    expect(mappedObj).toEqual({ a: 1 });
    expect(mappedObj).not.toBe(obj);
  });

  it("should allow changing both key and value types", () => {
    const obj = { num1: 1, num2: 2 };
    const mappedObj = objectMapEntries(obj, (key, value) => [`str_${key}`, String(value)]);

    // The resulting type should reflect the transformation
    // @ts-expect-error
    expectTypeOf(mappedObj).toEqualTypeOf<{ [x: string]: string }>();

    expect(mappedObj).toEqual({ str_num1: "1", str_num2: "2" });
  });

  it("should handle mapping to symbol keys", () => {
    const symA = Symbol("a");
    const symB = Symbol("b");
    const obj = { a: 1, b: 2 };
    // @ts-expect-error
    const mappedObj = objectMapEntries(obj, (key, value) => {
      if (key === "a") {
        return [symA, value];
      }

      return [symB, value * 10];
    });

    expect(mappedObj[symA]).toBe(1);
    expect(mappedObj[symB]).toBe(20);
    expect(Object.keys(mappedObj).length).toBe(0); // Symbols are not in Object.keys
  });

  it("should handle duplicate keys gracefully (later keys overwrite earlier ones)", () => {
    const obj = { a: 1, b: 2, c: 3 };
    // Map all keys to the same new key
    const mappedObj = objectMapEntries(obj, (key, value) => ["same_key", `${key}_${value}`]);

    // Only the last entry should remain
    expect(mappedObj).toEqual({ same_key: "c_3" });
  });

  it("should work with numeric and string keys", () => {
    const obj = { "1": "one", 2: "two", three: 3 };
    const mappedObj = objectMapEntries(obj, (key, value) => [String(value), key]);

    expect(mappedObj).toEqual({ one: "1", two: "2", "3": "three" });
  });
});
