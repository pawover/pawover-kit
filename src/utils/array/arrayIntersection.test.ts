import { describe, it, expect } from "vitest";
import { arrayIntersection } from "./arrayIntersection";

describe("arrayIntersection", () => {
  it("should return an empty array if either list is not an array", () => {
    expect(arrayIntersection(null as any, [1, 2])).toEqual([]);
    expect(arrayIntersection([1, 2], null as any)).toEqual([]);
    expect(arrayIntersection(undefined as any, [1, 2])).toEqual([]);
    expect(arrayIntersection([1, 2], undefined as any)).toEqual([]);
  });

  it("should return an empty array if either list is empty", () => {
    expect(arrayIntersection([], [1, 2])).toEqual([]);
    expect(arrayIntersection([1, 2], [])).toEqual([]);
    expect(arrayIntersection([], [])).toEqual([]);
  });

  it("should find the intersection for primitive types without a match function", () => {
    expect(arrayIntersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    expect(arrayIntersection(["a", "b", "c"], ["b", "d", "a"])).toEqual(["a", "b"]);
  });

  it("should find the intersection for object types without a match function (by reference)", () => {
    const objA = { id: 1 };
    const objB = { id: 2 };
    const objC = { id: 3 };
    const objD = { id: 4 };

    const list1 = [objA, objB, objC];
    const list2 = [objB, objD, objA];

    // Objects are compared by reference
    expect(arrayIntersection(list1, list2)).toEqual([objA, objB]);
  });

  it("should find the intersection for object types with a match function (by value)", () => {
    const list1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const list2 = [{ id: 2 }, { id: 4 }, { id: 1 }];

    const result = arrayIntersection(list1, list2, (x) => x.id);
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("should pass the index to the match function", () => {
    const initialList = [{ val: "a" }, { val: "b" }];
    const diffList = [{ val: "a" }, { val: "x" }, { val: "b" }]; // 'b' at index 2

    // Match based on value and index: e.g., 'a_0', 'b_1'
    const result = arrayIntersection(initialList, diffList, (item, index) => `${item.val}_${index}`);
    // 'a_0' exists in diffList, 'b_1' does not ('b' in diffList is at index 2 -> 'b_2')
    expect(result).toEqual([{ val: "a" }]);
  });

  it("should handle duplicates in initialList, keeping all matching instances", () => {
    const initialList = [1, 2, 2, 3, 2];
    const diffList = [2, 3, 4];

    const result = arrayIntersection(initialList, diffList);
    // All instances from initialList that exist in diffList: '2' and '3'
    expect(result).toEqual([2, 2, 3, 2]);
  });

  it("should handle duplicates with a match function", () => {
    const initialList = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 1, name: "Alice-Again" }, // Same ID
    ];
    const diffList = [
      { id: 1, other: "data" },
      { id: 3, other: "data" },
    ];

    const result = arrayIntersection(initialList, diffList, (x) => x.id);
    // Finds items in initialList with id=1, includes both
    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 1, name: "Alice-Again" },
    ]);
  });

  it("should return an empty array when there is no intersection", () => {
    expect(arrayIntersection([1, 2], [3, 4])).toEqual([]);
    expect(arrayIntersection(
      [{ id: 1 }],
      [{ id: 2 }],
      (x) => x.id,
    )).toEqual([]);
  });
});
