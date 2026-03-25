/* eslint-disable no-loss-of-precision */
import { describe, it, expect } from "vitest";
import { isNumber, isNaN, isInteger, isPositiveInteger, isNegativeInteger, isInfinity, isInfinityLike } from "./isNumber";

describe("isNumber", () => {
  it("在不排斥 NaN 的情况下 (NaNCheck=false)，应返回所有 number 类型的值为 true", () => {
    expect(isNumber(0, false)).toBe(true);
    expect(isNumber(-0, false)).toBe(true);
    expect(isNumber(1, false)).toBe(true);
    expect(isNumber(3.14, false)).toBe(true);
    expect(isNumber(-42.5, false)).toBe(true);
    expect(isNumber(Infinity, false)).toBe(true);
    expect(isNumber(-Infinity, false)).toBe(true);
    expect(isNumber(NaN, false)).toBe(true);
  });

  it("在排斥 NaN 的情况下 (NaNCheck=true, 默认值)，应返回 NaN 为 false", () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-0)).toBe(true);
    expect(isNumber(1)).toBe(true);
    expect(isNumber(3.14)).toBe(true);
    expect(isNumber(-42.5)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
    expect(isNumber(NaN)).toBe(false); // NaN 被排除
  });

  it("应该在传入非 number 类型时返回 false", () => {
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber("123")).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber(() => {})).toBe(false);
    expect(isNumber(Symbol("a"))).toBe(false);
    expect(isNumber(BigInt(123))).toBe(false);
  });
});

describe("isNaN", () => {
  it("应该仅在传入 NaN 时返回 true", () => {
    expect(isNaN(NaN)).toBe(true);
    // 全局 isNaN 会尝试转换，但 Number.isNaN 不会
    expect(isNaN(Number("abc"))).toBe(true);
  });

  it("应该在传入非 NaN 的值时返回 false", () => {
    expect(isNaN(undefined)).toBe(false);
    expect(isNaN(null)).toBe(false);
    expect(isNaN(true)).toBe(false);
    expect(isNaN(false)).toBe(false);
    expect(isNaN(0)).toBe(false);
    expect(isNaN(123)).toBe(false);
    expect(isNaN(Infinity)).toBe(false);
    expect(isNaN(-Infinity)).toBe(false);
    expect(isNaN("NaN")).toBe(false); // 字符串 'NaN' 不是 NaN 值
    expect(isNaN({})).toBe(false);
    expect(isNaN([])).toBe(false);
  });
});

describe("isInteger", () => {
  it("在不检查安全数的情况下 (safeCheck=false)，应返回所有整数为 true", () => {
    expect(isInteger(0, false)).toBe(true);
    expect(isInteger(1, false)).toBe(true);
    expect(isInteger(-1, false)).toBe(true);
    expect(isInteger(42, false)).toBe(true);
    expect(isInteger(-42, false)).toBe(true);
    expect(isInteger(9007199254740991, false)).toBe(true); // Number.MAX_SAFE_INTEGER
    expect(isInteger(9007199254740992, false)).toBe(true); // 超出安全整数范围但仍为整数
    expect(isInteger(3.14, false)).toBe(false);
    expect(isInteger(NaN, false)).toBe(false);
    expect(isInteger(Infinity, false)).toBe(false);
  });

  it("在检查安全数的情况下 (safeCheck=true, 默认值)，应返回超出安全范围的整数为 false", () => {
    expect(isInteger(0)).toBe(true);
    expect(isInteger(1)).toBe(true);
    expect(isInteger(-1)).toBe(true);
    expect(isInteger(42)).toBe(true);
    expect(isInteger(-42)).toBe(true);
    expect(isInteger(9007199254740991)).toBe(true); // Number.MAX_SAFE_INTEGER
    expect(isInteger(9007199254740992)).toBe(false); // 超出安全整数范围
    expect(isInteger(9007199254740993)).toBe(false); // 超出安全整数范围
    expect(isInteger(3.14)).toBe(false);
    expect(isInteger(NaN)).toBe(false);
    expect(isInteger(Infinity)).toBe(false);
  });

  it("应该在传入非 number 类型时返回 false", () => {
    expect(isInteger(undefined)).toBe(false);
    expect(isInteger(null)).toBe(false);
    expect(isInteger(true)).toBe(false);
    expect(isInteger("123")).toBe(false);
    expect(isInteger({})).toBe(false);
  });
});

