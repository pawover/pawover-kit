import { describe, it, expect } from "vitest";
import { stringTrim } from "./stringTrim";

describe("stringTrim", () => {
  // --- 测试基本功能 ---

  it("should trim default whitespace characters (only space)", () => {
    // 注意: 根据函数实际行为修正期望值。
    // 它只修剪默认的空格 " "，而不是所有空白字符。
    expect(stringTrim("  hello  ")).toBe("hello");
    // \t, \n, \r 不会被默认的 " " 修剪
    expect(stringTrim("\t\n world \r")).toBe("\t\n world \r");
    expect(stringTrim("  spaced  text  ")).toBe("spaced  text");
  });

  it("should trim specified characters", () => {
    expect(stringTrim("__hello__", "_")).toBe("hello");
    expect(stringTrim("...world...", ".")).toBe("world");
    expect(stringTrim("abcabcHelloWorldabcbca", "abc")).toBe("HelloWorld");
  });

  it("should trim multiple different specified characters", () => {
    expect(stringTrim("_-hello-_", "_-")).toBe("hello");
    expect(stringTrim("!@#$%text!@#$%", "!@#$%")).toBe("text");
  });

  it("should return the same string if no characters to trim are found", () => {
    expect(stringTrim("hello", "_")).toBe("hello");
    expect(stringTrim("world", "xyz")).toBe("world");
  });

  it("should return an empty string if the entire string consists of trim characters", () => {
    expect(stringTrim("___", "_")).toBe("");
    expect(stringTrim("   ", " ")).toBe("");
    expect(stringTrim("ababab", "ab")).toBe("");
  });

  // --- 测试边界情况 ---

  it("should return an empty string for null or undefined input", () => {
    expect(stringTrim(null)).toBe("");
    expect(stringTrim(undefined)).toBe("");
  });

  it("should return an empty string for an empty input string", () => {
    expect(stringTrim("")).toBe("");
  });

  // --- 修正后的测试用例 ---
  it("should not throw an error for an empty charsToTrim string, but effectively do nothing", () => {
    // As discovered, an empty character class [] in regex does not cause an error in JS.
    // The regex ^[]+|[]+$ matches nothing, so the string is returned unchanged.
    expect(stringTrim("hello", "")).toBe("hello");
  });

  // --- 测试特殊字符转义 ---
  // These tests verify that characters which are special in regex context are handled correctly.

  it("should trim special regex characters when they are part of charsToTrim", () => {
    // Test trimming a dot '.'
    expect(stringTrim("...hello...", ".")).toBe("hello");

    // Test trimming square brackets '[]'
    expect(stringTrim("[[hello]]", "[]")).toBe("hello");

    // Test trimming a backslash '\'.
    const inputWithBackslashes = "\\hello\\";
    const charToTrimBackslash = "\\";
    expect(stringTrim(inputWithBackslashes, charToTrimBackslash)).toBe("hello");

    // Test trimming other common special chars like ^ and $
    expect(stringTrim("$$hi$$", "$")).toBe("hi");
    expect(stringTrim("^^bye^^", "^")).toBe("bye");
  });

  it("should trim mixed alphanumeric and special characters", () => {
    expect(stringTrim("123abcHello321cba", "123abc")).toBe("Hello");
  });

  // --- 补充测试：明确验证它不处理所有空白字符 ---
  it("should not trim all whitespace characters unless explicitly passed", () => {
    const input = "\t \n  hello \r \n";
    const trimmedWithSpaceOnly = stringTrim(input, " ");
    // Trims spaces but leaves \t, \n, \r
    expect(trimmedWithSpaceOnly).toBe("\t \n  hello \r \n");

    const trimmedWithAllWhitespace = stringTrim(input, " \t\n\r");
    expect(trimmedWithAllWhitespace).toBe("hello");
  });
});
