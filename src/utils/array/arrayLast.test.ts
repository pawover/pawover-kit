import { describe, expect, it } from "vitest";
import { arrayLast } from "./arrayLast";

describe("arrayLast", () => {
  it("应该返回数组最后一项", () => {
    expect(arrayLast([1, 2, 3])).toBe(3);
  });

  it("数组为空时应该返回 undefined (不提供 saveValue)", () => {
    // eslint-disable-next-line
    expect(arrayLast([])).toBeUndefined();
  });

  it("数组为空时应该返回 saveValue", () => {
    expect(arrayLast([], 100)).toBe(100);
  });

  it("如果输入不是数组应该返回 saveValue", () => {
    // @ts-expect-error 测试非法参数
    expect(arrayLast(null, 99)).toBe(99);
  });
});
