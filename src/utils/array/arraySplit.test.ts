import { describe, expect, it } from "vitest";
import { arraySplit } from "./arraySplit";

describe("arraySplit", () => {
  it("应该按指定大小切分数组", () => {
    expect(arraySplit([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("使用默认大小 (10)", () => {
    const list = Array.from({ length: 25 }, (_, i) => i);
    const split = arraySplit(list);
    expect(split.length).toBe(3); // 10, 10, 5
    expect(split[0]!.length).toBe(10);
    expect(split[2]!.length).toBe(5);
  });

  it("如果输入非数组应返回空数组", () => {
    // @ts-expect-error 测试非法参数
    expect(arraySplit(null)).toEqual([]);
  });
});
