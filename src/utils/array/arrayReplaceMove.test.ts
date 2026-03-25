import { describe, it, expect } from "vitest";
import { arrayReplaceMove } from "./arrayReplaceMove";

describe("arrayReplaceMove", () => {
  it("should return an empty array if initialList is not an array", () => {
    expect(arrayReplaceMove(null as any, "new", () => true)).toEqual([]);
    expect(arrayReplaceMove(undefined as any, "new", () => true)).toEqual([]);
  });

  it("should return an array with newItem if initialList is empty", () => {
    expect(arrayReplaceMove([], "new", () => true)).toEqual(["new"]);
    expect(arrayReplaceMove([], 42, () => true, "start")).toEqual([42]);
  });

  it("should return a copy of initialList if match is not a function", () => {
    const initial = [1, 2, 3];
    // @ts-expect-error: Testing invalid argument
    expect(arrayReplaceMove(initial, "new", null)).toEqual(initial);
    // @ts-expect-error: Testing invalid argument
    expect(arrayReplaceMove(initial, "new", "not-a-function")).toEqual(initial);
  });

  it("should replace and move the matched item to the end by default", () => {
    const result = arrayReplaceMove([1, 2, 3, 4], 99, (n) => n === 2);
    expect(result).toEqual([1, 3, 4, 99]);
  });

  it("should replace and move the matched item to the start", () => {
    const result = arrayReplaceMove([1, 2, 3, 4], 99, (n) => n === 2, "start");
    expect(result).toEqual([99, 1, 3, 4]);
  });

  it("should replace and move the matched item to a specific index", () => {
    const result = arrayReplaceMove([1, 2, 3, 4], 99, (n) => n === 2, 1);
    expect(result).toEqual([1, 99, 3, 4]);

    // Test inserting at index 0 (same as 'start')
    const resultAtZero = arrayReplaceMove([1, 2, 3, 4], 99, (n) => n === 2, 0);
    expect(resultAtZero).toEqual([99, 1, 3, 4]);
  });

  it("should insert newItem at the end if no item matches", () => {
    // @ts-expect-error: Testing invalid argument

    const result = arrayReplaceMove([1, 2, 3, 4], 99, (n) => n === 5);
    expect(result).toEqual([1, 2, 3, 4, 99]);
  });

  it("should insert newItem at the start if no item matches and position is \"start\"", () => {
    // @ts-expect-error: Testing invalid argument

    const result = arrayReplaceMove([1, 2, 3, 4], 99, (n) => n === 5, "start");
    expect(result).toEqual([99, 1, 2, 3, 4]);
  });

  it("should insert newItem at a specific index if no item matches", () => {
    // @ts-expect-error: Testing invalid argument

    const result = arrayReplaceMove([1, 2, 3, 4], 99, (n) => n === 5, 2);
    expect(result).toEqual([1, 2, 99, 3, 4]);
  });

  it("should pass the index to the match function", () => {
    const result = arrayReplaceMove(["a", "b", "c"], "x", (_, index) => index === 1);
    expect(result).toEqual(["a", "c", "x"]);
  });

  it("should handle replacing an item with a different type", () => {
    const initial: (number | string)[] = [1, "two", 3];
    // @ts-expect-error: Testing invalid argument
    const result = arrayReplaceMove(initial, true, (v) => v === "two", "start");
    expect(result).toEqual([true, 1, 3]);
  });

  it("should correctly handle insertion with a non-positive integer position", () => {
    // Negative number should default to end
    // @ts-expect-error: Testing invalid argument
    const resultNeg = arrayReplaceMove([1, 2, 3], 99, (n) => n === 5, -1);
    expect(resultNeg).toEqual([1, 2, 3, 99]);

    // Fractional number should default to end
    // @ts-expect-error: Testing invalid argument
    const resultFloat = arrayReplaceMove([1, 2, 3], 99, (n) => n === 5, 1.5);
    expect(resultFloat).toEqual([1, 2, 3, 99]);
  });

  it("should correctly handle insertion with a position beyond array length", () => {
    // Inserting at a very high index should effectively be 'end'
    const result = arrayReplaceMove([1, 2, 3], 99, (n) => n === 2, 10);
    // First, 2 is removed: [1, 3]
    // Then 99 is inserted at Math.min(10, 2) which is 2: [1, 3, 99]
    expect(result).toEqual([1, 3, 99]);
  });

  it("should correctly handle replacement with null or undefined", () => {
    const resultWithNull = arrayReplaceMove([1, 2, 3], null, (n) => n === 2, "start");
    expect(resultWithNull).toEqual([null, 1, 3]);

    const resultWithUndefined = arrayReplaceMove([1, 2, 3], undefined, (n) => n === 2, "start");
    expect(resultWithUndefined).toEqual([undefined, 1, 3]);
  });
});
