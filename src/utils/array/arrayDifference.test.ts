import { describe, it, expect } from "vitest";
import { arrayDifference } from "./arrayDifference";

describe("arrayDifference", () => {
  it("should return an empty array if initialList is not an array", () => {
    expect(arrayDifference(null as any, [1])).toEqual([]);
    expect(arrayDifference(undefined as any, [1])).toEqual([]);
  });

  it("should return an empty array if initialList is empty", () => {
    expect(arrayDifference([], [1, 2, 3])).toEqual([]);
  });

  it("should return a copy of initialList if diffList is empty or not an array", () => {
    const initial = [1, 2, 3];
    expect(arrayDifference(initial, [])).toEqual(initial);
    expect(arrayDifference(initial, null as any)).toEqual(initial);
    expect(arrayDifference(initial, undefined as any)).toEqual(initial);
  });

  it("should return the difference for primitive types without a match function", () => {
    expect(arrayDifference([1, 2, 3], [2, 3, 4])).toEqual([1]);
    expect(arrayDifference(["a", "b", "c"], ["b", "d"])).toEqual(["a", "c"]);
    expect(arrayDifference([1, 2, 2, 3], [2])).toEqual([1, 3]); // Result is de-duplicated
  });

  it("should return the difference for object types without a match function (by reference)", () => {
    const objA = { id: 1 };
    const objB = { id: 2 };
    const objC = { id: 3 };
    const objD = { id: 4 };

    // Objects are compared by reference
    expect(arrayDifference([objA, objB, objC], [objB, objD])).toEqual([objA, objC]);
  });

  it("should return the difference for object types with a match function (by value)", () => {
    const list1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const list2 = [{ id: 2 }, { id: 4 }];

    const result = arrayDifference(list1, list2, (x) => x.id);
    expect(result).toEqual([{ id: 1 }, { id: 3 }]);
  });

  it("should pass the index to the match function", () => {
    const initialList = [{ val: "a" }, { val: "b" }];
    const diffList = [{ val: "c" }, { val: "b" }]; // 'b' at index 1

    const result = arrayDifference(initialList, diffList, (item, index) => `${item.val}_${index}`);
    // 'a_0' vs ['c_0', 'b_1'] -> 'a_0' is not found, so { val: 'a' } is included
    // 'b_1' vs ['c_0', 'b_1'] -> 'b_1' is found, so { val: 'b' } is excluded
    expect(result).toEqual([{ val: "a" }]);
  });

  it("should handle duplicate items in initialList correctly, returning a de-duplicated result", () => {
    const initialList = [1, 2, 2, 3, 3, 3];
    const diffList = [2];

    const result = arrayDifference(initialList, diffList);
    // Expect [1, 3], duplicates removed from result
    expect(result).toEqual([1, 3]);
  });

  it("should handle duplicate items with a match function", () => {
    const initialList = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 1, name: "Alice-Clone" }, // Same ID, different name
    ];
    const diffList = [{ id: 3 }, { id: 2 }];

    const result = arrayDifference(initialList, diffList, (x) => x.id);
    // Items with id 1 remain, but result is de-duplicated based on the *first* occurrence's identity.
    // Since the two {id: 1} objects are different references, filter keeps both.
    // Then Set de-duplicates them based on *their own object identity*, which means both stay.
    // Actually, filter keeps [{ id: 1, name: 'Alice' }, { id: 1, name: 'Alice-Clone' }]
    // Then Set([...]) will see two distinct objects and keep both.
    // Let's adjust expectation: It filters out the one with id=2, keeping the two with id=1.
    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 1, name: "Alice-Clone" },
    ]);
  });

  it("should return an empty array when both lists are identical (with match function)", () => {
    const list1 = [{ id: 1 }, { id: 2 }];
    const list2 = [{ id: 1 }, { id: 2 }];
    const result = arrayDifference(list1, list2, (x) => x.id);
    expect(result).toEqual([]);
  });
});
