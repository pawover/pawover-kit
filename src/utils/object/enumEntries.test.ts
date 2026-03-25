import { describe, it, expect } from "vitest";
import { enumEntries } from "./enumEntries"; // Adjust path as needed

describe("enumEntries", () => {
  // --- 测试有效枚举 ---

  it("should return entries for a string enum", () => {
    enum StringEnum {
      FIRST = "first_value",
      SECOND = "second_value",
    }
    const entries = enumEntries(StringEnum);
    expect(entries).toEqual([
      ["FIRST", "first_value"],
      ["SECOND", "second_value"],
    ]);
  });

  it("should return entries for a numeric enum", () => {
    enum NumericEnum {
      UP = 0,
      DOWN = 10,
    }
    const entries = enumEntries(NumericEnum);
    // Object.entries(NumericEnum) is [["0", "UP"], ["10", "DOWN"], ["UP", 0], ["DOWN", 10]]
    // splice removes the first half, returning the original entries [["UP", 0], ["DOWN", 10]]
    expect(entries).toEqual([
      ["UP", 0],
      ["DOWN", 10],
    ]);
  });

  it("should return entries for an enum with computed values", () => {
    enum ComputedEnum {
      A = 1,
      B = A * 2,
      C = B + 5,
    }
    const entries = enumEntries(ComputedEnum);
    // Object.entries(ComputedEnum) is [["1", "A"], ["2", "B"], ["7", "C"], ["A", 1], ["B", 2], ["C", 7]]
    // splice removes the first half, returning [["A", 1], ["B", 2], ["C", 7]]
    expect(entries).toEqual([
      ["A", 1],
      ["B", 2],
      ["C", 7],
    ]);
  });

  it("should handle an enum with a single member (numeric)", () => {
    enum SingleMemberNumEnum {
      ONLY = 42,
    }
    const entries = enumEntries(SingleMemberNumEnum);
    expect(entries).toEqual([["ONLY", 42]]);
  });

  it("should handle an enum with a single member (string)", () => {
    enum SingleMemberStrEnum {
      ONLY = "only_value",
    }
    const entries = enumEntries(SingleMemberStrEnum);
    expect(entries).toEqual([["ONLY", "only_value"]]);
  });

  // --- 测试错误处理 ---

  it("should throw an error for an empty object", () => {
    const emptyObj = {};
    expect(() => enumEntries(emptyObj)).toThrow(
      "function enumEntries expected parameter is a enum, and requires at least one member",
    );
  });

  it("should throw an error for a non-object", () => {
    // @ts-expect-error: Testing runtime behavior
    expect(() => enumEntries("not_an_enum")).toThrow(
      "function enumEntries expected parameter is a enum, and requires at least one member",
    );
    // @ts-expect-error: Testing runtime behavior
    expect(() => enumEntries(123)).toThrow(
      "function enumEntries expected parameter is a enum, and requires at least one member",
    );
    // @ts-expect-error: Testing runtime behavior
    expect(() => enumEntries(null)).toThrow(
      "function enumEntries expected parameter is a enum, and requires at least one member",
    );
  });

  it("should throw an error for an object with mixed value types", () => {
    const mixedObj = { A: "str", B: 123 };
    expect(() => enumEntries(mixedObj)).toThrow(
      "function enumEntries expected parameter is a enum, and requires at least one member",
    );
  });

  it("should throw an error for an object mimicking an enum but with incorrect structure", () => {
    const fakeEnum = { "0": "NOT_ORIG_KEY", ORIG_KEY: 0 };
    expect(() => enumEntries(fakeEnum)).toThrow(
      "function enumEntries expected parameter is a enum, and requires at least one member",
    );
  });

  // --- 测试边缘情况 (Objects that pass isEnumeration but are not TS enums) ---

  it("should return entries for a plain object enum (non-bidirectional)", () => {
    const PlainObjEnum = { KEY_A: "value_a", KEY_B: "value_b" };
    const entries = enumEntries(PlainObjEnum);
    // Object.entries(PlainObjEnum) is [['KEY_A', 'value_a'], ['KEY_B', 'value_b']]
    // It's non-bidirectional, so all entries are returned.
    expect(entries).toEqual([
      ["KEY_A", "value_a"],
      ["KEY_B", "value_b"],
    ]);
  });

  // --- 根据对 isEnumeration 的理解修正测试 ---
  it("should return entries for a plain object enum with numeric values (non-bidirectional)", () => {
    // As per the analysis of isEnumeration, an object like this { KEY_A: 0, KEY_B: 1 }
    // IS considered a valid, non-bidirectional enum by the current logic.
    // Therefore, enumEntries should NOT throw, but return the entries.
    const PlainNumObjEnum = { KEY_A: 0, KEY_B: 1 };
    const entries = enumEntries(PlainNumObjEnum);
    // The function correctly identifies it as non-bidirectional and returns all original entries.
    expect(entries).toEqual([
      ["KEY_A", 0],
      ["KEY_B", 1],
    ]);
  });

  it("should handle an enum with duplicated values (according to updated isEnumeration logic)", () => {
    // Based on the analysis of the `isEnumeration` function,
    // an enum with duplicated values like this will fail the validation
    // because `isEnumeration` checks for duplicate *values* among the *original keys*.
    // The compiled object is { "1": "B", A: 1, B: 1 }.
    // Values of original keys [A, B] are [1, 1] which are duplicates.
    // Therefore, `isEnumeration` returns [false, false], and enumEntries should throw.
    enum DuplicatedEnum {
      A = 1,
      // eslint-disable-next-line ts/no-duplicate-enum-values
      B = 1, // Same value as A
    }

    expect(() => enumEntries(DuplicatedEnum)).toThrow(
      "function enumEntries expected parameter is a enum, and requires at least one member",
    );
  });

});
