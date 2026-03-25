import { describe, it, expect } from "vitest";
import { isURLSearchParams } from "./isURLSearchParams";

describe("isURLSearchParams", () => {
  it("应该在传入 URLSearchParams 实例时返回 true", () => {
    // 使用不同方式创建 URLSearchParams 实例进行测试
    const searchParams1 = new URLSearchParams();
    const searchParams2 = new URLSearchParams("foo=bar&baz=qux");
    const searchParams3 = new URLSearchParams([
      ["foo", "bar"],
      ["baz", "qux"],
    ]);
    const searchParams4 = new URLSearchParams({ foo: "bar", baz: "qux" });

    expect(isURLSearchParams(searchParams1)).toBe(true);
    expect(isURLSearchParams(searchParams2)).toBe(true);
    expect(isURLSearchParams(searchParams3)).toBe(true);
    expect(isURLSearchParams(searchParams4)).toBe(true);
  });

  it("应该在传入非 URLSearchParams 值时返回 false", () => {
    // 基础类型
    expect(isURLSearchParams(undefined)).toBe(false);
    expect(isURLSearchParams(null)).toBe(false);
    expect(isURLSearchParams(true)).toBe(false);
    expect(isURLSearchParams(false)).toBe(false);
    expect(isURLSearchParams(0)).toBe(false);
    expect(isURLSearchParams(123)).toBe(false);
    expect(isURLSearchParams(NaN)).toBe(false);
    expect(isURLSearchParams(Infinity)).toBe(false);
    expect(isURLSearchParams("")).toBe(false);
    expect(isURLSearchParams("foo=bar")).toBe(false);
    expect(isURLSearchParams(Symbol("params"))).toBe(false);
    expect(isURLSearchParams(BigInt(123))).toBe(false);

    // 普通对象和数组
    expect(isURLSearchParams({})).toBe(false);
    expect(isURLSearchParams({ foo: "bar" })).toBe(false);
    expect(isURLSearchParams([])).toBe(false);
    expect(isURLSearchParams([1, 2, 3])).toBe(false);

    // 其他内置对象
    expect(isURLSearchParams(new Date())).toBe(false);
    expect(isURLSearchParams(Math)).toBe(false);
    expect(isURLSearchParams(JSON)).toBe(false);
    expect(isURLSearchParams(new RegExp(""))).toBe(false);
    expect(isURLSearchParams(new Error())).toBe(false);
    expect(isURLSearchParams(Promise.resolve())).toBe(false);
    expect(isURLSearchParams(new Map())).toBe(false);
    expect(isURLSearchParams(new Set())).toBe(false);
    expect(isURLSearchParams(new ArrayBuffer(1))).toBe(false);
    expect(isURLSearchParams(new DataView(new ArrayBuffer(1)))).toBe(false);
    expect(isURLSearchParams(new Int8Array(1))).toBe(false); // TypedArray

    // 函数
    expect(isURLSearchParams(() => {})).toBe(false);
    expect(isURLSearchParams(async () => {})).toBe(false);
    expect(isURLSearchParams(function *() {})).toBe(false);

    // 其他 DOM 对象 (如果环境支持)
    if (typeof globalThis.URL !== "undefined") {
      expect(isURLSearchParams(new globalThis.URL("https://example.com"))).toBe(false);
    }
  });

  it("应该能正确区分 URLSearchParams 和其他相似对象", () => {
    // 创建一个模拟对象，拥有 URLSearchParams 的一些方法和属性
    const fakeSearchParamsLikeObject = {
      append: () => {},
      delete: () => {},
      get: () => "",
      getAll: () => [],
      has: () => false,
      set: () => {},
      sort: () => {},
      toString: () => "",
      forEach: () => {},
      // 即使拥有所有 URLSearchParams 的方法，其原型字符串也不会匹配
    };
    expect(isURLSearchParams(fakeSearchParamsLikeObject)).toBe(false);
  });

  it("应该正确缩小类型", () => {
    const maybeParams: unknown = new URLSearchParams("key=value");

    if (isURLSearchParams(maybeParams)) {
      // 在此 if 块内，TypeScript 应该将 maybeParams 的类型识别为 URLSearchParams
      // 这允许我们安全地访问其特有方法
      expect(() => {
        // 正确调用 URLSearchParams 的方法
        const value = maybeParams.get("key");
        const hasKey = maybeParams.has("key");
        // 访问这些属性和方法不应导致 TypeScript 类型错误
        expect(value).toBe("value");
        expect(hasKey).toBe(true);
      }).not.toThrow();
    }
  });

  it("对于继承自 URLSearchParams 的子类实例也应返回 true", () => {
    // 定义一个继承自 URLSearchParams 的子类
    class CustomSearchParams extends URLSearchParams {
      customMethod () {
        return "custom";
      }
    }

    const customParams = new CustomSearchParams("a=b");

    // 子类实例的原型字符串仍然是 "[object URLSearchParams]"
    expect(isURLSearchParams(customParams)).toBe(true);
  });
});
