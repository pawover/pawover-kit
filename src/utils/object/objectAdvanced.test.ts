import { describe, expect, it } from "vitest";
import { objectCrush } from "./objectCrush";
import { objectInvert } from "./objectInvert";
import { objectOmit } from "./objectOmit";
import { objectPick } from "./objectPick";

describe("objectCrush", () => {
  it("应该压平嵌套对象", () => {
    const obj = { a: { b: 1, c: { d: 2 } } };
    expect(objectCrush(obj)).toEqual({ "a.b": 1, "a.c.d": 2 });
  });

  it("应该处理数组", () => {
    const obj = { a: [1, 2] };
    // Depending on implementation, arrays might be treated as objects with indices or plain values
    // Looking at global objectCrush impl: keys are combined.
    // If array items are primitive, it might be path.0: 1
    // Let's verify behavior. Based on code:
    // for (const [prop, propValue] of Object.entries(value))
    expect(objectCrush(obj)).toEqual({ "a.0": 1, "a.1": 2 });
  });

  it("处理空输入", () => {
    // @ts-expect-error test
    expect(objectCrush(null)).toEqual({});
  });
});

describe("objectInvert", () => {
  it("应该反转键值", () => {
    const obj = { a: "1", b: "2" };
    expect(objectInvert(obj)).toEqual({ 1: "a", 2: "b" });
  });

  it("应该支持数字值", () => {
    const obj = { a: 1 };
    expect(objectInvert(obj)).toEqual({ 1: "a" });
  });

  it("处理非对象输入", () => {
    // @ts-expect-error test
    expect(objectInvert(null)).toEqual({});
  });
});

describe("objectOmit", () => {
  it("应该排除指定属性", () => {
    expect(objectOmit({ a: 1, b: 2 }, ["a"])).toEqual({ b: 2 });
  });

  it("键不存在时不应报错", () => {
    // @ts-expect-error test keys
    expect(objectOmit({ a: 1 }, ["b"])).toEqual({ a: 1 });
  });

  it("处理无效输入", () => {
    // @ts-expect-error test
    expect(objectOmit(null, [])).toEqual({});
  });
});

describe("objectPick", () => {
  it("应该选取指定属性", () => {
    expect(objectPick({ a: 1, b: 2 }, ["a"])).toEqual({ a: 1 });
  });

  it("忽略不存在的键", () => {
    // @ts-expect-error test keys
    expect(objectPick({ a: 1 }, ["b"])).toEqual({});
  });

  it("处理无效输入", () => {
    // eslint-disable-next-line
    expect(objectPick(null as any, [])).toEqual({});
  });
});
