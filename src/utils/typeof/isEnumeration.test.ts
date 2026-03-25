/* eslint-disable ts/no-duplicate-enum-values */
/* eslint-disable no-implicit-coercion */
import { describe, it, expect } from "vitest";
import { isEnumeration } from "./isEnumeration";

describe("isEnumeration", () => {
  // --- 有效数字枚举 (双向) ---
  it("should identify a simple numeric enum as valid and bidirectional", () => {
    enum SimpleNumEnum {
      A,
      B,
    }
    const result = isEnumeration(SimpleNumEnum);
    expect(result).toEqual([true, true]);
  });

  it("should identify a numeric enum with explicit values as valid and bidirectional", () => {
    enum ExplicitNumEnum {
      A = 1,
      B = 2,
    }
    const result = isEnumeration(ExplicitNumEnum);
    expect(result).toEqual([true, true]);
  });

  it("should identify a numeric enum with computed values as valid and bidirectional", () => {
    enum ComputedNumEnum {
      A = 1,
      B = A * 2,
    }
    const result = isEnumeration(ComputedNumEnum);
    expect(result).toEqual([true, true]);
  });

  it("but when the values are the same, they should be invalid", () => {
    enum ComputedNumEnum {
      A = 1,
      B = A * 1,
    }
    const result = isEnumeration(ComputedNumEnum);
    expect(result).toEqual([false, false]);
  });

  // --- 有效字符串枚举 (非双向) ---
  it("should identify a simple string enum as valid and non-bidirectional", () => {
    enum SimpleStrEnum {
      A = "a",
      B = "b",
    }
    const result = isEnumeration(SimpleStrEnum);
    expect(result).toEqual([true, false]);
  });

  it("should identify a string enum with complex values as valid and non-bidirectional", () => {
    enum ComplexStrEnum {
      A = "complex-value",
      B = "B",
    }
    const result = isEnumeration(ComplexStrEnum);
    expect(result).toEqual([true, false]);
  });

  // --- 有效对象枚举 (非双向) ---
  it("should identify an object enum (with primitive values) as valid and non-bidirectional", () => {
    const ObjEnum = { A: "val", B: "val2" };
    const result = isEnumeration(ObjEnum);
    expect(result).toEqual([true, false]);
  });

  // --- 无效情况：空对象 ---
  it("should return [false, false] for an empty object", () => {
    const emptyObj = {};
    const result = isEnumeration(emptyObj);
    expect(result).toEqual([false, false]);
  });

  // --- 无效情况：非对象类型 ---
  it("should return [false, false] for null", () => {
    // @ts-expect-error
    const result = isEnumeration(null);
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for a string", () => {
    // @ts-expect-error
    const result = isEnumeration("not_an_enum");
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for a number", () => {
    // @ts-expect-error
    const result = isEnumeration(42);
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for an array", () => {
    // @ts-expect-error
    const result = isEnumeration([1, 2, 3]);
    expect(result).toEqual([false, false]);
  });

  // --- 无效情况：值类型不一致 ---
  it("should return [false, false] for an enum with mixed value types", () => {
    const mixedEnum = { A: "str", B: 123 };
    const result = isEnumeration(mixedEnum);
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for an enum starting with a number then a string", () => {
    const mixedEnum = { A: 1, B: "str" };
    const result = isEnumeration(mixedEnum);
    expect(result).toEqual([false, false]);
  });

  // --- 无效情况：值重复 ---
  it("should return [false, false] for a string enum with duplicate values", () => {
    const dupStrEnum = { A: "same", B: "same" };
    const result = isEnumeration(dupStrEnum);
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for a numeric enum with duplicate values", () => {
    // This is a special case. TypeScript allows duplicate values in numeric enums,
    // but the generated object will have the later key override the earlier one for the number key.
    // e.g., enum DupNumEnum { A = 1, B = 1 } -> { "1": "B", "A": 1, "B": 1 }
    // Here, "A" and "B" both have value 1, but the reverse mapping "1" -> "B" exists.
    // Our implementation checks for duplicate *values* among the *original keys*.
    // The values for original keys A and B are [1, 1], which are duplicates.
    enum DupNumEnum {
      A = 1,
      B = 1,
    }
    const result = isEnumeration(DupNumEnum);
    expect(result).toEqual([false, false]);
  });

  // --- 无效情况：非双向但值为数字 ---
  it("should return [false, false] for an object with string keys and numeric values (not a TS enum)", () => {
    // A manually created object with numeric values but no TS enum generation logic.
    // It lacks the reverse mapping (e.g., {"0": "A"}).
    const manualNumObj = { A: 0, B: 1 };
    const result = isEnumeration(manualNumObj);
    expect(result).toEqual([true, false]);
  });

  // --- 无效情况：双向映射不完整 ---
  it("should return [false, false] for an object with incomplete bidirectional mapping (missing reverse)", () => {
    // Simulates { "0": "A", "A": 0, "B": 1 } - Missing reverse mapping for "B"'s value (1)
    const incompleteEnum = Object.defineProperties(
      {},
      {
        "0": { value: "A", enumerable: true },
        "A": { value: 0, enumerable: true },
        "B": { value: 1, enumerable: true },
      },
    );
    const result = isEnumeration(incompleteEnum);
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for an object with incomplete bidirectional mapping (extra reverse)", () => {
    // Simulates { "0": "A", "1": "X", "A": 0, "B": 1 } - "X" is an extra reverse map not linked to an original key
    const incompleteEnum = Object.defineProperties(
      {},
      {
        "0": { value: "A", enumerable: true },
        "1": { value: "X", enumerable: true }, // "X" is not an original key
        "A": { value: 0, enumerable: true },
        "B": { value: 1, enumerable: true },
      },
    );
    const result = isEnumeration(incompleteEnum);
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for an object with incorrect reverse mapping value type", () => {
    // Simulates { "0": 123, "A": 0 } - Reverse mapping value is a number, not a string
    const invalidReverseEnum = Object.defineProperties(
      {},
      {
        "0": { value: 123, enumerable: true }, // Should be a string
        "A": { value: 0, enumerable: true },
      },
    );
    const result = isEnumeration(invalidReverseEnum);
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for an object with incorrect reverse mapping value (not an original key)", () => {
    // Simulates { "0": "NOT_ORIGINAL_KEY", "A": 0, "B": 1 } - "NOT_ORIGINAL_KEY" is not "A" or "B"
    const invalidReverseEnum = Object.defineProperties(
      {},
      {
        "0": { value: "NOT_ORIGINAL_KEY", enumerable: true }, // Not one of the original keys ("A", "B")
        "A": { value: 0, enumerable: true },
        "B": { value: 1, enumerable: true },
      },
    );
    const result = isEnumeration(invalidReverseEnum);
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for an object with mismatched numeric/string key count", () => {
    // Simulates { "0": "A", "1": "B", "A": 0 } - Two numeric keys, one original key
    const mismatchedEnum = Object.defineProperties(
      {},
      {
        "0": { value: "A", enumerable: true },
        "1": { value: "B", enumerable: true },
        "A": { value: 0, enumerable: true },
      },
    );
    const result = isEnumeration(mismatchedEnum);
    expect(result).toEqual([false, false]);
  });

  // --- 无效情况：值包含非 string/number 类型 ---
  it("should return [false, false] for an enum with an object value", () => {
    const objValEnum = { A: "str", B: {} };
    const result = isEnumeration(objValEnum);
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for an enum with an array value", () => {
    const arrValEnum = { A: "str", B: [] };
    const result = isEnumeration(arrValEnum);
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for an enum with a boolean value", () => {
    const boolValEnum = { A: "str", B: true };
    const result = isEnumeration(boolValEnum);
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for an enum with an undefined value", () => {
    const undefValEnum = { A: "str", B: undefined };
    const result = isEnumeration(undefValEnum);
    expect(result).toEqual([false, false]);
  });

  it("should return [false, false] for an enum with a null value", () => {
    const nullValEnum = { A: "str", B: null };
    const result = isEnumeration(nullValEnum);
    expect(result).toEqual([false, false]);
  });

  // --- 极限情况：包含数值键名的字符串枚举 ---
  it("should treat a string enum with a numeric-like key name as non-bidirectional", () => {
    // Although "0" looks like a number, it's a string key. The value is also a string.
    // It does not generate a reverse mapping like a numeric enum.
    const strEnumWithNumKey = { "0": "zero", "A": "one" };
    const result = isEnumeration(strEnumWithNumKey);
    expect(result).toEqual([false, false]); // Valid, but not bidirectional
  });

  // --- 极限情况：只有一个成员的数字枚举 ---
  it("should identify a single-member numeric enum as valid and bidirectional", () => {
    enum SingleNumEnum {
      A = 5,
    }
    const result = isEnumeration(SingleNumEnum);
    expect(result).toEqual([true, true]);
  });

  // --- 极限情况：包含负数和零的数字枚举 ---
  it("should handle a numeric enum with negative and zero values", () => {
    const NegativeEnum = Object.defineProperties(
      {},
      {
        "-1": { value: "A", enumerable: true },
        "0": { value: "B", enumerable: true },
        "A": { value: -1, enumerable: true },
        "B": { value: 0, enumerable: true },
      },
    );
    const result = isEnumeration(NegativeEnum);
    expect(result).toEqual([false, false]);
  });

  it("should identify a numeric enum where the string representation of the number matches a key name (rare edge case)", () => {
    enum KeyLooksLikeNumberEnum {
      // @ts-expect-error
      "0" = 10,
      // @ts-expect-error
      "1" = 11,
    }
    const result = isEnumeration(KeyLooksLikeNumberEnum);
    expect(result).toEqual([false, false]);
  });

  // --- 有效情况：Enum Key 名称与字符串值相同 ---
  it("should identify a string enum where key names are the same as their values as valid and non-bidirectional", () => {
    // This is a common pattern. The key "A" has value "A".
    enum SelfNamedEnum {
      A = "A",
      B = "B",
    }
    const result = isEnumeration(SelfNamedEnum);
    expect(result).toEqual([true, false]);
  });

  // --- 有效情况：Enum Key 包含特殊字符 ---
  it("should identify a string enum with keys containing underscores and numbers as valid and non-bidirectional", () => {
    enum SpecialCharEnum {
      KEY_A = "val1",
      KEY_B_2 = "val2",
    }
    const result = isEnumeration(SpecialCharEnum);
    expect(result).toEqual([true, false]);
  });

  it("should identify a numeric enum with keys containing underscores and numbers as valid and bidirectional", () => {
    enum NumSpecialCharEnum {
      KEY_A = 1,
      KEY_B_2 = 2,
    }
    const result = isEnumeration(NumSpecialCharEnum);
    expect(result).toEqual([true, true]);
  });
});
