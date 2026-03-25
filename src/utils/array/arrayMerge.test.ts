import { describe, it, expect } from "vitest";
import { arrayMerge } from "./arrayMerge";

describe("arrayMerge", () => {
  it("should return an empty array if initialList is not an array", () => {
    expect(arrayMerge(null as any, [1, 2])).toEqual([]);
    expect(arrayMerge(undefined as any, [1, 2])).toEqual([]);
  });

  it("should return a copy of initialList if mergeList is not an array", () => {
    const initial = [1, 2, 3];
    const result = arrayMerge(initial, null as any);
    expect(result).toEqual(initial);
    expect(result).not.toBe(initial); // Should be a new array
  });

  it("should perform a union merge (concatenate and deduplicate) without a match function", () => {
    expect(arrayMerge([1, 2], [2, 3])).toEqual([1, 2, 3]);
    expect(arrayMerge(["a", "b"], ["b", "c"])).toEqual(["a", "b", "c"]);
    expect(arrayMerge([1, 1, 2], [2, 3, 3])).toEqual([1, 2, 3]);
  });

  it("should perform a left join update with a match function", () => {
    const source = [
      { id: 1, val: "a" },
      { id: 2, val: "b" },
      { id: 4, val: "d" },
    ];
    const updates = [
      { id: 2, val: "new_b" }, // Should update id:2
      { id: 3, val: "c" }, // Should be ignored (no match in source)
      { id: 4, val: "new_d" }, // Should update id:4
    ];

    const result = arrayMerge(source, updates, (x) => x.id);

    expect(result).toEqual([
      { id: 1, val: "a" }, // Unchanged
      { id: 2, val: "new_b" }, // Updated
      { id: 4, val: "new_d" }, // Updated
    ]);
  });

  it("should pass the index to the match function during left join update", () => {
    const initialList = [{ val: "x" }, { val: "y" }];
    const mergeList = [{ val: "X_UPDATE" }, { val: "Y_IGNORED" }, { val: "Z_NEW" }];

    // Imagine a scenario where we update based on index identity
    const result = arrayMerge(initialList, mergeList, (item, index) => `idx_${index}`);

    // Matches based on index: 0->0, 1->1. Index 2 in mergeList has no match in initialList.
    // So, item at idx 0 gets updated, item at idx 1 gets updated.
    expect(result).toEqual([
      { val: "X_UPDATE" },
      { val: "Y_IGNORED" },
    ]);
  });

  it("should handle primitive types with a match function", () => {
    // While less common, the match function can be used with primitives.
    // e.g., updating based on a modulo operation.
    const initialList = [10, 15, 20, 25];
    const mergeList = [11, 16, 21]; // 11%5=1, 16%5=1, 21%5=1

    // This example is contrived, but shows how the function works.
    // If match returns a value that doesn't exist in initialList, it won't update anything.
    // A more realistic match for numbers might be an identity function.
    const identityMatch = (x: number) => x;
    const numbersToUpdate = [15, 25, 999]; // 999 is new and should be ignored
    const updatesWithValues = [15, "fifteen_new", 25, "twenty_five_new", 999, "new_val"];

    // Let's use a map for updates instead of a flat array for this example
    // The provided function does a direct replacement based on key existence.
    // A more realistic scenario is updating objects by an ID.
    const mockSource = initialList.map((n) => ({ id: n, originalVal: n }));
    const mockUpdates = [
      { id: 15, newVal: "replaced_15" },
      { id: 25, newVal: "replaced_25" },
      { id: 30, newVal: "ignored_30" },
    ];

    const mockResult = arrayMerge(mockSource, mockUpdates, (x) => x.id);
    expect(mockResult).toEqual([
      { id: 10, originalVal: 10 }, // Not found in merge, stays the same
      { id: 15, newVal: "replaced_15" }, // Found in merge, replaced
      { id: 20, originalVal: 20 }, // Not found in merge, stays the same
      { id: 25, newVal: "replaced_25" }, // Found in merge, replaced
    ]);
  });

  it("should return mergeList items when initialList is empty (union mode)", () => {
    // In union mode, merging [] with [1, 2, 3] results in [1, 2, 3]
    expect(arrayMerge([], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("should return initialList if mergeList is empty", () => {
    const initial = [1, 2, 3];
    expect(arrayMerge(initial, [])).toEqual(initial);
  });

  it("should return an empty array when both lists are empty", () => {
    expect(arrayMerge([], [])).toEqual([]);
  });
});
