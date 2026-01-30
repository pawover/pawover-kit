import { describe, expect, it } from "vitest";
import { isWithinInterval } from "./isWithinInterval";

describe("isWithinInterval", () => {
  it("应该正确判断区间", () => {
    expect(isWithinInterval(5, [0, 10])).toBe(true);
    expect(isWithinInterval(15, [0, 10])).toBe(false);
  });

  it("应该处理边界包含选项", () => {
    // 默认: [left, right) -> includeLeft=true, includeRight=false
    expect(isWithinInterval(0, [0, 10])).toBe(true);
    expect(isWithinInterval(10, [0, 10])).toBe(false);

    // (left, right]
    expect(isWithinInterval(0, [0, 10], false, true)).toBe(false);
    expect(isWithinInterval(10, [0, 10], false, true)).toBe(true);

    // [left, right]
    expect(isWithinInterval(0, [0, 10], true, true)).toBe(true);
    expect(isWithinInterval(10, [0, 10], true, true)).toBe(true);

    // (left, right)
    expect(isWithinInterval(0, [0, 10], false, false)).toBe(false);
    expect(isWithinInterval(10, [0, 10], false, false)).toBe(false);
  });

  it("如果输入无效应该抛出错误", () => {
    // @ts-expect-error test
    expect(() => isWithinInterval("a", [0, 10])).toThrow();
    expect(() => isWithinInterval(Infinity, [0, 10])).toThrow();
  });

  it("如果区间无效应该抛出错误", () => {
    expect(() => isWithinInterval(5, [10, 0])).toThrow();
  });
});
