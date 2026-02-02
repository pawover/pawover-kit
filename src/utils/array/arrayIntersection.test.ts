import { describe, expect, it } from "vitest";
import { arrayIntersection } from "./arrayIntersection";

describe("arrayIntersection", () => {
  it("应该返回基础类型的交集", () => {
    expect(arrayIntersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  it("应该返回对象的交集 (使用 match 函数)", () => {
    const list1 = [{ id: 1 }, { id: 2 }];
    const list2 = [{ id: 2 }, { id: 3 }];
    expect(arrayIntersection(list1, list2, (x) => x.id)).toEqual([{ id: 2 }]);
  });

  it("应该返回对象的交集 (使用 match 函数，保留重复元素)", () => {
    const list1 = [{ id: 1 }, { id: 2 }, { id: 2 }];
    const list2 = [{ id: 2 }, { id: 3 }];
    expect(arrayIntersection(list1, list2, (x) => x.id)).toEqual([{ id: 2 }, { id: 2 }]);
  });

  it("没有 match 函数时使用 Set 比较", () => {
    expect(arrayIntersection([1, 2], [2, 3])).toEqual([2]);
  });

  it("如果任一数组为空，应返回空数组 (修正逻辑后)", () => {
    expect(arrayIntersection([], [1, 2])).toEqual([]);
    expect(arrayIntersection([1, 2], [])).toEqual([]);
    expect(arrayIntersection([], [])).toEqual([]);
  });

  it("如果非数组输入，应返回空数组", () => {
    // @ts-expect-error 测试非法参数
    expect(arrayIntersection(null, [1])).toEqual([]);
  });
});
