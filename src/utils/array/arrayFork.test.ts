import { describe, it, expect } from "vitest";
import { arrayFork } from "./arrayFork";

describe("arrayFork", () => {
  it("should return two empty arrays if the input is not an array", () => {
    const result = arrayFork(null as any, () => true);
    expect(result).toEqual([[], []]);

    const result2 = arrayFork(undefined as any, () => false);
    expect(result2).toEqual([[], []]);
  });

  it("should split an array based on a condition", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const [even, odd] = arrayFork(numbers, (n) => n % 2 === 0);

    expect(even).toEqual([2, 4, 6]);
    expect(odd).toEqual([1, 3, 5]);
  });

  it("should put all items in the first array if condition is always true", () => {
    const list = ["a", "b", "c"];
    const [allTrue, allFalse] = arrayFork(list, () => true);

    expect(allTrue).toEqual(["a", "b", "c"]);
    expect(allFalse).toEqual([]);
  });

  it("should put all items in the second array if condition is always false", () => {
    const list = ["a", "b", "c"];
    const [allTrue, allFalse] = arrayFork(list, () => false);

    expect(allTrue).toEqual([]);
    expect(allFalse).toEqual(["a", "b", "c"]);
  });

  it("should pass the index to the match function", () => {
    const list = ["a", "b", "c"];
    const [withEvenIndex, withOddIndex] = arrayFork(list, (_, index) => index % 2 === 0);

    expect(withEvenIndex).toEqual(["a", "c"]); // indices 0, 2
    expect(withOddIndex).toEqual(["b"]); // index 1
  });

  it("should handle objects and complex conditions", () => {
    const users = [
      { name: "Alice", active: true },
      { name: "Bob", active: false },
      { name: "Charlie", active: true },
    ];

    const [activeUsers, inactiveUsers] = arrayFork(users, (user) => user.active);

    expect(activeUsers).toEqual([
      { name: "Alice", active: true },
      { name: "Charlie", active: true },
    ]);
    expect(inactiveUsers).toEqual([
      { name: "Bob", active: false },
    ]);
  });

  it("should return two empty arrays for an empty input array", () => {
    const [arr1, arr2] = arrayFork([], () => true);
    expect(arr1).toEqual([]);
    expect(arr2).toEqual([]);
  });
});
