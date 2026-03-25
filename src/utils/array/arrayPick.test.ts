import { describe, it, expect, expectTypeOf } from "vitest";
import { arrayPick } from "./arrayPick";

describe("arrayPick", () => {
  it("should return an empty array if initialList is not an array", () => {
    expect(arrayPick(null as any, () => true)).toEqual([]);
    expect(arrayPick(undefined as any, () => true)).toEqual([]);
  });

  it("should return a copy of the initial list if the filter is not a function", () => {
    const initial = [1, 2, 3];
    // @ts-expect-error: Testing invalid argument
    expect(arrayPick(initial, null)).toEqual(initial);
    // @ts-expect-error: Testing invalid argument
    expect(arrayPick(initial, "not-a-function")).toEqual(initial);
  });

  it("should filter an array without a mapper function", () => {
    const list = [1, 2, 3, 4, 5, 6];
    const result = arrayPick(list, (n) => n % 2 === 0);
    expect(result).toEqual([2, 4, 6]);
  });

  it("should filter and map an array with a mapper function", () => {
    const list = [1, 2, 3, 4, 5, 6];
    const result = arrayPick(list, (n) => n % 2 === 0, (n) => n * 2);
    expect(result).toEqual([4, 8, 12]);
  });

  it("should pass the index to both filter and mapper functions", () => {
    const list = ["a", "b", "c", "d"];
    const result = arrayPick(
      list,
      (_, index) => index % 2 === 0, // Filter even indices
      (item, index) => `${item}_${index}`, // Map to "item_index"
    );
    // Indices 0 ('a') and 2 ('c') are even
    expect(result).toEqual(["a_0", "c_2"]);
  });

  it("should return an empty array if no items pass the filter", () => {
    const list = [1, 2, 3];
    const result = arrayPick(list, () => false);
    expect(result).toEqual([]);
  });

  it("should work with complex objects and transformations", () => {
    const users = [
      { name: "Alice", active: true },
      { name: "Bob", active: false },
      { name: "Charlie", active: true },
    ];

    // Only get names of active users
    const activeUserNames = arrayPick(
      users,
      (user) => user.active,
      (user) => user.name,
    );

    expect(activeUserNames).toEqual(["Alice", "Charlie"]);
  });

  it("should handle an empty initial array", () => {
    const result1 = arrayPick([], (n) => n > 0);
    expect(result1).toEqual([]);

    const result2 = arrayPick([], (n) => n > 0, (n) => n * 2);
    expect(result2).toEqual([]);
  });

  it("should infer literal types correctly with const generic", () => {
    // Example with const assertion
    const input = [1, 2, 3, 4] as const; // Type is readonly [1, 2, 3, 4]
    const result = arrayPick(input, (n) => n % 2 === 0); // Should infer as (1|2|3|4)[]
    expectTypeOf(result).toEqualTypeOf<(1 | 2 | 3 | 4)[]>();
  });
});
