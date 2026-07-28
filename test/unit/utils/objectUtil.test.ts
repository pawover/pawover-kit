import { describe, expect, it } from "vitest";
import { ObjectUtil } from "@pawover/kit/utils";

describe("ObjectUtil", () => {
  describe("keys", () => {
    it("should return keys of a plain object", () => {
      expect(ObjectUtil.keys({ a: 1, b: 2 })).toEqual(["a", "b"]);
    });
  });

  describe("values", () => {
    it("should return values of a plain object", () => {
      expect(ObjectUtil.values({ a: 1, b: 2 })).toEqual([1, 2]);
    });
  });

  describe("entries", () => {
    it("should return entries of a plain object", () => {
      expect(ObjectUtil.entries({ a: 1 })).toEqual([["a", 1]]);
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
  });

  describe("pick", () => {
    it("should pick specified keys", () => {
      expect(ObjectUtil.pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
    });

    it("should ignore non-existent keys", () => {
      expect(ObjectUtil.pick({ a: 1 }, ["b" as "a"])).toEqual({});
    });

    it("should return empty object for non-plain input", () => {
      expect(ObjectUtil.pick(null as unknown as Record<string, unknown>, ["a" as string])).toEqual({});
    });
  });

  describe("omit", () => {
    it("should omit specified keys", () => {
      expect(ObjectUtil.omit({ a: 1, b: 2, c: 3 }, ["a"])).toEqual({ b: 2, c: 3 });
    });

    it("should return empty object for non-plain input", () => {
      expect(ObjectUtil.omit(null as unknown as Record<string, unknown>, ["a"])).toEqual({});
    });
  });

  describe("invert", () => {
    it("should swap keys and values", () => {
      expect(ObjectUtil.invert({ a: "1", b: 2 })).toEqual({ "1": "a", 2: "b" });
    });

    it("should return empty object for non-plain input", () => {
      expect(ObjectUtil.invert(null as unknown as Record<string, string>)).toEqual({});
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
  });
});
