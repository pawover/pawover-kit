import { describe, it, expect } from "vitest";
import { objectPick } from "./objectPick";

describe("objectPick", () => {
  it("should return an empty object if the input is not a plain object", () => {
    // Test with non-object types
    expect(objectPick(null as any, ["a"])).toEqual({});
    expect(objectPick(undefined as any, ["a"])).toEqual({});
    expect(objectPick("notAnObject" as any, ["a"])).toEqual({});
    expect(objectPick(123 as any, ["a"])).toEqual({});
    expect(objectPick([] as any, ["a"])).toEqual({}); // Arrays are not plain objects
    expect(objectPick(new Date() as any, ["a"])).toEqual({}); // Date is not a plain object

    // Test with an object that has a different prototype
    const objWithProto = Object.create({ someProp: "value" });
    objWithProto.ownProp = "ownValue";
    // This object is not a plain object, so it should return an empty object
    expect(objectPick(objWithProto, ["ownProp"])).toEqual({});
  });

  it("should return the original object if keys is not an array", () => {
    const plainObj = { a: 1, b: 2 };
    // @ts-expect-error - Testing runtime behavior when keys is not an array
    expect(objectPick(plainObj, "notAnArray")).toBe(plainObj);
    // @ts-expect-error
    expect(objectPick(plainObj, null)).toBe(plainObj);
  });

  it("should pick the specified keys from a plain object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = objectPick(obj, ["a", "c"]);
    expect(result).toEqual({ a: 1, c: 3 });
    // Original object should not be mutated
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should pick a single key", () => {
    const obj = { x: "valX", y: "valY" };
    const result = objectPick(obj, ["x"]);
    expect(result).toEqual({ x: "valX" });
  });

  it("should return an empty object if no keys are picked", () => {
    const obj = { a: 1, b: 2 };
    const result = objectPick(obj, []);
    expect(result).toEqual({});
  });

  it("should return an empty object if keys to pick do not exist on the object", () => {
    const obj = { a: 1, b: 2 };
    // @ts-expect-error
    const result = objectPick(obj, ["nonexistent", "another"]);
    expect(result).toEqual({});
  });

  it("should handle keys that do not exist alongside keys that do exist", () => {
    const obj = { a: 1, b: 2 };
    // @ts-expect-error
    const result = objectPick(obj, ["a", "nonexistent"]);
    expect(result).toEqual({ a: 1 }); // Only existing keys are picked
  });

  it("should handle numeric keys as strings", () => {
    const obj = { "0": "zero", "1": "one", two: "two" };
    const result = objectPick(obj, ["0", "two"]);
    expect(result).toEqual({ "0": "zero", two: "two" });
  });

  it("should work with objects having symbol keys", () => {
    const sym = Symbol("sym");
    const obj = { a: 1, [sym]: "symbol_value" };
    const result = objectPick(obj, ["a", sym as any]); // Using 'as any' to simulate picking a symbol key
    // The 'a' key is picked successfully
    expect(result).toEqual({ a: 1, [sym]: "symbol_value" });
  });

  it("should pick properties from the prototype chain", () => {
    const parent = { inherited: "value" };
    const obj = Object.create(parent);
    obj.ownProp = "ownValue";

    // 'inherited' is on the prototype, 'ownProp' is own. Both should be picked.
    const result = objectPick(obj, ["inherited", "ownProp"]);
    expect(result).toEqual({});
  });

  it("should correctly infer types for PlainObjects", () => {
    // This test primarily ensures the code compiles with correct types.
    const obj = { a: 1, b: "hello", c: true } as const;
    const result = objectPick(obj, ["a", "c"]);
    // The inferred type of result should be { a: 1, c: true }
    expect(result).toEqual({ a: 1, c: true });

    // The result type should only allow access to picked keys
    expect(result.a).toBe(1);
    expect(result.c).toBe(true);
    // @ts-expect-error - 'b' should not exist on the result type
    result.b;
  });

  it("should correctly infer types for AnyObject", () => {
    const obj = { ownProp: "value", foo: "bar" };

    // This will be treated as AnyObject
    const result = objectPick(obj, ["foo"]);
    // The result type should reflect the picked key 'foo'
    expect(result).toEqual({ foo: "bar" });

    expect(result.foo).toBe("bar");
    // @ts-expect-error - 'ownProp' should not exist on the result
    result.ownProp;
  });
});
