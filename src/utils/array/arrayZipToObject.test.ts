import { describe, expect, it } from "vitest";
import { arrayZipToObject } from "./arrayZipToObject";

describe("arrayZipToObject", () => {
  it("应该将数组压缩为对象", () => {
    expect(arrayZipToObject(["a", "b"], [1, 2])).toEqual({ a: 1, b: 2 });
  });

  it("应该使用函数生成值", () => {
    expect(arrayZipToObject(["a", "b"], (k, i) => k + i)).toEqual({ a: "a0", b: "b1" });
  });

  it("应该使用静态值", () => {
    expect(arrayZipToObject(["a", "b"], 1)).toEqual({ a: 1, b: 1 });
  });

  it("键列表为空应返回空对象", () => {
    expect(arrayZipToObject([], [1])).toEqual({});
  });

  it("值数组长度不足时应为 undefined", () => {
    expect(arrayZipToObject(["a", "b"], [1])).toEqual({ a: 1, b: undefined });
  });
});
