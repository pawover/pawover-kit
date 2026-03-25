import { describe, it, expect } from "vitest";
import { arraySplit } from "./arraySplit";

describe("arraySplit", () => {
  it("should return an empty array if initialList is not an array", () => {
    expect(arraySplit(null as any, 2)).toEqual([]);
    expect(arraySplit(undefined as any, 2)).toEqual([]);
  });

  it("should split an array into chunks of specified size", () => {
    expect(arraySplit([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(arraySplit(["a", "b", "c", "d", "e", "f"], 3)).toEqual([["a", "b", "c"], ["d", "e", "f"]]);
  });

  it("should return an empty array if the initial list is empty", () => {
    expect(arraySplit([], 5)).toEqual([]);
  });

  it("should use the default size of 10 if size is not provided", () => {
    const longList = Array.from({ length: 25 }, (_, i) => i); // [0, 1, ..., 24]
    const result = arraySplit(longList);
    // Should create chunks of 10: [0..9], [10..19], [20..24]
    expect(result).toEqual([
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
    ]);
  });

  it("should handle a size larger than the array length", () => {
    expect(arraySplit([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  it("should handle a size of 1", () => {
    expect(arraySplit([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it("should return an empty array if size is 0", () => {
    expect(arraySplit([1, 2, 3], 0)).toEqual([]);
  });

  it("should return an empty array if size is negative", () => {
    expect(arraySplit([1, 2, 3], -1)).toEqual([]);
    expect(arraySplit([1, 2, 3], -5)).toEqual([]);
  });

  it("should return an empty array if size is not a positive integer", () => {
    expect(arraySplit([1, 2, 3], 1.5)).toEqual([]); // Fractional
    expect(arraySplit([1, 2, 3], NaN)).toEqual([]); // NaN
    expect(arraySplit([1, 2, 3], Infinity)).toEqual([]); // Infinity
  });

  it("should handle object arrays", () => {
    const objects = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const result = arraySplit(objects, 2);
    expect(result).toEqual([[{ id: 1 }, { id: 2 }], [{ id: 3 }, { id: 4 }]]);
  });
});
