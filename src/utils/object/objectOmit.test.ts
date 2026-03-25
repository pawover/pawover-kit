import { describe, it, expect } from "vitest";
import { objectOmit } from "./objectOmit";

describe("objectOmit", () => {
  it("should return an empty object if the input is not a plain object", () => {
    // Test with non-object types
    expect(objectOmit(null as any, ["a"])).toEqual({});
    expect(objectOmit(undefined as any, ["a"])).toEqual({});
    expect(objectOmit("notAnObject" as any, ["a"])).toEqual({});
    expect(objectOmit(123 as any, ["a"])).toEqual({});
    expect(objectOmit([] as any, ["a"])).toEqual({}); // Arrays are not plain objects
    expect(objectOmit(new Date() as any, ["a"])).toEqual({}); // Date is not a plain object

    // Test with an object that has a different prototype
    const objWithProto = Object.create({ someProp: "value" });
    objWithProto.ownProp = "ownValue";
    // This object is not a plain object, so it should return an empty object
    expect(objectOmit(objWithProto, ["someProp"])).toEqual({});
  });

  it("should return the original object if keys is not an array", () => {
    const plainObj = { a: 1, b: 2 };
    // @ts-expect-error - Testing runtime behavior when keys is not an array
    expect(objectOmit(plainObj, "notAnArray")).toBe(plainObj);
    // @ts-expect-error
    expect(objectOmit(plainObj, null)).toBe(plainObj);
  });

  it("should omit the specified keys from a plain object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = objectOmit(obj, ["a", "c"]);
    expect(result).toEqual({ b: 2 });
    // Original object should not be mutated
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should omit a single key", () => {
    const obj = { x: "valX", y: "valY" };
    const result = objectOmit(obj, ["x"]);
    expect(result).toEqual({ y: "valY" });
  });

  it("should return a full copy if no keys are omitted", () => {
    const obj = { a: 1, b: 2 };
    const result = objectOmit(obj, []);
    expect(result).toEqual(obj);
    expect(result).not.toBe(obj); // Should be a new object
  });

  it("should return a full copy if keys to omit do not exist on the object", () => {
    const obj = { a: 1, b: 2 };
    // @ts-expect-error
    const result = objectOmit(obj, ["nonexistent", "another"]);
    expect(result).toEqual(obj);
    expect(result).not.toBe(obj); // Should be a new object
  });

  it("should handle numeric keys as strings", () => {
    const obj = { "0": "zero", "1": "one", "two": "two" };
    const result = objectOmit(obj, ["0"]);
    expect(result).toEqual({ "1": "one", "two": "two" });
  });

  it("should work with objects having symbol keys (symbols are ignored by Object.keys)", () => {
    const sym = Symbol("sym");
    const obj = { a: 1, [sym]: "symbol_value" };
    const result = objectOmit(obj, ["a"]);
    // Since Object.keys ignores symbols, the result will be an empty object
    // even though the symbol property still exists on the original.
    expect(result).toEqual({});
  });

  it("should correctly infer types for PlainObjects", () => {
    // This test primarily ensures the code compiles with correct types.
    const obj = { a: 1, b: "hello", c: true } as const;
    const result = objectOmit(obj, ["b"]);
    // The inferred type of result should be { a: 1, c: true }
    expect(result).toEqual({ a: 1, c: true });

    // 'a' should not exist on the result type
    expect(result.a).toBe(1);
    // @ts-expect-error - 'b' should not exist on the result type
    expect(result.b).toBe(undefined);
    // Accessing 'c' should be fine
    expect(result.c).toBe(true);
  });

  it("should correctly infer types for AnyObject (which resolves to PlainObject here)", () => {
    const obj = { ownProp: "value", foo: "bar" };

    // This will be treated as AnyObject, which in this context means a PlainObject
    const result = objectOmit(obj, ["foo"]);
    // The result type should reflect the omission of 'foo'
    expect(result).toEqual({ ownProp: "value" });
    expect(result.ownProp).toBe("value");
  });
});
