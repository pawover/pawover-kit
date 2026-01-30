import { describe, expect, it } from "vitest";
import { objectAssign } from "./objectAssign";

describe("objectAssign", () => {
  it("应该合并两个对象", () => {
    const initial = { a: 1 };
    const override = { b: 2 };
    const result = objectAssign(initial, override);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("应该递归合并", () => {
    const initial = { a: { x: 1, y: 1 } };
    const override = { a: { y: 2, z: 2 } };
    const result = objectAssign(initial, override);
    expect(result).toEqual({ a: { x: 1, y: 2, z: 2 } });
  });

  it("应该覆盖基本类型", () => {
    const initial = { a: 1 };
    const override = { a: { b: 2 } };
    const result = objectAssign(initial, override);
    expect(result).toEqual({ a: { b: 2 } });
  });

  it("处理非对象输入", () => {
    // @ts-expect-error test null
    expect(objectAssign(null, { a: 1 })).toEqual({ a: 1 });
    // @ts-expect-error test null
    expect(objectAssign({ a: 1 }, null)).toEqual({ a: 1 });
  });
});
