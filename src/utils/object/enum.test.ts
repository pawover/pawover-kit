import { describe, expect, it } from "vitest";
import { enumEntries } from "./enumEntries";
import { enumKeys } from "./enumKeys";
import { enumValues } from "./enumValues";

const StringEnum = {
  A: "a",
  B: "b",
} as const;

const NumberEnum = {
  One: 0,
  Two: 1,
  0: "One",
  1: "Two",
} as const;

describe("enumEntries", () => {
  it("应该处理字符串枚举", () => {
    expect(enumEntries(StringEnum)).toEqual([["A", "a"], ["B", "b"]]);
  });

  it("应该处理数字枚举 (双向映射)", () => {
    expect(enumEntries(NumberEnum)).toEqual([["One", 0], ["Two", 1]]);
  });

  it("非枚举应该报错", () => {
    expect(() => enumEntries({})).toThrow();
  });
});

describe("enumKeys", () => {
  it("应该返回键列表", () => {
    expect(enumKeys(StringEnum)).toEqual(["A", "B"]);
  });
});

describe("enumValues", () => {
  it("应该返回值列表", () => {
    expect(enumValues(StringEnum)).toEqual(["a", "b"]);
  });
});
