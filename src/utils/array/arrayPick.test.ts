import { describe, expect, it } from "vitest";
import { arrayPick } from "./arrayPick";

describe("arrayPick", () => {
  it("仅 filter", () => {
    const list = [1, 2, 3, 4];
    expect(arrayPick(list, (n) => n % 2 === 0)).toEqual([2, 4]);
  });

  it("filter 和 map", () => {
    const list = [1, 2, 3, 4];
    expect(arrayPick(list, (n) => n % 2 === 0, (n) => n * 2)).toEqual([4, 8]);
  });

  it("如果输入不是数组应返回空数组", () => {
    // @ts-expect-error 测试非法参数
    expect(arrayPick(null, () => true)).toEqual([]);
  });

  it("如果 filter 不是函数应返回原数组", () => {
    const list = [1, 2];
    // @ts-expect-error 测试非法参数
    expect(arrayPick(list, null)).toEqual(list);
  });
});
