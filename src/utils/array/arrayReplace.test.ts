import { describe, expect, it } from "vitest";
import { arrayReplace } from "./arrayReplace";

describe("arrayReplace", () => {
  it("应该替换第一个匹配项", () => {
    expect(arrayReplace([1, 2, 2, 3], 4, (n) => n === 2)).toEqual([1, 4, 2, 3]);
  });

  it("如果没有匹配项不应替换", () => {
    expect(arrayReplace([1, 2, 3], 4, (n) => n === 5)).toEqual([1, 2, 3]);
  });

  it("应该处理空数组", () => {
    // @ts-expect-error 测试非法参数
    expect(arrayReplace(null, 1, () => true)).toEqual([]);
  });

  it("如果 match 不是函数或 newItem 是 undefined，应返回原数组副本", () => {
    const list = [1, 2];
    // @ts-expect-error 测试非法参数
    expect(arrayReplace(list, 3, null)).toEqual(list);
    expect(arrayReplace(list, undefined, () => true)).toEqual(list);
  });
});
