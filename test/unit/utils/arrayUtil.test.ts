import { describe, expect, it } from "vitest";
import { ArrayUtil } from "@pawover/kit/utils";

describe("ArrayUtil", () => {
  describe("cast", () => {
    it("should wrap a single value in an array", () => {
      expect(ArrayUtil.cast(1)).toEqual([1]);
    });

    it("should return the same array when given an array", () => {
      expect(ArrayUtil.cast([1, 2])).toEqual([1, 2]);
    });

    it("should return empty array for null when checkNullish is true", () => {
      expect(ArrayUtil.cast(null)).toEqual([]);
    });

    it("should return empty array for undefined when checkNullish is true", () => {
      expect(ArrayUtil.cast(undefined)).toEqual([]);
    });

    it("should return [null] for null when checkNullish is false", () => {
      expect(ArrayUtil.cast(null, false)).toEqual([null]);
    });

    it("should not mutate the original array", () => {
      const original = [1, 2, 3];
      const result = ArrayUtil.cast(original);
      expect(result).toEqual([1, 2, 3]);
      expect(result).not.toBe(original);
    });
  });

  describe("first", () => {
    it("should return the first element of a non-empty array", () => {
      expect(ArrayUtil.first([1, 2, 3])).toBe(1);
    });

    it("should return undefined for an empty array", () => {
      expect(ArrayUtil.first([])).toBeUndefined();
    });

    it("should return the fallback value for an empty array", () => {
      expect(ArrayUtil.first([], 0)).toBe(0);
    });

    it("should return undefined for non-array input", () => {
      expect(ArrayUtil.first(null as unknown as number[])).toBeUndefined();
    });
  });

  describe("last", () => {
    it("should return the last element of a non-empty array", () => {
      expect(ArrayUtil.last([1, 2, 3])).toBe(3);
    });

    it("should return undefined for an empty array", () => {
      expect(ArrayUtil.last([])).toBeUndefined();
    });

    it("should return the fallback value for an empty array", () => {
      expect(ArrayUtil.last([], 0)).toBe(0);
    });

    it("should return undefined for non-array input", () => {
      expect(ArrayUtil.last(null as unknown as number[])).toBeUndefined();
    });
  });

  describe("compete", () => {
    it("should find the maximum element", () => {
      expect(ArrayUtil.compete([1, 10, 5], (a, b) => (a > b ? a : b))).toBe(10);
    });

    it("should find the minimum element", () => {
      expect(ArrayUtil.compete([1, 10, 5], (a, b) => (a < b ? a : b))).toBe(1);
    });

    it("should return null for an empty array", () => {
      expect(ArrayUtil.compete([], (a, b) => a)).toBeNull();
    });

    it("should return null for non-array input", () => {
      expect(ArrayUtil.compete(null as unknown as number[], (a, b) => a)).toBeNull();
    });

    it("should return null for non-function match", () => {
      expect(ArrayUtil.compete([1, 2], null as unknown as (a: number, b: number) => number)).toBeNull();
    });
  });

  describe("count", () => {
    it("should count occurrences of each element", () => {
      expect(ArrayUtil.count(["a", "b", "a", "c"], (x) => x)).toEqual({ a: 2, b: 1, c: 1 });
    });

    it("should return an empty object for an empty array", () => {
      expect(ArrayUtil.count([], (x) => x)).toEqual({});
    });

    it("should return empty object for non-array input", () => {
      expect(ArrayUtil.count(null as unknown as string[], (x) => x)).toEqual({});
    });

    it("should return empty object for non-function match", () => {
      expect(ArrayUtil.count(["a"], null as unknown as (x: string) => string)).toEqual({});
    });
  });

  describe("difference", () => {
    it("should return elements present in initialList but not in diffList", () => {
      expect(ArrayUtil.difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
    });

    it("should return all elements when diffList is empty", () => {
      expect(ArrayUtil.difference([1, 2], [])).toEqual([1, 2]);
    });

    it("should use match function for object comparison", () => {
      const initial = [{ id: 1 }, { id: 2 }];
      const diff = [{ id: 2 }];
      expect(ArrayUtil.difference(initial, diff, (x) => x.id)).toEqual([{ id: 1 }]);
    });

    it("should return empty array for non-array initialList", () => {
      expect(ArrayUtil.difference(null as unknown as number[], [1, 2])).toEqual([]);
    });

    it("should return empty array when both non-array", () => {
      expect(ArrayUtil.difference(null as unknown as number[], null as unknown as number[])).toEqual([]);
    });
  });

  describe("intersection", () => {
    it("should return elements present in both arrays", () => {
      expect(ArrayUtil.intersection([1, 2], [2, 3])).toEqual([2]);
    });

    it("should work with match function", () => {
      const initial = [{ id: 1 }, { id: 2 }];
      const diff = [{ id: 2 }];
      expect(ArrayUtil.intersection(initial, diff, (x) => x.id)).toEqual([{ id: 2 }]);
    });

    it("should return empty array when no intersection", () => {
      expect(ArrayUtil.intersection([1], [2])).toEqual([]);
    });

    it("should return empty array for non-array initialList", () => {
      expect(ArrayUtil.intersection(null as unknown as number[], [1])).toEqual([]);
    });

    it("should return empty array when either array is empty", () => {
      expect(ArrayUtil.intersection([], [1, 2])).toEqual([]);
      expect(ArrayUtil.intersection([1, 2], [])).toEqual([]);
    });
  });

  describe("merge", () => {
    it("should merge and deduplicate two arrays", () => {
      expect(ArrayUtil.merge([1, 2], [2, 3])).toEqual([1, 2, 3]);
    });

    it("should update matched items when match function is provided", () => {
      const source = [{ id: 1, val: "a" }, { id: 2, val: "b" }];
      const update = [{ id: 2, val: "new" }];
      expect(ArrayUtil.merge(source, update, (x) => x.id)).toEqual([{ id: 1, val: "a" }, { id: 2, val: "new" }]);
    });

    it("should return empty array for non-array initialList", () => {
      expect(ArrayUtil.merge(null as unknown as number[], [1])).toEqual([]);
    });

    it("should return initialList copy for non-array mergeList", () => {
      expect(ArrayUtil.merge([1], null as unknown as number[])).toEqual([1]);
    });

    it("should return mergeList items when initialList is empty", () => {
      expect(ArrayUtil.merge([], [1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe("pick", () => {
    it("should filter elements", () => {
      expect(ArrayUtil.pick([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([2, 4]);
    });

    it("should filter and map elements", () => {
      expect(ArrayUtil.pick([1, 2, 3, 4], (n) => n % 2 === 0, (n) => n * 2)).toEqual([4, 8]);
    });

    it("should return empty array for invalid input", () => {
      expect(ArrayUtil.pick(null as unknown as number[], (n) => n > 0)).toEqual([]);
    });

    it("should return array copy for non-function filter", () => {
      expect(ArrayUtil.pick([1, 2], null as unknown as (n: number) => boolean)).toEqual([1, 2]);
    });

    it("should return empty array when no items match filter", () => {
      expect(ArrayUtil.pick([1, 3], (n) => n > 10)).toEqual([]);
    });
  });

  describe("replace", () => {
    it("should replace the first matching element", () => {
      expect(ArrayUtil.replace([1, 2, 3], 4, (n) => n === 2)).toEqual([1, 4, 3]);
    });

    it("should return a copy of the array if no match is found", () => {
      expect(ArrayUtil.replace([1, 2, 3], 4, (n) => n > 10)).toEqual([1, 2, 3]);
    });

    it("should return empty array for non-array input", () => {
      expect(ArrayUtil.replace(null as unknown as number[], 4, (n) => n === 2)).toEqual([]);
    });

    it("should return empty array for empty array", () => {
      expect(ArrayUtil.replace([] as number[], 4, (n) => n === 2)).toEqual([]);
    });

    it("should return array copy for non-function match", () => {
      expect(ArrayUtil.replace([1, 2], 3, null as unknown as (n: number) => boolean)).toEqual([1, 2]);
    });
  });

  describe("replaceMove", () => {
    it("should replace and move to start", () => {
      expect(ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, "start")).toEqual([5, 1, 3, 4]);
    });

    it("should replace and move to end by default", () => {
      expect(ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2)).toEqual([1, 3, 4, 5]);
    });

    it("should replace and insert at specific index", () => {
      expect(ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, 2)).toEqual([1, 3, 5, 4]);
    });

    it("should insert newItem at end for empty array", () => {
      expect(ArrayUtil.replaceMove([], 1, () => true)).toEqual([1]);
    });

    it("should insert newItem at position 0", () => {
      expect(ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, 0)).toEqual([5, 1, 3, 4]);
    });

    it("should clamp position to array length", () => {
      expect(ArrayUtil.replaceMove([1, 2], 3, (n) => n === 1, 100)).toEqual([2, 3]);
    });

    it("should return empty array for non-array input", () => {
      expect(ArrayUtil.replaceMove(null as unknown as number[], 1, () => true)).toEqual([]);
    });

    it("should return array copy for non-function match", () => {
      expect(ArrayUtil.replaceMove([1], 2, null as unknown as (n: number) => boolean)).toEqual([1]);
    });

    it("should append newItem when match not found and no position", () => {
      expect(ArrayUtil.replaceMove([1, 2] as number[], 3, (n) => n === 99)).toEqual([1, 2, 3]);
    });
  });

  describe("split", () => {
    it("should split array into chunks of specified size", () => {
      expect(ArrayUtil.split([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it("should return empty array for invalid input", () => {
      expect(ArrayUtil.split(null as unknown as number[], 2)).toEqual([]);
    });

    it("should return empty array for non-positive size", () => {
      expect(ArrayUtil.split([1], 0)).toEqual([]);
    });

    it("should split into single elements when size is 1", () => {
      expect(ArrayUtil.split([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    });

    it("should return whole array as single chunk when size exceeds length", () => {
      expect(ArrayUtil.split([1, 2], 10)).toEqual([[1, 2]]);
    });

    it("should use default size of 10", () => {
      const arr = Array.from({ length: 25 }, (_, i) => i);
      const result = ArrayUtil.split(arr);
      expect(result).toHaveLength(3);
      expect(result[0]).toHaveLength(10);
      expect(result[1]).toHaveLength(10);
      expect(result[2]).toHaveLength(5);
    });
  });

  describe("fork", () => {
    it("should partition array based on condition", () => {
      expect(ArrayUtil.fork([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([[2, 4], [1, 3]]);
    });

    it("should return two empty arrays for non-array input", () => {
      expect(ArrayUtil.fork(null as unknown as number[], (n) => n > 0)).toEqual([[], []]);
    });

    it("should handle all items matching", () => {
      expect(ArrayUtil.fork([1, 2, 3], (n) => true)).toEqual([[1, 2, 3], []]);
    });

    it("should handle no items matching", () => {
      expect(ArrayUtil.fork([1, 2, 3], (n) => false)).toEqual([[], [1, 2, 3]]);
    });

    it("should handle empty array", () => {
      expect(ArrayUtil.fork([], (n) => true)).toEqual([[], []]);
    });
  });

  describe("zip / unzip", () => {
    it("should zip two arrays together", () => {
      expect(ArrayUtil.zip([1, 2], ["a", "b"])).toEqual([[1, "a"], [2, "b"]]);
    });

    it("should roundtrip through unzip", () => {
      const zipped = ArrayUtil.zip([1, 2], ["a", "b"]);
      expect(ArrayUtil.unzip(zipped)).toEqual([[1, 2], ["a", "b"]]);
    });

    it("should zip three arrays together", () => {
      expect(ArrayUtil.zip([1, 2], ["a", "b"], [true, false])).toEqual([[1, "a", true], [2, "b", false]]);
    });

    it("should return empty array for no arguments", () => {
      expect(ArrayUtil.zip()).toEqual([]);
    });

    it("should handle arrays of different lengths", () => {
      expect(ArrayUtil.zip([1, 2, 3], ["a"])).toEqual([[1, "a"], [2, undefined], [3, undefined]]);
    });

    it("should return empty array for empty input in unzip", () => {
      expect(ArrayUtil.unzip([])).toEqual([]);
    });

    it("should handle non-rectangular arrays in unzip", () => {
      expect(ArrayUtil.unzip([[1, 2], [3]])).toEqual([[1, 3], [2, undefined]]);
    });
  });

  describe("zipToObject", () => {
    it("should create object from keys and value array", () => {
      expect(ArrayUtil.zipToObject(["a", "b"], [1, 2])).toEqual({ a: 1, b: 2 });
    });

    it("should create object from keys and static value", () => {
      expect(ArrayUtil.zipToObject(["a", "b"], 1)).toEqual({ a: 1, b: 1 });
    });

    it("should create object from keys and value function", () => {
      expect(ArrayUtil.zipToObject(["a", "b"], (k, i) => `${k}${i}`)).toEqual({ a: "a0", b: "b1" });
    });

    it("should return empty object for empty keys", () => {
      expect(ArrayUtil.zipToObject([], [1, 2])).toEqual({});
    });

    it("should return empty object for non-array keys", () => {
      expect(ArrayUtil.zipToObject(null as unknown as string[], [1])).toEqual({});
    });
  });
});
