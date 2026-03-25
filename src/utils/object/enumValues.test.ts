import { describe, it, expect } from "vitest";
import { enumValues } from "./enumValues"; // Adjust path as needed

describe("enumValues", () => {
  // --- 测试有效枚举 ---

  it("should return values for a string enum", () => {
    enum StringEnum {
      FIRST = "first_value",
      SECOND = "second_value",
    }
    const values = enumValues(StringEnum);
    expect(values).toEqual(["first_value", "second_value"]);
  });

  it("should return values for a numeric enum", () => {
    enum NumericEnum {
      UP = 0,
      DOWN = 10,
    }
    const values = enumValues(NumericEnum);
    // Object.values(NumericEnum) is ["UP", "DOWN", 0, 10]
    // splice removes the first half, returning the original numeric values [0, 10]
    expect(values).toEqual([0, 10]);
  });

  it("should return values for an enum with computed values", () => {
    enum ComputedEnum {
      A = 1,
      B = A * 2,
      C = B + 5,
    }
    const values = enumValues(ComputedEnum);
    // Object.values(ComputedEnum) is ["A", "B", "C", 1, 2, 7]
    // splice removes the first half, returning [1, 2, 7]
    expect(values).toEqual([1, 2, 7]);
  });

  it("should handle an enum with a single member (numeric)", () => {
    enum SingleMemberNumEnum {
      ONLY = 42,
    }
    const values = enumValues(SingleMemberNumEnum);
    expect(values).toEqual([42]); // Should return [42], filtering out "ONLY"
  });

  it("should handle an enum with a single member (string)", () => {
    enum SingleMemberStrEnum {
      ONLY = "only_value",
    }
    const values = enumValues(SingleMemberStrEnum);
    expect(values).toEqual(["only_value"]);
  });

  // --- 测试错误处理 ---

  it("should throw an error for an empty object", () => {
    const emptyObj = {};
    expect(() => enumValues(emptyObj)).toThrow(
      "function enumValues expected parameter is a enum, and requires at least one member",
    );
  });

  it("should throw an error for a non-object", () => {
    // @ts-expect-error: Testing runtime behavior
    expect(() => enumValues("not_an_enum")).toThrow(
      "function enumValues expected parameter is a enum, and requires at least one member",
    );
    // @ts-expect-error: Testing runtime behavior
    expect(() => enumValues(123)).toThrow(
      "function enumValues expected parameter is a enum, and requires at least one member",
    );
    // @ts-expect-error: Testing runtime behavior
    expect(() => enumValues(null)).toThrow(
      "function enumValues expected parameter is a enum, and requires at least one member",
    );
  });

  it("should throw an error for an object with mixed value types", () => {
    const mixedObj = { A: "str", B: 123 };
    expect(() => enumValues(mixedObj)).toThrow(
      "function enumValues expected parameter is a enum, and requires at least one member",
    );
  });

  it("should throw an error for an object mimicking an enum but with incorrect structure", () => {
    const fakeEnum = { "0": "NOT_ORIG_KEY", ORIG_KEY: 0 };
    expect(() => enumValues(fakeEnum)).toThrow(
      "function enumValues expected parameter is a enum, and requires at least one member",
    );
  });

  // --- 测试边缘情况 (Objects that pass isEnumeration but are not TS enums) ---

  it("should return values for a plain object enum (non-bidirectional)", () => {
    const PlainObjEnum = { KEY_A: "value_a", KEY_B: "value_b" };
    const values = enumValues(PlainObjEnum);
    // Object.values(PlainObjEnum) is ['value_a', 'value_b']
    // It's non-bidirectional, so all values are returned.
    expect(values).toEqual(["value_a", "value_b"]);
  });

  // --- 根据对 isEnumeration 的理解修正测试 ---
  it("should return values for a plain object enum with numeric values (non-bidirectional)", () => {
    // As per the analysis of isEnumeration, an object like this { KEY_A: 0, KEY_B: 1 }
    // IS considered a valid, non-bidirectional enum by the current logic.
    // Therefore, enumValues should NOT throw, but return the values.
    const PlainNumObjEnum = { KEY_A: 0, KEY_B: 1 };
    const values = enumValues(PlainNumObjEnum);
    // The function correctly identifies it as non-bidirectional and returns all original values.
    expect(values).toEqual([0, 1]);
  });

  it("should handle an enum with duplicated values (according to updated isEnumeration logic)", () => {
    // Based on the analysis of the `isEnumeration` function,
    // an enum with duplicated values like this will fail the validation
    // because `isEnumeration` checks for duplicate *values* among the *original keys*.
    // The compiled object is { "1": "B", A: 1, B: 1 }.
    // Values of original keys [A, B] are [1, 1] which are duplicates.
    // Therefore, `isEnumeration` returns [false, false], and enumValues should throw.
    enum DuplicatedEnum {
      A = 1,
      // eslint-disable-next-line ts/no-duplicate-enum-values
      B = 1, // Same value as A
    }

    expect(() => enumValues(DuplicatedEnum)).toThrow(
      "function enumValues expected parameter is a enum, and requires at least one member",
    );
  });

});
