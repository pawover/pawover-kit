import { describe, it, expect } from "vitest";
import { stringToUpperCase } from "./stringToUpperCase";

describe("stringToUpperCase", () => {
  it("should convert a lowercase string to uppercase at both runtime and type level", () => {
    // 现在 result 的类型是 "HELLO"，而不是 "" | "HELLO"
    const result = stringToUpperCase("hello");
    expect(result).toBe("HELLO");

    // 这个赋值现在是类型安全的，因为 result 的类型是 "HELLO"
    const _confirmedLiteralType: "HELLO" = result;
  });

  it("should handle mixed-case strings", () => {
    expect(stringToUpperCase("Hello World")).toBe("HELLO WORLD");
  });

  it("should not change a string that is already fully uppercase", () => {
    expect(stringToUpperCase("ALREADY_UPPER")).toBe("ALREADY_UPPER");
  });

  it("should handle strings with numbers and special characters", () => {
    // Numbers and special chars remain unchanged
    expect(stringToUpperCase("hello123!@#")).toBe("HELLO123!@#");
    expect(stringToUpperCase("test-case_string")).toBe("TEST-CASE_STRING");
  });

  it("should handle empty strings", () => {
    // 传入字面量 ""，类型为 Uppercase<"">，即 ""
    expect(stringToUpperCase("")).toBe("");
  });

  it("should return an empty string if the input is not a valid string", () => {
    // When input is not a string, the runtime result is an empty string.
    // The type is `""` which is part of the `Uppercase<T> | ""` union.

    // @ts-ignore Testing incorrect type on purpose
    expect(stringToUpperCase(null)).toBe("");
    // @ts-ignore
    expect(stringToUpperCase(undefined)).toBe("");
    // @ts-ignore
    expect(stringToUpperCase(123)).toBe("");
    // @ts-ignore
    expect(stringToUpperCase({})).toBe("");
    // @ts-ignore
    expect(stringToUpperCase([])).toBe("");
  });

  it("should handle accented characters according to locale-specific rules", () => {
    // Note: The actual output depends on the environment's locale settings.
    // These are common examples.
    expect(stringToUpperCase("café")).toBe("CAFÉ");
    expect(stringToUpperCase("münchen")).toBe("MÜNCHEN");
  });

  it("should infer a broader type when the input is a generic string variable", () => {
    // eslint-disable-next-line ts/no-inferrable-types
    const someString: string = "hello";
    const result = stringToUpperCase(someString);
    // result 的类型是 `string`，因为 someString 在编译时可能为空字符串
    expect(result).toBe("HELLO");
    const _confirmedStringType: string = result; // This is safe
  });
});
