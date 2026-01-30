import { describe, expect, it } from "vitest";
import { arrayFirst } from "./arrayFirst";

describe("arrayFirst", () => {
  it("应该返回数组第一项", () => {
    expect(arrayFirst([1, 2, 3])).toBe(1);
  });

  it("数组为空时应该返回 undefined (不提供 saveValue)", () => {
    // eslint-disable-next-line
    expect(arrayFirst([])).toBeUndefined();
  });

  it("数组为空时应该返回 saveValue", () => {
    expect(arrayFirst([], 100)).toBe(100);
  });

  it("如果输入不是数组应该返回 saveValue", () => {
    // @ts-expect-error 测试非法参数
    expect(arrayFirst(null, 100)).toBe(100);
  });
});
