import { describe, expect, it } from "vitest";
import { stringInitialCase } from "./stringInitialCase";
import { stringReplace } from "./stringReplace";
import { stringTemplate } from "./stringTemplate";

describe("stringInitialCase", () => {
  it("应该转换首字母为小写", () => {
    expect(stringInitialCase("Hello", "lower")).toBe("hello");
  });

  it("应该转换首字母为大写", () => {
    expect(stringInitialCase("hello", "upper")).toBe("Hello");
  });

  it("含有非西欧字符时不处理", () => {
    expect(stringInitialCase("h.ello", "upper")).toBe("h.ello");
    expect(stringInitialCase("hello-word", "upper")).toBe("hello-word");
  });

  it("全大写单词不处理", () => {
    expect(stringInitialCase("HELLO", "lower")).toBe("HELLO");
  });

  it("处理空输入或非字符串", () => {
    // @ts-expect-error test
    expect(stringInitialCase(null)).toBe("");
  });
});

describe("stringReplace", () => {
  it("应该替换第一个匹配项", () => {
    expect(stringReplace("hello world", "world", "context")).toBe("hello context");
  });

  it("应该处理非字符串输入", () => {
    // @ts-expect-error test
    expect(stringReplace(null, "a", "b")).toBe("");
  });
});

describe("stringTemplate", () => {
  it("应该使用模板替换", () => {
    expect(stringTemplate("Hello {{name}}", { name: "World" })).toBe("Hello World");
  });

  it("应该支持自定义正则", () => {
    expect(stringTemplate("Hello {name}", { name: "World" }, /\{(.+?)\}/g)).toBe("Hello World");
  });

  it("未找到的属性显示为 undefined (默认行为)", () => {
    expect(stringTemplate("Show {{missing}}", {})).toBe("Show undefined");
  });

  it("处理非字符串输入", () => {
    // @ts-expect-error test
    expect(stringTemplate(null, {})).toBe("");
  });
});
