import { describe, it, expect } from "vitest";
import { arrayReplace } from "./arrayReplace";

describe("arrayReplace", () => {
  it("should return an empty array if initialList is not an array or is empty", () => {
    expect(arrayReplace(null as any, "new", () => true)).toEqual([]);
    expect(arrayReplace(undefined as any, "new", () => true)).toEqual([]);
    expect(arrayReplace([], "new", () => true)).toEqual([]);
  });

  it("should return a copy of initialList if match is not a function", () => {
    const initial = [1, 2, 3];
    expect(arrayReplace(initial, undefined as any, () => true)).toEqual([undefined, 2, 3]);
    // @ts-expect-error: Testing invalid argument
    expect(arrayReplace(initial, "new", null)).toEqual(initial);
    // @ts-expect-error: Testing invalid argument
    expect(arrayReplace(initial, "new", "not-a-function")).toEqual(initial);
  });

  it("should replace the first matching item", () => {
    const result = arrayReplace([1, 2, 3, 2, 4], 99, (n) => n === 2);
    expect(result).toEqual([1, 99, 3, 2, 4]);
  });

  it("should return a copy of the original array if no item matches", () => {
    const initial = [1, 2, 3];
    const result = arrayReplace(initial, 99, (n) => n === 5);
    expect(result).toEqual(initial);
    expect(result).not.toBe(initial); // Should be a new array
  });

  it("should pass the index to the match function", () => {
    const result = arrayReplace(["a", "b", "c"], "x", (_, index) => index === 1);
    expect(result).toEqual(["a", "x", "c"]);
  });

  it("should replace an item that is explicitly undefined", () => {
    const initial = [1, undefined, 3];
    const result = arrayReplace(initial, "new", (v) => v === undefined);
    expect(result).toEqual([1, "new", 3]);
  });

  it("should replace an object item if it matches", () => {
    const initial = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const newItem = { id: 2, updated: true };
    const result = arrayReplace(initial, newItem, (item) => item.id === 2);

    expect(result).toEqual([
      { id: 1 },
      { id: 2, updated: true },
      { id: 3 },
    ]);
  });

  it("should replace with a different type, resulting in a union type array", () => {
    const initial: (number | string)[] = [1, "two", 3];
    const result = arrayReplace(initial, true, (v) => v === "two");
    // The result should be (string | number | boolean)[]
    expect(result).toEqual([1, true, 3]);
  });

  it("should correctly handle replacement with null", () => {
    const initial = [1, 2, 3];
    const result = arrayReplace(initial, null, (v) => v === 2);
    expect(result).toEqual([1, null, 3]);
  });

  it("should correctly handle replacement with undefined", () => {
    const initial = [1, 2, 3];
    const result = arrayReplace(initial, undefined, (v) => v === 2);
    expect(result).toEqual([1, undefined, 3]);
  });
});
