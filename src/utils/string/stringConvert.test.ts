import { describe, expect, it } from "vitest";
import { stringToJson } from "./stringToJson";
import { stringToNumber } from "./stringToNumber";
import { stringToPosix } from "./stringToPosix";

describe("stringToJson", () => {
  it("应该解析有效的 JSON", () => {
    expect(stringToJson("{\"a\": 1}", {})).toEqual({ a: 1 });
  });

  it("无效输入或解析错误应返回安全值", () => {
    expect(stringToJson("invalid", { default: true })).toEqual({ default: true });
    expect(stringToJson(null, {})).toEqual({});
  });
});

describe("stringToNumber", () => {
  it("应该提取数字", () => {
    expect(stringToNumber("123abc456")).toBe("123456");
    expect(stringToNumber("-10.5$")).toBe("-10.5");
  });

  it("应该处理多个小数点 (只保留第一个)", () => {
    expect(stringToNumber("1.2.3")).toBe("1.23");
  });

  it("应该处理多个负号 (只保留开头的)", () => {
    expect(stringToNumber("-1-2")).toBe("-12");
    expect(stringToNumber("--1")).toBe("1"); // signCount is even -> positive
    expect(stringToNumber("---1")).toBe("-1"); // signCount is odd -> negative
  });

  it("非字符串返回空串", () => {
    // @ts-expect-error test
    expect(stringToNumber(null)).toBe("");
  });
});

describe("stringToPosix", () => {
  it("应该转换 Windows 路径", () => {
    expect(stringToPosix("C:\\Users\\Name")).toBe("Users/Name");
  });

  it("应该合并斜杠", () => {
    expect(stringToPosix("//path///to//file")).toBe("/path/to/file");
  });

  it("应该移除开头斜杠 (option)", () => {
    expect(stringToPosix("/path", true)).toBe("path");
  });

  it("非字符串返回空串", () => {
    expect(stringToPosix(null)).toBe("");
  });
});
