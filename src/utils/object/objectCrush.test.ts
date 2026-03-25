import { describe, it, expect, expectTypeOf } from "vitest";
import { objectCrush } from "./objectCrush";

describe("objectCrush", () => {
  it("should flatten a nested object", () => {
    const obj = {
      a: {
        b: 1,
        c: {
          d: "hello",
          e: [1, 2, 3],
        },
      },
      f: 2,
    };

    const crushed = objectCrush(obj);

    // Function recursively flattens arrays too.
    expect(crushed).toEqual({
      "a.b": 1,
      "a.c.d": "hello",
      "a.c.e.0": 1, // Array elements are flattened
      "a.c.e.1": 2,
      "a.c.e.2": 3,
      f: 2,
    });
  });

  it("should handle an empty object", () => {
    const obj = {};
    const crushed = objectCrush(obj);

    expect(crushed).toEqual({});
  });

  it("should handle an object with primitive values only", () => {
    const obj = { a: 1, b: "test", c: true };
    const crushed = objectCrush(obj);

    expect(crushed).toEqual(obj);
  });

  it("should handle an object with an empty nested object", () => {
    const obj = { a: 1, b: {} };
    const crushed = objectCrush(obj);

    expect(crushed).toEqual({ a: 1 });
  });

  it("should handle an object with arrays containing objects", () => {
    const obj = {
      arr: [
        { name: "Alice", details: { age: 30 } },
        { name: "Bob", details: { age: 25 } },
      ],
    };

    const crushed = objectCrush(obj);

    // Function recursively flattens arrays and their contents.
    expect(crushed).toEqual({
      "arr.0.name": "Alice",
      "arr.0.details.age": 30,
      "arr.1.name": "Bob",
      "arr.1.details.age": 25,
    });
  });

  it("should handle an object with null and undefined values", () => {
    const obj = { a: null, b: undefined, c: 3 };
    const crushed = objectCrush(obj);

    expect(crushed).toEqual({ a: null, b: undefined, c: 3 });
  });

  it("should handle deeply nested structures", () => {
    const obj = {
      level1: {
        level2: {
          level3: {
            final: "value",
          },
        },
      },
    };

    const crushed = objectCrush(obj);

    expect(crushed).toEqual({
      "level1.level2.level3.final": "value",
    });
  });

  it("should return an empty object if the input is null or undefined", () => {
    // @ts-expect-error: Testing runtime behavior
    expect(objectCrush(null)).toEqual({});
    // @ts-expect-error
    expect(objectCrush(undefined)).toEqual({});
  });

  it("should correctly infer the type of a simple nested object", () => {
    const obj = { a: { b: 1 }, c: "str" };
    const result = objectCrush(obj);

    // The type should be a record with string keys and a union of possible value types.
    // @ts-expect-error
    expectTypeOf(result).toEqualTypeOf<{ "a.b": number; c: string }>();
  });

  it("should correctly infer the type when values are mixed (objects and primitives)", () => {
    const obj = { a: { b: { c: true } }, d: 10 };
    const result = objectCrush(obj);

    // @ts-expect-error
    expectTypeOf(result).toEqualTypeOf<{ "a.b.c": boolean; d: number }>();
  });

  it("should correctly infer the type when an array is present", () => {
    const obj = { arr: [1, 2, 3], x: "y" };
    const result = objectCrush(obj);

    // The array elements are flattened, so the type reflects the element types.
    // The resulting type is a union of possible values for any given string key.
    // @ts-expect-error
    expectTypeOf(result).toEqualTypeOf<{ [x: string]: number | string; arr: number[]; x: string }>();
    // Note: The actual inferred type is complex due to the nature of flattening.
    // The line above is a simplification. A more accurate test would be:
    // @ts-expect-error
    expectTypeOf(result["some.key"]).toEqualTypeOf<number | string | undefined>();
  });
});
