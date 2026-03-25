import { describe, it, expect } from "vitest";
import { arrayUnzip, arrayZip } from "./arrayZip";

describe("arrayZip", () => {
  it("should return an empty array when called without arguments", () => {
    expect(arrayZip()).toEqual([]);
  });

  it("should zip two arrays of the same length", () => {
    const result = arrayZip([1, 2], ["a", "b"]);
    expect(result).toEqual([[1, "a"], [2, "b"]]);
  });

  it("should zip multiple arrays of the same length", () => {
    const result = arrayZip([1, 2], ["a", "b"], [true, false]);
    expect(result).toEqual([[1, "a", true], [2, "b", false]]);
  });

  it("should zip arrays of different lengths, padding with undefined for shorter ones", () => {
    const result = arrayZip([1, 2, 3], ["a", "b"]);
    expect(result).toEqual([[1, "a"], [2, "b"], [3, undefined]]);
  });

  it("should zip an empty array with another array", () => {
    const result = arrayZip([], ["a", "b"]);
    expect(result).toEqual([[undefined, "a"], [undefined, "b"]]);
  });

  it("should correctly handle arrays with mixed types using overloads", () => {
    const nums = [1, 2];
    const strs = ["a", "b"];
    const bools = [true, false];
    const objs = [{ id: 1 }, { id: 2 }];
    const mixed = [null, 0];

    // Test 2-arg overload
    const result2: [number, string][] = arrayZip(nums, strs);
    expect(result2).toEqual([[1, "a"], [2, "b"]]);

    // Test 3-arg overload
    const result3: [number, string, boolean][] = arrayZip(nums, strs, bools);
    expect(result3).toEqual([[1, "a", true], [2, "b", false]]);

    // Test 5-arg overload
    const result5: [number, string, boolean, { id: number }, null | number][] = arrayZip(nums, strs, bools, objs, mixed);
    expect(result5).toEqual([
      [1, "a", true, { id: 1 }, null],
      [2, "b", false, { id: 2 }, 0],
    ]);
  });

  it("should work with the general implementation signature for many arrays", () => {
    const arr1 = [1, 2];
    const arr2 = ["a", "b"];
    const arr3 = [true, false];
    const arr4 = [{}, {}];
    // @ts-expect-error: Testing invalid argument
    const result = arrayZip(arr1, arr2, arr3, arr4, [5, 6], ["x", "y"]);

    // Result type is (number | string | boolean | {})[]
    expect(result).toEqual([[1, "a", true, {}, 5, "x"], [2, "b", false, {}, 6, "y"]]);
  });
});

describe("arrayUnzip", () => {
  it("should return an empty array if input is not an array or is empty", () => {
    expect(arrayUnzip(null as any)).toEqual([]);
    expect(arrayUnzip(undefined as any)).toEqual([]);
    expect(arrayUnzip([])).toEqual([]);
  });

  it("should unzip an array of pairs", () => {
    const result = arrayUnzip([[1, "a"], [2, "b"]]);
    expect(result).toEqual([[1, 2], ["a", "b"]]);
  });

  it("should unzip an array of tuples of different types", () => {
    const result = arrayUnzip([[1, "a", true], [2, "b", false]]);
    expect(result).toEqual([[1, 2], ["a", "b"], [true, false]]);
  });

  it("should handle input arrays of different lengths after zipping", () => {
    // This is the typical case after an uneven zip operation
    const zipped = [[1, "a"], [2, "b"], [3, undefined]];
    const result = arrayUnzip(zipped);
    expect(result).toEqual([[1, 2, 3], ["a", "b", undefined]]);
  });

  it("should unzip an array with a single inner array", () => {
    const result = arrayUnzip([["a", "b", "c"]]);
    expect(result).toEqual([["a"], ["b"], ["c"]]);
  });

  it("should unzip an array with empty inner arrays", () => {
    const result = arrayUnzip([[], []]);
    expect(result).toEqual([]);
  });
});
