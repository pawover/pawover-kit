import { describe, expect, it } from "vitest";
import { stringToValues } from "./stringToValues";
import { stringTrim } from "./stringTrim";
import { stringTruncate } from "./stringTruncate";

describe("stringToValues", () => {
  it("应该分割字符串为数字数组 (默认)", () => {
    expect(stringToValues("1,2,3")).toEqual([1, 2, 3]);
  });

  it("应该分割字符串为字符串数组", () => {
    expect(stringToValues("a-b-c", "string", "-")).toEqual(["a", "b", "c"]);
  });

  it("处理空输入", () => {
    expect(stringToValues("")).toEqual([]);
    expect(stringToValues(null)).toEqual([]);
  });
});

describe("stringTrim", () => {
  it("应该裁切空格 (默认)", () => {
    expect(stringTrim("  hello  ")).toBe("hello");
  });

  it("应该裁切指定字符", () => {
    expect(stringTrim("__hello__", "_")).toBe("hello");
  });

  it("处理 regex 特殊字符", () => {
    expect(stringTrim("++hello++", "+")).toBe("hello");
  });

  it("处理空输入", () => {
    expect(stringTrim(null)).toBe("");
  });
});

describe("stringTruncate", () => {
  it("超过最大长度应该截断并添加省略符", () => {
    // maxLength 8. ellipsis `...` (len 3). keep 5 chars.
    // "hello world" -> "hello..."
    expect(stringTruncate("hello world", 8)).toBe("hello...");
  });

  it("未超过最大长度保持原样", () => {
    expect(stringTruncate("hello", 10)).toBe("hello");
  });

  it("应该支持自定义省略符", () => {
    // maxLength 8, ellipsis `.`. keep 7 chars.
    // "hello world" -> "hello w."
    expect(stringTruncate("hello world", 8, ".")).toBe("hello w.");
  });

  it("处理无效输入 length", () => {
    expect(stringTruncate("abc", -1)).toBe("abc");
  });

  it("处理非字符串输入", () => {
    // @ts-expect-error test
    expect(stringTruncate(null, 10)).toBe("");
  });
});
