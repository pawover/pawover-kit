import { describe, expect, it } from "vitest";
import { arrayMerge } from "./arrayMerge";

describe("arrayMerge", () => {
  it("没有 match 函数时应合并并去重", () => {
    expect(arrayMerge([1, 2], [2, 3])).toEqual([1, 2, 3]);
  });

  it("有 match 函数时应更新 initialList 中的匹配项", () => {
    const source = [{ id: 1, val: "a" }, { id: 2, val: "b" }];
    const update = [{ id: 2, val: "new" }, { id: 3, val: "c" }];
    const result = arrayMerge(source, update, (x) => x.id);

    // 验证：id:2 被更新，id:3 未添加
    expect(result).toEqual([{ id: 1, val: "a" }, { id: 2, val: "new" }]);
  });

  it("InitialList 不是数组时应返回空数组", () => {
    // @ts-expect-error 测试非法参数
    expect(arrayMerge(null, [1])).toEqual([]);
  });

  it("MergeList 不是数组时应返回 InitialList", () => {
    // @ts-expect-error 测试非法参数
    expect(arrayMerge([1], null)).toEqual([1]);
  });
});
