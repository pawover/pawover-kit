import { describe, it, expect } from "vitest";
import { objectKeys } from "./objectKeys";

describe("objectKeys", () => {
  it("should return an array of keys for a plain object with type inference", () => {
    const obj = { a: 1, b: "hello", c: true };
    const keys = objectKeys(obj);

    // The type of `keys` should be inferred as `("a" | "b" | "c")[]`
    expect(keys).toEqual(["a", "b", "c"]);

    // This should be valid at compile time
    const firstKey: "a" | "b" | "c" = keys[0];
    expect(["a", "b", "c"]).toContain(firstKey);
  });

  it("should return an array of keys for an arbitrary object", () => {
    const obj = Object.create({ protoProp: "inherited" });
    obj.ownProp = "value";
    const keys = objectKeys(obj);
    expect(keys).toEqual(["ownProp"]);
  });

  it("should return an array of indices for an array-like object", () => {
    const arr = [10, 20, 30] as const;
    const keys = objectKeys(arr);
    // Runtime behavior: Object.keys([10, 20, 30]) -> ["0", "1", "2"]
    expect(keys).toEqual(["0", "1", "2"]);
  });

  it("should return an array of indices for a string (runtime behavior)", () => {
    const str = "hi";
    const keys = objectKeys(str);
    // Runtime behavior: Object.keys("hi") -> ["0", "1"]
    expect(keys).toEqual(["0", "1"]);
  });

  it("should handle an object with numeric keys", () => {
    const obj = { 1: "one", 2: "two", foo: "bar" };
    const keys = objectKeys(obj);
    // Object.keys orders keys: first numbers as strings in ascending order, then strings
    expect(keys).toEqual(["1", "2", "foo"]);
  });

  it("should handle an empty object", () => {
    const obj = {};
    const keys = objectKeys(obj);
    expect(keys).toEqual([]);
  });

  // Note on type tests:
  // These are compile-time checks. If the code compiles, the types are working as expected.
  // We can add them as comments to illustrate the expected type behavior.
  /*
  it('should have correct inferred types (compile-time test)', () => {
    const obj = { x: 1, y: 'a' };
    const keys = objectKeys(obj); // Expected type: ("x" | "y")[]

    // This should cause a TypeScript error if uncommented, because 'z' is not a key of obj
    // const invalidKey: 'x' | 'y' | 'z' = keys[0];

    const arr = [1, 2];
    const arrKeys = objectKeys(arr); // Runtime: ["0", "1"], Type system may infer based on Range logic
  });
  */
});
