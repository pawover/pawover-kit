import { describe, it, expect, vi } from "vitest";
import { enumKeys } from "./enumKeys"; // Adjust path as needed

describe("enumKeys", () => {
  // --- 测试有效枚举 ---

  it("should return keys for a string enum", () => {
    enum StringEnum {
      FIRST = "first_value",
      SECOND = "second_value",
    }
    const keys = enumKeys(StringEnum);
    expect(keys).toEqual(["FIRST", "SECOND"]);
  });

  it("should return keys for a numeric enum", () => {
    enum NumericEnum {
      UP,
      DOWN = 10,
    }
    const keys = enumKeys(NumericEnum);
    expect(keys).toEqual(["UP", "DOWN"]); // Should filter out the numeric keys like "0", "10"
  });

  it("should return keys for a mixed string-numeric enum", () => {
    // Note: TypeScript allows this, but the numeric part creates a reverse mapping.
    // The object looks like: { "0": "A", A: 0, B: "hello", "hello": "B" }
    // isEnumeration will likely fail this due to mixed types, so enumKeys shouldn't see it.
    // Let's test a pure numeric one again to be sure.
    enum MixedLiteralEnum {
      A = 1,
      B = 2,
    }
    const keys = enumKeys(MixedLiteralEnum);
    expect(keys).toEqual(["A", "B"]); // Should return ['A', 'B'], filtering out "1", "2"
  });

  it("should return keys for an enum with computed values", () => {
    enum ComputedEnum {
      A = 1,
      B = A * 2,
      C = B + 5,
    }
    const keys = enumKeys(ComputedEnum);
    expect(keys).toEqual(["A", "B", "C"]); // Should return ['A', 'B', 'C'], filtering out "1", "2", "7"
  });

  it("should handle an enum with duplicated values (according to updated isEnumeration logic)", () => {
    // Based on the analysis of the `isEnumeration` function,
    // an enum with duplicated values like this will fail the validation
    // because `isEnumeration` checks for duplicate *values* among the *original keys*.
    // The compiled object is { "1": "B", A: 1, B: 1 }.
    // Values of original keys [A, B] are [1, 1] which are duplicates.
    // Therefore, `isEnumeration` returns [false, false], and enumKeys should throw.
    enum DuplicatedEnum {
      A = 1,
      // eslint-disable-next-line ts/no-duplicate-enum-values
      B = 1, // Same value as A
    }

    // Since isEnumeration now considers this invalid, enumKeys should throw.
    expect(() => enumKeys(DuplicatedEnum)).toThrow(
      "function enumKeys expected parameter is a enum, and requires at least one member",
    );
  });

  it("should handle an enum with a single member (numeric)", () => {
    enum SingleMemberNumEnum {
      ONLY = 42,
    }
    const keys = enumKeys(SingleMemberNumEnum);
    expect(keys).toEqual(["ONLY"]); // Should return ['ONLY'], filtering out "42"
  });

  it("should handle an enum with a single member (string)", () => {
    enum SingleMemberStrEnum {
      ONLY = "only_value",
    }
    const keys = enumKeys(SingleMemberStrEnum);
    expect(keys).toEqual(["ONLY"]);
  });

  // --- 测试错误处理 ---

  it("should throw an error for an empty object", () => {
    const emptyObj = {};
    expect(() => enumKeys(emptyObj)).toThrow(
      "function enumKeys expected parameter is a enum, and requires at least one member",
    );
  });

  it("should throw an error for a non-object", () => {
    // @ts-expect-error: Testing runtime behavior
    expect(() => enumKeys("not_an_enum")).toThrow(
      "function enumKeys expected parameter is a enum, and requires at least one member",
    );
    // @ts-expect-error: Testing runtime behavior
    expect(() => enumKeys(123)).toThrow(
      "function enumKeys expected parameter is a enum, and requires at least one member",
    );
    // @ts-expect-error: Testing runtime behavior
    expect(() => enumKeys(null)).toThrow(
      "function enumKeys expected parameter is a enum, and requires at least one member",
    );
  });

  it("should throw an error for an object with mixed value types", () => {
    const mixedObj = { A: "str", B: 123 };
    expect(() => enumKeys(mixedObj)).toThrow(
      "function enumKeys expected parameter is a enum, and requires at least one member",
    );
  });

  it("should throw an error for an object mimicking an enum but with incorrect structure", () => {
    // This object has numeric-string pairs but doesn't follow the TS enum reverse-mapping rule.
    const fakeEnum = { "0": "NOT_ORIG_KEY", ORIG_KEY: 0 };
    expect(() => enumKeys(fakeEnum)).toThrow(
      "function enumKeys expected parameter is a enum, and requires at least one member",
    );
  });

  // --- 测试边缘情况 (Objects that pass isEnumeration but are not TS enums) ---
  // These tests depend on the robustness of `isEnumeration`.

  it("should return keys for a plain object enum (non-bidirectional)", () => {
    const PlainObjEnum = { KEY_A: "value_a", KEY_B: "value_b" };
    const keys = enumKeys(PlainObjEnum);
    expect(keys).toEqual(["KEY_A", "KEY_B"]); // Should return all keys as it's considered non-bidirectional
  });

  it("should return keys for a plain object enum with numeric values (non-bidirectional)", () => {
    // As per the analysis of isEnumeration, an object like this { KEY_A: 0, KEY_B: 1 }
    // IS considered a valid, non-bidirectional enum by the current logic.
    // Therefore, enumKeys should NOT throw, but return the keys.
    const PlainNumObjEnum = { KEY_A: 0, KEY_B: 1 };
    const keys = enumKeys(PlainNumObjEnum);
    // The function correctly identifies it as non-bidirectional and returns all original keys.
    expect(keys).toEqual(["KEY_A", "KEY_B"]);
  });

});
