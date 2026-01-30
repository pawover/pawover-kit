import { describe, expect, it } from "vitest";
import { mapEntries } from "./mapEntries";

describe("mapEntries", () => {
  it("应该映射对象的键和值", () => {
    const obj = { a: 1, b: 2 };
    const result = mapEntries(obj, (k, v) => [k, v * 2]);
    expect(result).toEqual({ a: 2, b: 4 });
  });

  it("应该允许修改键名", () => {
    const obj = { a: 1 };
    const result = mapEntries(obj, (k, v) => [`new_${k}`, v]);
    expect(result).toEqual({ new_a: 1 });
  });

  it("处理空对象或无效输入", () => {
    // @ts-expect-error test null
    expect(mapEntries(null, (k, v) => [k, v])).toEqual({});
    expect(mapEntries({}, (k, v) => [k, v])).toEqual({});
  });
});
