import { describe, expect, it } from "vitest";
import { cloneDeep } from "./cloneDeep";

describe("cloneDeep", () => {
  it("应该深度拷贝对象", () => {
    const obj = { a: 1, b: { c: 2 } };
    const clone = cloneDeep(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
    expect(clone.b).not.toBe(obj.b);
  });

  it("应该处理数组", () => {
    const arr = [1, { a: 2 }];
    const clone = cloneDeep(arr);
    expect(clone).toEqual(arr);
    expect(clone[1]).not.toBe(arr[1]);
  });

  it("应该处理循环引用", () => {
    // eslint-disable-next-line
    const obj: any = { a: 1 };
    obj.self = obj;
    const clone = cloneDeep(obj);
    expect(clone.self).toBe(clone);
    expect(clone.self).not.toBe(obj);
  });

  it("应该处理 Map 和 Set", () => {
    const map = new Map([["a", { val: 1 }]]);
    const set = new Set([{ val: 2 }]);
    const obj = { map, set };

    const clone = cloneDeep(obj);
    expect(clone.map.get("a")).not.toBe(map.get("a"));
    expect(clone.map.get("a")).toEqual({ val: 1 });
    // Set verify
    const iter = clone.set.values();
    const val = iter.next().value;
    expect(val).toEqual({ val: 2 });
    expect(set.has(val!)).toBe(false); // different reference
  });

  // Date test - expecting potential failure based on analysis
  it("应该正确处理 Date 对象", () => {
    const date = new Date("2020-01-01");
    const obj = { date };
    const clone = cloneDeep(obj);

    expect(clone.date).toBeInstanceOf(Date);
    expect(clone.date.getTime()).toBe(date.getTime());
    expect(clone.date).not.toBe(date);
  });
});
