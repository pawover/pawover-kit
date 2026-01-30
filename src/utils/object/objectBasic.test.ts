import { describe, expect, it } from "vitest";
import { objectEntries } from "./objectEntries";
import { objectKeys } from "./objectKeys";
import { objectValues } from "./objectValues";

describe("objectKeys", () => {
  it("应该返回对象的键", () => {
    expect(objectKeys({ a: 1, b: 2 })).toEqual(["a", "b"]);
  });

  it("应该处理数组 (返回索引)", () => {
    expect(objectKeys(["a", "b"])).toEqual(["0", "1"]);
  });
});

describe("objectValues", () => {
  it("应该返回对象的值", () => {
    expect(objectValues({ a: 1, b: 2 })).toEqual([1, 2]);
  });

  it("应该处理数组", () => {
    expect(objectValues(["a", "b"])).toEqual(["a", "b"]);
  });
});

describe("objectEntries", () => {
  it("应该返回键值对数组", () => {
    expect(objectEntries({ a: 1, b: 2 })).toEqual([["a", 1], ["b", 2]]);
  });

  it("应该处理数组", () => {
    expect(objectEntries(["a", "b"])).toEqual([["0", "a"], ["1", "b"]]);
  });
});
