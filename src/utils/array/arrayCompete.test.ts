import { describe, expect, it } from "vitest";
import { arrayCompete } from "./arrayCompete";

describe("arrayCompete", () => {
  it("应该返回获胜的元素", () => {
    const list = [1, 10, 5];
    expect(arrayCompete(list, (a, b) => (a > b ? a : b))).toBe(10);
    expect(arrayCompete(list, (a, b) => (a < b ? a : b))).toBe(1);
  });

  it("应该处理对象数组", () => {
    const list = [{ val: 1 }, { val: 10 }, { val: 5 }];
    expect(arrayCompete(list, (a, b) => (a.val > b.val ? a : b))).toEqual({ val: 10 });
  });

  it("如果是空数组，应返回 null", () => {
    expect(arrayCompete([], (a, _) => a)).toBeNull();
  });

  it("参数无效时应返回 null", () => {
    // @ts-expect-error 测试非法参数
    expect(arrayCompete(null, (a, b) => a)).toBeNull();
    // @ts-expect-error 测试非法参数
    expect(arrayCompete([1], null)).toBeNull();
  });
});
