import { describe, expect, it } from "vitest";
import { ObjectUtil } from "@pawover/kit/utils";

describe("ObjectUtil", () => {
  describe("keys", () => {
    it("should return keys of a plain object", () => {
      expect(ObjectUtil.keys({ a: 1, b: 2 })).toEqual(["a", "b"]);
    });

    it("should return indices for a string", () => {
      expect(ObjectUtil.keys("abc")).toEqual(["0", "1", "2"]);
    });

    it("should return indices for an array", () => {
      expect(ObjectUtil.keys([10, 20])).toEqual(["0", "1"]);
    });

    it("should return empty array for empty object", () => {
      expect(ObjectUtil.keys({})).toEqual([]);
    });
  });

  describe("values", () => {
    it("should return values of a plain object", () => {
      expect(ObjectUtil.values({ a: 1, b: 2 })).toEqual([1, 2]);
    });

    it("should return characters for a string", () => {
      expect(ObjectUtil.values("abc")).toEqual(["a", "b", "c"]);
    });

    it("should return elements for an array", () => {
      expect(ObjectUtil.values([10, 20])).toEqual([10, 20]);
    });

    it("should return empty array for empty object", () => {
      expect(ObjectUtil.values({})).toEqual([]);
    });
  });

  describe("entries", () => {
    it("should return entries of a plain object", () => {
      expect(ObjectUtil.entries({ a: 1 })).toEqual([["a", 1]]);
    });

    it("should return entries for a string", () => {
      expect(ObjectUtil.entries("ab")).toEqual([["0", "a"], ["1", "b"]]);
    });

    it("should return entries for an array", () => {
      expect(ObjectUtil.entries([10, 20] as const)).toEqual([["0", 10], ["1", 20]]);
    });

    it("should return empty array for empty object", () => {
      expect(ObjectUtil.entries({})).toEqual([]);
    });
  });

  describe("entriesMap", () => {
    it("should map entries to a new object", () => {
      const result = ObjectUtil.entriesMap({ a: 1, b: 2 }, (k, v) => [k, v * 2]);
      expect(result).toEqual({ a: 2, b: 4 });
    });

    it("should return empty object for non-plain input", () => {
      expect(ObjectUtil.entriesMap(null as unknown as Record<string, number>, (k, v) => [k, v])).toEqual({});
    });

    it("should rename keys", () => {
      const result = ObjectUtil.entriesMap({ a: 1, b: 2 }, (k, v) => [`prefix_${String(k)}`, `${v}x`]);
      expect(result).toEqual({ prefix_a: "1x", prefix_b: "2x" });
    });

    it("should return empty object for array input", () => {
      expect(ObjectUtil.entriesMap([] as unknown as Record<string, never>, (k, v) => [k, v])).toEqual({});
    });
  });

  describe("pick", () => {
    it("should pick specified keys", () => {
      expect(ObjectUtil.pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
    });

    it("should ignore non-existent keys", () => {
      expect(ObjectUtil.pick({ a: 1 }, ["b" as "a"])).toEqual({});
    });

    it("should return empty object for non-plain input", () => {
      expect(ObjectUtil.pick(null as any, ["a"])).toEqual({});
    });

    it("should return empty object for empty keys", () => {
      expect(ObjectUtil.pick({ a: 1 }, [] as "a"[])).toEqual({});
    });

    it("should return original object for non-array keys", () => {
      const obj = { a: 1 };
      expect(ObjectUtil.pick(obj, null as any)).toEqual(obj);
    });
  });

  describe("omit", () => {
    it("should omit specified keys", () => {
      expect(ObjectUtil.omit({ a: 1, b: 2, c: 3 }, ["a"])).toEqual({ b: 2, c: 3 });
    });

    it("should return empty object for non-plain input", () => {
      expect(ObjectUtil.omit(null as any, ["a"])).toEqual({});
    });

    it("should return shallow copy when omitting non-existent keys", () => {
      expect(ObjectUtil.omit({ a: 1 }, ["b" as "a"])).toEqual({ a: 1 });
    });

    it("should return empty object when omitting all keys", () => {
      expect(ObjectUtil.omit({ a: 1, b: 2 }, ["a", "b"])).toEqual({});
    });

    it("should return empty object for empty keys", () => {
      expect(ObjectUtil.omit({ a: 1 }, [])).toEqual({ a: 1 });
    });
  });

  describe("invert", () => {
    it("should swap keys and values", () => {
      expect(ObjectUtil.invert({ a: "1", b: 2 })).toEqual({ "1": "a", 2: "b" });
    });

    it("should return empty object for non-plain input", () => {
      expect(ObjectUtil.invert(null as unknown as Record<string, string>)).toEqual({});
    });

    it("should handle Symbol values as inverted keys", () => {
      const sym = Symbol("s");
      const result = ObjectUtil.invert({ x: sym });
      const symbols = Object.getOwnPropertySymbols(result);
      expect(symbols).toHaveLength(1);
      expect(symbols[0]).toBe(sym);
      expect((result as Record<symbol, string>)[sym]).toBe("x");
    });

    it("should skip non-string/number/symbol values", () => {
      const result = ObjectUtil.invert({ a: true } as unknown as Record<string, PropertyKey>);
      expect(result).toEqual({});
    });

    it("should handle duplicate values by overwriting", () => {
      const result = ObjectUtil.invert({ a: "1", b: "1" });
      expect(ObjectUtil.keys(result)).toEqual(["1"]);
    });
  });

  describe("crush", () => {
    it("should flatten nested objects", () => {
      expect(ObjectUtil.crush({ a: { b: 1 } })).toEqual({ "a.b": 1 });
    });

    it("should flatten arrays with indices", () => {
      const result = ObjectUtil.crush({ list: [{ id: 1 }] });
      expect(result).toEqual({ "list.0.id": 1 });
    });

    it("should return empty object for null", () => {
      expect(ObjectUtil.crush(null as unknown as object)).toEqual({});
    });

    it("should handle deeply nested objects", () => {
      const result = ObjectUtil.crush({ a: { b: { c: { d: 1 } } } });
      expect(result).toEqual({ "a.b.c.d": 1 });
    });

    it("should handle mixed arrays and objects", () => {
      const result = ObjectUtil.crush({ items: [{ name: "foo" }, { name: "bar" }] });
      expect(result).toEqual({ "items.0.name": "foo", "items.1.name": "bar" });
    });

    it("should handle empty nested objects", () => {
      const result = ObjectUtil.crush({ a: {} });
      expect(result).toEqual({});
    });

    it("should handle null values inside objects", () => {
      const result = ObjectUtil.crush({ a: null });
      expect(result).toEqual({ a: null });
    });
  });

  describe("enumKeys", () => {
    it("should return keys for a string enum", () => {
      enum StringEnum { A = "a", B = "b" }
      expect(ObjectUtil.enumKeys(StringEnum as unknown as Record<string, string>)).toEqual(["A", "B"]);
    });

    it("should return keys for a numeric enum", () => {
      enum NumberEnum { A, B }
      expect(ObjectUtil.enumKeys(NumberEnum as unknown as Record<string, string>)).toEqual(["A", "B"]);
    });

    it("should throw for non-enum input", () => {
      expect(() => ObjectUtil.enumKeys({})).toThrow("function [enumKeys] expected parameter to be a enum, and requires at least one member");
    });
  });

  describe("enumValues", () => {
    it("should return values for a string enum", () => {
      enum StringEnum { A = "a", B = "b" }
      expect(ObjectUtil.enumValues(StringEnum as unknown as Record<string, string>)).toEqual(["a", "b"]);
    });

    it("should return values for a numeric enum", () => {
      enum NumberEnum { A, B }
      expect(ObjectUtil.enumValues(NumberEnum as unknown as Record<string, string>)).toEqual([0, 1]);
    });

    it("should throw for non-enum input", () => {
      expect(() => ObjectUtil.enumValues({})).toThrow("function [enumValues] expected parameter to be a enum, and requires at least one member");
    });
  });

  describe("enumEntries", () => {
    it("should return entries for a string enum", () => {
      enum StringEnum { A = "a", B = "b" }
      expect(ObjectUtil.enumEntries(StringEnum as unknown as Record<string, string>)).toEqual([["A", "a"], ["B", "b"]]);
    });

    it("should return entries for a numeric enum", () => {
      enum NumberEnum { A, B }
      expect(ObjectUtil.enumEntries(NumberEnum as unknown as Record<string, string>)).toEqual([["A", 0], ["B", 1]]);
    });

    it("should throw for non-enum input", () => {
      expect(() => ObjectUtil.enumEntries({})).toThrow("function [enumEntries] expected parameter to be a enum, and requires at least one member");
    });
  });
});
