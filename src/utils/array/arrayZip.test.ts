import { describe, expect, it } from "vitest";
import { arrayUnzip, arrayZip } from "./arrayZip";

describe("arrayZip", () => {
  it("应该压缩多个数组", () => {
    const res = arrayZip([1, 2], ["a", "b"]);
    expect(res).toEqual([[1, "a"], [2, "b"]]);
  });

  it("应该处理长度不一致的数组 (以最长为准)", () => {
    const res = arrayZip([1, 2, 3], ["a"]);
    // 注意：arrayZip 内部调用 arrayUnzip，arrayUnzip 逻辑是：
    // const out = new Array(arrays.reduce((max, arr) => Math.max(max, arr.length), 0));
    // 然后 let index < out.length
    // out[index] = Array.from(arrays, get) -> 如果 index 超出某个数组长度，get 返回 undefined
    expect(res).toEqual([[1, "a"], [2, undefined], [3, undefined]]);
  });

  it("arrayUnzip 应该解压数组", () => {
    const zipped = [[1, "a"], [2, "b"]];
    const unzipped = arrayUnzip(zipped);
    expect(unzipped).toEqual([[1, 2], ["a", "b"]]);
  });

  it("arrayZip 输入非数组/空通过 arrayUnzip 处理返回空", () => {
    expect(arrayZip()).toEqual([]);
  });
});
