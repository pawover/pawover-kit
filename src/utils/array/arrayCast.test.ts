import { describe, expect, it } from "vitest";
import { arrayCast } from "./arrayCast";

describe("arrayCast", () => {
  it("应该将单个元素转换为数组", () => {
    expect(arrayCast(1)).toEqual([1]);
    expect(arrayCast("a")).toEqual(["a"]);
    expect(arrayCast({ a: 1 })).toEqual([{ a: 1 }]);
  });

  it("应该保持数组不变", () => {
    expect(arrayCast([1, 2])).toEqual([1, 2]);
    expect(arrayCast(["a", "b"])).toEqual(["a", "b"]);
  });

  it("应该处理 undefined 和 null (checkEmpty=true)", () => {
    expect(arrayCast(undefined)).toEqual([]);
    expect(arrayCast(null)).toEqual([]);
    expect(arrayCast(undefined, true)).toEqual([]);
    expect(arrayCast(null, true)).toEqual([]);
  });

  it("应该处理 undefined 和 null (checkEmpty=false)", () => {
    expect(arrayCast(undefined, false)).toEqual([undefined]);
    expect(arrayCast(null, false)).toEqual([null]);
  });

  it("应该处理空数组", () => {
    expect(arrayCast([])).toEqual([]);
  });
});
