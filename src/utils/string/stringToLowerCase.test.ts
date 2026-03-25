import { describe, it, expect } from "vitest";
import { stringToLowerCase } from "./stringToLowerCase";

describe("stringToLowerCase", () => {
  it("should convert an uppercase string to lowercase at both runtime and type level", () => {
    // 现在 result 的类型是 "hello"，而不是 "" | "hello"
    const result = stringToLowerCase("HELLO");
    expect(result).toBe("hello");

    // 这个赋值现在是类型安全的，因为 result 的类型是 "hello"
    const _confirmedLiteralType: "hello" = result;
  });

  it("should handle mixed-case strings", () => {
    expect(stringToLowerCase("Hello World")).toBe("hello world");
    expect(stringToLowerCase("tEsT")).toBe("test");
  });

  it("should not change a string that is already fully lowercase", () => {
    expect(stringToLowerCase("already_lower")).toBe("already_lower");
  });

  it("should handle strings with numbers and special characters", () => {
    // Numbers and special chars remain unchanged
    expect(stringToLowerCase("HELLO123!@#")).toBe("hello123!@#");
    expect(stringToLowerCase("TEST-CASE_string")).toBe("test-case_string");
  });

  it("should handle empty strings", () => {
    // 传入字面量 ""，类型为 Lowercase<"">，即 ""
    expect(stringToLowerCase("")).toBe("");
  });

  it("should return an empty string if the input is not a valid string", () => {
    // When input is not a string, the runtime result is an empty string.
    // The type is `""` which is part of the `Lowercase<T> | ""` union.

    // @ts-ignore Testing incorrect type on purpose
    expect(stringToLowerCase(null)).toBe("");
    // @ts-ignore
    expect(stringToLowerCase(undefined)).toBe("");
    // @ts-ignore
    expect(stringToLowerCase(123)).toBe("");
    // @ts-ignore
    expect(stringToLowerCase({})).toBe("");
    // @ts-ignore
    expect(stringToLowerCase([])).toBe("");
  });

  it("should handle accented characters according to locale-specific rules", () => {
    // Note: The actual output depends on the environment's locale settings.
    // These are common examples.
    expect(stringToLowerCase("CAFÉ")).toBe("café");
    expect(stringToLowerCase("MÜNCHEN")).toBe("münchen");
  });

  it("should infer a broader type when the input is a generic string variable", () => {
    // eslint-disable-next-line ts/no-inferrable-types
    const someString: string = "HELLO";
    const result = stringToLowerCase(someString);
    // result 的类型是 `string`，因为 someString 在编译时可能为空字符串
    expect(result).toBe("hello");
    const _confirmedStringType: string = result; // This is safe
  });
});
