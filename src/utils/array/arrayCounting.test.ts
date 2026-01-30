import { describe, expect, it } from "vitest";
import { arrayCounting } from "./arrayCounting";

describe("arrayCounting", () => {
  it("应该统计基础类型出现次数", () => {
    const list = ["a", "b", "a", "c"];
    expect(arrayCounting(list, (x) => x)).toEqual({ a: 2, b: 1, c: 1 });
  });

  it("应该统计对象属性出现次数", () => {
    const users = [{ id: 1, group: "A" }, { id: 2, group: "B" }, { id: 3, group: "A" }];
    expect(arrayCounting(users, (u) => u.group)).toEqual({ A: 2, B: 1 });
  });

  it("应该处理空数组", () => {
    expect(arrayCounting([], (x) => x)).toEqual({});
  });

  it("参数无效时应返回空对象", () => {
    // @ts-expect-error 测试非法参数
    expect(arrayCounting(null, (x) => x)).toEqual({});
    // @ts-expect-error 测试非法参数
    expect(arrayCounting([], null)).toEqual({});
  });
});
