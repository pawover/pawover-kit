import { describe, it, expect } from "vitest";
import { isRegExp } from "./isRegExp";

describe("isRegExp", () => {
  it("应该在传入正则表达式字面量或构造函数创建的实例时返回 true", () => {
    expect(isRegExp(/abc/gi)).toBe(true);
    expect(isRegExp(new RegExp("def", "i"))).toBe(true);
    expect(isRegExp(new RegExp("xyz"))).toBe(true);
    expect(isRegExp(/test/imu)).toBe(true);
    expect(isRegExp(new RegExp(""))).toBe(true); // 空正则
  });

  it("应该在传入非 RegExp 值时返回 false", () => {
    // 基础类型
    expect(isRegExp(undefined)).toBe(false);
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp(true)).toBe(false);
    expect(isRegExp(false)).toBe(false);
    expect(isRegExp(0)).toBe(false);
    expect(isRegExp(123)).toBe(false);
    expect(isRegExp(NaN)).toBe(false);
    expect(isRegExp(Infinity)).toBe(false);
    expect(isRegExp("")).toBe(false);
    expect(isRegExp("/abc/g")).toBe(false); // 字符串，不是 RegExp 对象
    expect(isRegExp(Symbol("reg"))).toBe(false);
    expect(isRegExp(BigInt(123))).toBe(false);

    // 普通对象和数组
    expect(isRegExp({})).toBe(false);
    expect(isRegExp({ source: "abc", flags: "g" })).toBe(false); // 结构相似但不是 RegExp
    expect(isRegExp([])).toBe(false);
    expect(isRegExp([1, 2, 3])).toBe(false);

    // 其他内置对象
    expect(isRegExp(new Date())).toBe(false);
    expect(isRegExp(Math)).toBe(false);
    expect(isRegExp(JSON)).toBe(false);
    expect(isRegExp(new Error())).toBe(false);
    expect(isRegExp(Promise.resolve())).toBe(false);
    expect(isRegExp(new Map())).toBe(false);
    expect(isRegExp(new Set())).toBe(false);
    expect(isRegExp(new ArrayBuffer(1))).toBe(false);
    expect(isRegExp(new Int8Array(1))).toBe(false);

    // 函数
    expect(isRegExp(() => {})).toBe(false);
    expect(isRegExp(async () => {})).toBe(false);
    expect(isRegExp(function *() {})).toBe(false);
  });

  it("应该能识别并拒绝结构相似但缺少必要属性或方法的伪造对象", () => {
    // 缺少 test 方法
    const fakeRegexpNoTest = {
      source: "abc",
      flags: "g",
      global: true,
    };
    expect(isRegExp(fakeRegexpNoTest)).toBe(false);

    // 缺少 source 属性
    const fakeRegexpNoSource = {
      flags: "g",
      global: true,
      test: () => true,
    };
    expect(isRegExp(fakeRegexpNoSource)).toBe(false);

    // source 不是字符串
    const fakeRegexpWrongSource = {
      source: 123,
      flags: "g",
      global: true,
      test: () => true,
    };
    expect(isRegExp(fakeRegexpWrongSource)).toBe(false);

    // flags 不是字符串
    const fakeRegexpWrongFlags = {
      source: "abc",
      flags: 123,
      global: true,
      test: () => true,
    };
    expect(isRegExp(fakeRegexpWrongFlags)).toBe(false);

    // global 不是布尔值
    const fakeRegexpWrongGlobal = {
      source: "abc",
      flags: "g",
      global: "yes", // 应该是布尔值
      test: () => true,
    };
    expect(isRegExp(fakeRegexpWrongGlobal)).toBe(false);

    // test 不是函数
    const fakeRegexpWrongTest = {
      source: "abc",
      flags: "g",
      global: true,
      test: "not a function",
    };
    expect(isRegExp(fakeRegexpWrongTest)).toBe(false);
  });

  it("应该能处理访问属性时会抛出错误的恶意对象", () => {
    // 创建一个对象，当访问其属性时会抛出错误
    const maliciousObject = {
      get source () {
        throw new Error("Access denied");
      },
      get flags () {
        throw new Error("Access denied");
      },
      get global () {
        throw new Error("Access denied");
      },
      test: () => true,
    };

    // isRegExp 应该捕获错误并返回 false
    expect(isRegExp(maliciousObject)).toBe(false);
  });

  it("应该正确缩小类型", () => {
    const maybeRegex: unknown = /test/;

    if (isRegExp(maybeRegex)) {
      // 在此 if 块内，TypeScript 应该将 maybeRegex 的类型识别为 RegExp
      // 这允许我们安全地调用其方法和访问其属性
      expect(() => {
        const result = maybeRegex.test("this is a test");
        const source = maybeRegex.source;
        const flags = maybeRegex.flags;
        // 访问这些属性和方法不应导致 TypeScript 类型错误
        expect(result).toBe(true);
        expect(source).toBe("test");
        expect(flags).toBe("");
      }).not.toThrow();
    }
  });

  it("对于继承自 RegExp 的子类实例也应返回 true", () => {
    // 定义一个继承自 RegExp 的子类
    class CustomRegExp extends RegExp {
      customProp = "custom";
    }

    const customRegex = new CustomRegExp("hello", "gi");

    // 子类实例也是一个有效的 RegExp
    expect(isRegExp(customRegex)).toBe(true);
  });
});
