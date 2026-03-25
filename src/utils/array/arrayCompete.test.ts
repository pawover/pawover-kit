import { describe, it, expect } from "vitest";
import { arrayCompete } from "./arrayCompete";

describe("arrayCompete", () => {
  it("should return null if the list is not an array", () => {
    expect(arrayCompete(null as any, () => 0)).toBeNull();
    expect(arrayCompete(undefined as any, () => 0)).toBeNull();
    expect(arrayCompete("not-an-array" as any, () => 0)).toBeNull();
  });

  it("should return null if the list is empty", () => {
    expect(arrayCompete([], () => 0)).toBeNull();
  });

  it("should return null if the match function is not a function", () => {
    expect(arrayCompete([1], null as any)).toBeNull();
    expect(arrayCompete([1], undefined as any)).toBeNull();
    expect(arrayCompete([1], "not-a-function" as any)).toBeNull();
  });

  it("should return the only element if the list has one item", () => {
    expect(arrayCompete([42], (a, b) => a > b ? a : b)).toBe(42);
  });

  it("should find the maximum value using a comparison function", () => {
    const list = [1, 10, 5];
    const result = arrayCompete(list, (a, b) => (a > b ? a : b));
    expect(result).toBe(10);
  });

  it("should find the minimum value using a comparison function", () => {
    const list = [1, 10, 5];
    const result = arrayCompete(list, (a, b) => (a < b ? a : b));
    expect(result).toBe(1);
  });

  it("should work with complex objects and custom comparison logic", () => {
    const people = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ];

    const oldestPerson = arrayCompete(people, (a, b) => (a.age > b.age ? a : b));
    expect(oldestPerson).toEqual({ name: "Charlie", age: 35 });

    const youngestPerson = arrayCompete(people, (a, b) => (a.age < b.age ? a : b));
    expect(youngestPerson).toEqual({ name: "Bob", age: 25 });
  });

  it("should pass the index to the match function", () => {
    const list = [10, 20, 30];
    let capturedIndex = -1;

    arrayCompete(list, (a, b, index) => {
      capturedIndex = index;

      return a > b ? a : b;
    });

    // The last call to match will have index = 2 (the index of the last element processed)
    // For reduce on [10, 20, 30], calls are:
    // match(10, 20, 1) -> winner
    // match(winner, 30, 2) -> final_winner
    expect(capturedIndex).toBe(2);
  });
});
