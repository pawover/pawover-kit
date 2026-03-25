import { describe, it, expect } from "vitest";
import { isError } from "./isError";

describe("isError", () => {
  it("should return true for standard Error objects", () => {
    expect(isError(new Error())).toBe(true);
    expect(isError(new TypeError())).toBe(true);
    expect(isError(new ReferenceError())).toBe(true);
    expect(isError(new SyntaxError())).toBe(true);
    expect(isError(new RangeError())).toBe(true);
    expect(isError(new EvalError())).toBe(true);
    expect(isError(new URIError())).toBe(true);
  });

  it("should return true for errors with modified prototypes (where instanceof might fail)", () => {
    // 创建一个原始对象，并手动设置其原型为 Error.prototype
    // 这种情况下，obj 可能无法通过 instanceof 检查，但仍然是一个 Error 对象
    const obj = Object.create(Error.prototype);
    expect(isError(obj)).toBe(true);
  });

  it("should return false for non-error objects", () => {
    expect(isError(undefined)).toBe(false);
    expect(isError(null)).toBe(false);
    expect(isError(true)).toBe(false);
    expect(isError(false)).toBe(false);
    expect(isError(0)).toBe(false);
    expect(isError(1)).toBe(false);
    expect(isError(NaN)).toBe(false);
    expect(isError(Infinity)).toBe(false);
    expect(isError("")).toBe(false);
    expect(isError("error")).toBe(false);
    expect(isError({})).toBe(false);
    expect(isError({ name: "Error", message: "" })).toBe(false); // Plain object, not an Error instance
    expect(isError([])).toBe(false);
    expect(isError(() => {})).toBe(false);
    expect(isError(Symbol("a"))).toBe(false);
    expect(isError(BigInt(123))).toBe(false);
  });

  it("should return false for objects that inherit from Error but are not constructed as such", () => {
    // 这种情况比较特殊，但理论上可能存在
    // 例如，一个对象的原型链上没有 Error.prototype，但其原型字符串恰好是 "[object Error]"
    // 但通过 PROTOTYPE_TAGS.error 判断，只要原型字符串匹配就会返回 true
    // 所以这个测试主要是确认我们的函数行为是基于原型字符串的
    const plainObjWithCorrectTag = { constructor: { prototype: Error.prototype } };
    // 这个对象本身没有 [[Prototype]] 链接到 Error.prototype，所以 instanceOf 为 false
    // 但它会被 resolvePrototypeString 解析为 "[object Object]"
    // 因此 isError 应该返回 false
    expect(isError(plainObjWithCorrectTag)).toBe(false);

    // 真正测试 resolvePrototypeString 逻辑的最好方式是 mock 该函数，
    // 但这通常在单元测试中不常见，因为我们想测试的是集成后的函数。
    // 我们的测试主要验证了 instanceOf 和真实 Error 对象的行为。
  });
});
