import { describe, it, expect } from "vitest";
import { arrayZipToObject } from "./arrayZipToObject";

describe("arrayZipToObject", () => {
  it("should return an empty object if keys array is not an array or is empty", () => {
    expect(arrayZipToObject(null as any, [])).toEqual({});
    expect(arrayZipToObject(undefined as any, [])).toEqual({});
    expect(arrayZipToObject([], [])).toEqual({});
    expect(arrayZipToObject([], (k) => k)).toEqual({});
    expect(arrayZipToObject([], "default")).toEqual({});
  });

  it("should zip keys with an array of values", () => {
    const result = arrayZipToObject(["a", "b", "c"], [1, 2, 3]);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should zip keys with an array of values of different types", () => {
    const result = arrayZipToObject(["name", "age", "active"], ["Alice", 30, true]);
    expect(result).toEqual({ name: "Alice", age: 30, active: true });
  });

  it("should zip keys with a generator function", () => {
    const result = arrayZipToObject(["a", "b"], (key, index) => `${key}-${index}`);
    expect(result).toEqual({ a: "a-0", b: "b-1" });
  });

  it("should zip keys with a static value", () => {
    const result = arrayZipToObject(["x", "y", "z"], "static");
    expect(result).toEqual({ x: "static", y: "static", z: "static" });
  });

  it("should zip keys with a static value of type null or undefined", () => {
    const resultNull = arrayZipToObject(["a", "b"], null);
    expect(resultNull).toEqual({ a: null, b: null });

    const resultUndefined = arrayZipToObject(["a", "b"], undefined);
    expect(resultUndefined).toEqual({ a: undefined, b: undefined });
  });

  it("should handle arrays of different lengths (keys determine object size)", () => {
    // More values than keys - extra values are ignored
    const result1 = arrayZipToObject(["a"], [1, 2, 3]);
    expect(result1).toEqual({ a: 1 });

    // More keys than values - missing values become undefined
    const result2 = arrayZipToObject(["a", "b", "c"], [1, 2]);
    expect(result2).toEqual({ a: 1, b: 2, c: undefined });
  });

  it("should handle Symbol keys", () => {
    const symA = Symbol("a");
    const symB = Symbol("b");
    const result = arrayZipToObject([symA, symB], [1, 2]);
    expect(result).toEqual({ [symA]: 1, [symB]: 2 });
  });

  it("should pass the correct arguments to the generator function", () => {
    const mockFn = (key: string, index: number) => ({ key, index });
    const result = arrayZipToObject(["x", "y"], mockFn);
    expect(result).toEqual({
      x: { key: "x", index: 0 },
      y: { key: "y", index: 1 },
    });
  });
});