describe("isPositiveInteger", () => {
  it("应该仅在传入正整数时返回 true", () => {
    expect(isPositiveInteger(1)).toBe(true);
    expect(isPositiveInteger(42)).toBe(true);
    expect(isPositiveInteger(9007199254740991)).toBe(true); // 最大安全正整数
  });

  it("应该在传入非正整数时返回 false", () => {
    expect(isPositiveInteger(0)).toBe(false); // 0 不是正整数
    expect(isPositiveInteger(-1)).toBe(false); // 负数
    expect(isPositiveInteger(1.5)).toBe(false); // 小数
    expect(isPositiveInteger(NaN)).toBe(false);
    expect(isPositiveInteger(Infinity)).toBe(false);
    expect(isPositiveInteger(-Infinity)).toBe(false);
    expect(isPositiveInteger(9007199254740992)).toBe(false); // 超出安全范围
    expect(isPositiveInteger(9007199254740992, false)).toBe(true); // 在不检查安全数时为 true
    expect(isPositiveInteger(undefined)).toBe(false);
    expect(isPositiveInteger("123")).toBe(false);
  });
});

describe("isNegativeInteger", () => {
  it("应该仅在传入负整数时返回 true", () => {
    expect(isNegativeInteger(-1)).toBe(true);
    expect(isNegativeInteger(-42)).toBe(true);
    expect(isNegativeInteger(-9007199254740991)).toBe(true); // 最小安全负整数
  });

  it("应该在传入非负整数时返回 false", () => {
    expect(isNegativeInteger(0)).toBe(false); // 0 不是负整数
    expect(isNegativeInteger(1)).toBe(false); // 正数
    expect(isNegativeInteger(-1.5)).toBe(false); // 小数
    expect(isNegativeInteger(NaN)).toBe(false);
    expect(isNegativeInteger(Infinity)).toBe(false);
    expect(isNegativeInteger(-Infinity)).toBe(false);
    expect(isNegativeInteger(-9007199254740992)).toBe(false); // 超出安全范围
    expect(isNegativeInteger(-9007199254740992, false)).toBe(true); // 在不检查安全数时为 true
    expect(isNegativeInteger(undefined)).toBe(false);
    expect(isNegativeInteger("123")).toBe(false);
  });
});

describe("isInfinity", () => {
  it("应该仅在传入 Infinity 或 -Infinity 时返回 true", () => {
    expect(isInfinity(Infinity)).toBe(true);
    expect(isInfinity(-Infinity)).toBe(true);
  });

  it("应该在传入非无穷大值时返回 false", () => {
    expect(isInfinity(0)).toBe(false);
    expect(isInfinity(1)).toBe(false);
    expect(isInfinity(-1)).toBe(false);
    expect(isInfinity(1.79e308)).toBe(false); // 这会导致 Infinity，但本身不是 Infinity 常量
    expect(isInfinity(Number.MAX_VALUE * 2)).toBe(false); // 这也会变成 Infinity，但比较的是原始值
    expect(isInfinity(NaN)).toBe(false);
    expect(isInfinity("Infinity")).toBe(false); // 字符串 'Infinity' 不是 Infinity 值
    expect(isInfinity(undefined)).toBe(false);
    expect(isInfinity({})).toBe(false);
  });
});

describe("isInfinityLike", () => {
  it("应该在传入数字 Infinity 或 -Infinity 时返回 true", () => {
    expect(isInfinityLike(Infinity)).toBe(true);
    expect(isInfinityLike(-Infinity)).toBe(true);
  });

  it("应该在传入表示无穷大的字符串时返回 true", () => {
    expect(isInfinityLike("Infinity")).toBe(true);
    expect(isInfinityLike("-Infinity")).toBe(true);
    expect(isInfinityLike("+Infinity")).toBe(true);
    expect(isInfinityLike(" infinity ")).toBe(true); // 忽略空格
    expect(isInfinityLike(" +INFINITY ")).toBe(true); // 忽略大小写
    expect(isInfinityLike(" -INFINITY ")).toBe(true); // 忽略大小写
  });

  it("应该在传入其他值时返回 false", () => {
    expect(isInfinityLike(0)).toBe(false);
    expect(isInfinityLike(1)).toBe(false);
    expect(isInfinityLike(NaN)).toBe(false);
    expect(isInfinityLike("infinity123")).toBe(false);
    expect(isInfinityLike("inf")).toBe(false);
    expect(isInfinityLike("")).toBe(false);
    expect(isInfinityLike("  ")).toBe(false);
    expect(isInfinityLike(undefined)).toBe(false);
    expect(isInfinityLike(null)).toBe(false);
    expect(isInfinityLike({})).toBe(false);
    expect(isInfinityLike([])).toBe(false);
    expect(isInfinityLike(() => {})).toBe(false);
  });
});
