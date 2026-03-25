import { describe, it, expect } from "vitest";
import { isFunction, isAsyncFunction, isGeneratorFunction, isAsyncGeneratorFunction } from "./isFunction";

describe("isFunction", () => {
  it("should return true for all function types", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
    expect(isFunction(function *() {})).toBe(true);
    expect(isFunction(async function *() {})).toBe(true);
    // 构造函数
    expect(isFunction(class {})).toBe(true);
    // 内置函数
    expect(isFunction(Date)).toBe(true);
    expect(isFunction(Array.isArray)).toBe(true);
    expect(isFunction(console.log)).toBe(true);
  });

  it("should return false for non-function types", () => {
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(false)).toBe(false);
    expect(isFunction(0)).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction(NaN)).toBe(false);
    expect(isFunction(Infinity)).toBe(false);
    expect(isFunction("")).toBe(false);
    expect(isFunction("function")).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction(Symbol("a"))).toBe(false);
    expect(isFunction(BigInt(123))).toBe(false);
  });
});

describe("isAsyncFunction", () => {
  it("should return true only for async functions", () => {
    expect(isAsyncFunction(async () => {})).toBe(true);
    expect(isAsyncFunction(async () => {})).toBe(true);
    expect(isAsyncFunction(async function *() {})).toBe(true); // AsyncGeneratorFunction 也是 AsyncFunction
  });

  it("should return false for non-async functions", () => {
    expect(isAsyncFunction(() => {})).toBe(false);
    expect(isFunction(() => {})).toBe(true); // isFunction 为 true
    expect(isAsyncFunction(() => {})).toBe(false); // isAsyncFunction 为 false
    expect(isAsyncFunction(function *() {})).toBe(false);
    expect(isAsyncFunction(class {})).toBe(false);
    expect(isAsyncFunction(Date)).toBe(false);
    expect(isAsyncFunction(undefined)).toBe(false);
    expect(isAsyncFunction({})).toBe(false);
  });
});

describe("isGeneratorFunction", () => {
  it("should return true only for generator functions", () => {
    expect(isGeneratorFunction(function *() {})).toBe(true);
    expect(isGeneratorFunction(function *namedGenFn () {})).toBe(true);
  });

  it("should return false for non-generator functions", () => {
    expect(isGeneratorFunction(() => {})).toBe(false);
    expect(isGeneratorFunction(async () => {})).toBe(false);
    expect(isGeneratorFunction(async function *() {})).toBe(false); // AsyncGeneratorFunction 不是 GeneratorFunction
    expect(isGeneratorFunction(class {})).toBe(false);
    expect(isGeneratorFunction(Date)).toBe(false);
    expect(isGeneratorFunction(undefined)).toBe(false);
    expect(isGeneratorFunction({})).toBe(false);
  });
});

describe("isAsyncGeneratorFunction", () => {
  it("should return true only for async generator functions", () => {
    expect(isAsyncGeneratorFunction(async function *() {})).toBe(true);
    expect(isAsyncGeneratorFunction(async function *namedAsyncGenFn () {})).toBe(true);
  });

  it("should return false for non-async generator functions", () => {
    expect(isAsyncGeneratorFunction(() => {})).toBe(false);
    expect(isAsyncGeneratorFunction(async () => {})).toBe(false);
    expect(isAsyncGeneratorFunction(function *() {})).toBe(false);
    expect(isAsyncGeneratorFunction(class {})).toBe(false);
    expect(isAsyncGeneratorFunction(Date)).toBe(false);
    expect(isAsyncGeneratorFunction(undefined)).toBe(false);
    expect(isAsyncGeneratorFunction({})).toBe(false);
  });
});
