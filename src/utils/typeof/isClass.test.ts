import { describe, it, expect } from "vitest";
import { isClass } from "./isClass";

// 定义一些测试用的类和函数
class ValidClass {}
class ClassWithConstructor {
  constructor (public name: string) {}
}
const ClassAssignedToVar = class {};
async function asyncFunction () {}

function regularFunction () {}

function arrowFunction () {}

// 模拟一个不可构造的函数
const nonConstructableFunction = Object.defineProperty(() => {}, "prototype", {
  value: undefined,
  writable: false,
  configurable: false,
});

// 模拟一个构造时会抛出错误的函数
function ThrowingConstructor () {
  throw new Error("Cannot construct");
}
ThrowingConstructor.prototype = {};

describe("isClass", () => {
  it("should return true for standard classes", () => {
    expect(isClass(ValidClass)).toBe(true);
    expect(isClass(ClassWithConstructor)).toBe(true);
    expect(isClass(ClassAssignedToVar)).toBe(true);
  });

  it("should return false for non-functions", () => {
    expect(isClass(undefined)).toBe(false);
    expect(isClass(null)).toBe(false);
    expect(isClass(true)).toBe(false);
    expect(isClass(false)).toBe(false);
    expect(isClass(0)).toBe(false);
    expect(isClass(1)).toBe(false);
    expect(isClass(NaN)).toBe(false);
    expect(isClass(Infinity)).toBe(false);
    expect(isClass("")).toBe(false);
    expect(isClass("class")).toBe(false);
    expect(isClass({})).toBe(false);
    expect(isClass([])).toBe(false);
    expect(isClass(Symbol("a"))).toBe(false);
    expect(isClass(BigInt(123))).toBe(false);
  });

  it("should return false for functions that are not classes", () => {
    expect(isClass(regularFunction)).toBe(false);
    expect(isClass(arrowFunction)).toBe(false);
    // An anonymous function assigned to a variable should still be detected as a function, not a class
    const funcAssignedToVar = function () {};
    expect(isClass(funcAssignedToVar)).toBe(false);
  });

  it("should return false for async functions", () => {
    expect(isClass(asyncFunction)).toBe(false);
  });

  it("should return false for functions that cannot be constructed", () => {
    expect(isClass(nonConstructableFunction)).toBe(false);
    expect(isClass(ThrowingConstructor)).toBe(false);
  });
});
