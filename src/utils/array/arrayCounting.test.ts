import { describe, it, expect } from "vitest";
import { arrayCounting } from "./arrayCounting";

describe("arrayCounting", () => {
  it("should return an empty object if the list is not an array", () => {
    expect(arrayCounting(null as any, () => "")).toEqual({});
    expect(arrayCounting(undefined as any, () => "")).toEqual({});
    expect(arrayCounting("not-an-array" as any, () => "")).toEqual({});
  });

  it("should return an empty object if the match function is not a function", () => {
    expect(arrayCounting([1], null as any)).toEqual({});
    expect(arrayCounting([1], undefined as any)).toEqual({});
    expect(arrayCounting([1], "not-a-function" as any)).toEqual({});
  });

  it("should count occurrences based on string identity", () => {
    const list = ["a", "b", "a", "c", "a"];
    const result = arrayCounting(list, (x) => x);
    expect(result).toEqual({ a: 3, b: 1, c: 1 });
  });

  it("should count occurrences based on a property of objects", () => {
    const users = [
      { id: 1, group: "A" },
      { id: 2, group: "B" },
      { id: 3, group: "A" },
      { id: 4, group: "C" },
      { id: 5, group: "B" },
    ];
    const result = arrayCounting(users, (u) => u.group);
    expect(result).toEqual({ A: 2, B: 2, C: 1 });
  });

  it("should work with numeric keys returned by the match function", () => {
    const numbers = [1, 2, 3, 1, 2, 1];
    const result = arrayCounting(numbers, (num) => num);
    // Keys are converted to strings by .toString()
    expect(result).toEqual({ "1": 3, "2": 2, "3": 1 });
  });

  it("should pass the index to the match function", () => {
    const list = ["a", "b", "c"];
    const result = arrayCounting(list, (item, index) => `key_${index}`);
    expect(result).toEqual({ key_0: 1, key_1: 1, key_2: 1 });
  });

  it("should handle falsy values returned by the match function", () => {
    const list = ["a", "b", "c"];
    // @ts-ignore: Testing edge case where match returns 0, which is a valid PropertyKey
    const result = arrayCounting(list, (item, index) => index > 1 ? 0 : item);
    expect(result).toEqual({ a: 1, b: 1, "0": 1 });
  });

  it("should return an empty object for an empty array", () => {
    const result = arrayCounting([], (x) => x);
    expect(result).toEqual({});
  });
});
