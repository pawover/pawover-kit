import { describe, expect, it } from "vitest";
import { arrayFork } from "./arrayFork";

describe("arrayFork", () => {
  it("应该正确分离数组", () => {
    const list = [1, 2, 3, 4, 5];
    const [evens, odds] = arrayFork(list, (n) => n % 2 === 0);
    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([1, 3, 5]);
  });

  it("全部满足条件", () => {
    const list = [2, 4];
    const [evens, odds] = arrayFork(list, (n) => n % 2 === 0);
    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([]);
  });

  it("全部不满足条件", () => {
    const list = [1, 3];
    const [evens, odds] = arrayFork(list, (n) => n % 2 === 0);
    expect(evens).toEqual([]);
    expect(odds).toEqual([1, 3]);
  });

  it("输入非数组应该返回空元组", () => {
    // @ts-expect-error 测试非法参数
    expect(arrayFork(null, (n) => true)).toEqual([[], []]);
  });
});
