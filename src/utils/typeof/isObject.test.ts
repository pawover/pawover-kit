import { describe, it, expect } from "vitest";
import { isObject } from "./isObject";

describe("isObject", () => {
  describe("严格模式 (prototypeCheck = true)", () => {
    it("应该在传入普通对象字面量时返回 true", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1, b: 2 })).toBe(true);
    });

    it("应该在传入非普通对象或原型链不为 Object.prototype 时返回 false", () => {
      // 基础类型
      expect(isObject(undefined)).toBe(false);
      expect(isObject(null)).toBe(false);
      expect(isObject(true)).toBe(false);
      expect(isObject(false)).toBe(false);
      expect(isObject(0)).toBe(false);
      expect(isObject(123)).toBe(false);
      expect(isObject(NaN)).toBe(false);
      expect(isObject(Infinity)).toBe(false);
      expect(isObject("")).toBe(false);
      expect(isObject("string")).toBe(false);
      expect(isObject(Symbol("sym"))).toBe(false);
      expect(isObject(BigInt(123))).toBe(false);

      // 非 Object 类型的原型字符串
      expect(isObject([])).toBe(false); // [object Array]
      expect(isObject(new Date())).toBe(false); // [object Date]
      expect(isObject(Math)).toBe(false); // [object Math]
      expect(isObject(JSON)).toBe(false); // [object JSON]
      expect(isObject(new RegExp(""))).toBe(false); // [object RegExp]
      expect(isObject(new Error())).toBe(false); // [object Error]
      expect(isObject(Promise.resolve())).toBe(false); // [object Promise]
      expect(isObject(new Map())).toBe(false); // [object Map]
      expect(isObject(new Set())).toBe(false); // [object Set]
      expect(isObject(new ArrayBuffer(1))).toBe(false); // [object ArrayBuffer]
      expect(isObject(new Int8Array(1))).toBe(false); // [object Int8Array]

      // 函数
      expect(isObject(() => {})).toBe(false); // [object Function]
      expect(isObject(async () => {})).toBe(false); // [object AsyncFunction]
      expect(isObject(function *() {})).toBe(false); // [object GeneratorFunction]

      // 原型链不为 Object.prototype 的对象
      const objWithCustomProto = Object.create({ a: 1 });
      expect(isObject(objWithCustomProto)).toBe(false);
      expect(isObject(objWithCustomProto, false)).toBe(true);
    });

    it("应该能识别通过 Object.create(null) 创建的对象", () => {
      // Object.create(null) 的对象原型字符串是 [object Object]，
      // 但其原型不是 Object.prototype (而是 null)，所以 isObject 返回 false。
      const nullProtoObj = Object.create(null);
      nullProtoObj.prop = "value";
      expect(isObject(nullProtoObj)).toBe(false);
    });
  });

  describe("宽松模式 (prototypeCheck = false)", () => {
    it("应该在传入任何原型字符串为 [object Object] 的值时返回 true", () => {
      // 普通对象
      expect(isObject({}, false)).toBe(true);
      expect(isObject({ a: 1 }, false)).toBe(true);

      // Object.create(null) 创建的对象
      const nullProtoObj = Object.create(null);
      expect(isObject(nullProtoObj, false)).toBe(true);
    });

    it("应该在传入原型字符串不为 [object Object] 的值时返回 false", () => {
      // 基础类型
      expect(isObject(undefined, false)).toBe(false);
      expect(isObject(null, false)).toBe(false);
      expect(isObject(true, false)).toBe(false);
      expect(isObject(false, false)).toBe(false);
      expect(isObject(0, false)).toBe(false);
      expect(isObject(123, false)).toBe(false);
      expect(isObject(NaN, false)).toBe(false);
      expect(isObject(Infinity, false)).toBe(false);
      expect(isObject("", false)).toBe(false);
      expect(isObject("string", false)).toBe(false);
      expect(isObject(Symbol("sym"), false)).toBe(false);
      expect(isObject(BigInt(123), false)).toBe(false);

      // 非 Object 类型的原型字符串
      expect(isObject([], false)).toBe(false); // [object Array]
      expect(isObject(new Date(), false)).toBe(false); // [object Date]
      expect(isObject(Math, false)).toBe(false); // [object Math]
      expect(isObject(JSON, false)).toBe(false); // [object JSON]
      expect(isObject(new RegExp(""), false)).toBe(false); // [object RegExp]
      expect(isObject(new Error(), false)).toBe(false); // [object Error]
      expect(isObject(Promise.resolve(), false)).toBe(false); // [object Promise]
      expect(isObject(new Map(), false)).toBe(false); // [object Map]
      expect(isObject(new Set(), false)).toBe(false); // [object Set]
      expect(isObject(new ArrayBuffer(1), false)).toBe(false); // [object ArrayBuffer]
      expect(isObject(new Int8Array(1), false)).toBe(false); // [object Int8Array]

      // 函数
      expect(isObject(() => {}, false)).toBe(false); // [object Function]
      expect(isObject(async () => {}, false)).toBe(false); // [object AsyncFunction]
      expect(isObject(function *() {}, false)).toBe(false); // [object GeneratorFunction]
    });
  });

  it("应该正确缩小类型", () => {
    const maybeObj: unknown = { key: "value" };

    if (isObject(maybeObj)) {
      // 在此 if 块内，TypeScript 应该将 maybeObj 的类型识别为 Record<PropertyKey, unknown>
      // 这允许我们安全地访问其属性
      expect(maybeObj.key).toBe("value");
    }
  });
});
