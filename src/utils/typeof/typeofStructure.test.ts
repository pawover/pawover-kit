import { describe, expect, it } from "vitest";
import { isClass } from "./isClass";
import { isError } from "./isError";
import { isAsyncFunction, isAsyncGeneratorFunction, isFunction, isGeneratorFunction } from "./isFunction";
import { isObject } from "./isObject";
import { isPromise, isPromiseLike } from "./isPromise";
import { isRegExp } from "./isRegExp";

describe("typeof structure", () => {
  it("isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject(Object.create(null))).toBe(false); // prototype null !== Object.prototype
    expect(isObject(new Date())).toBe(false);
    expect(isObject(new Date(), false)).toBe(false); // [object Date] !== [object Object]
    expect(isObject(null)).toBe(false); // resolvePrototypeString(null) is not object tag
  });

  it("isClass", () => {
    class A {}
    expect(isClass(A)).toBe(true);
    expect(isClass(() => {})).toBe(false);
    expect(isClass(() => {})).toBe(false);
  });

  it("isFunction and variants", () => {
    const fn = () => {};
    const asyncFn = async () => {};
    const genFn = function *genFn() {};
    const asyncGenFn = async function *asyncGenFn() {};

    expect(isFunction(fn)).toBe(true);
    expect(isAsyncFunction(asyncFn)).toBe(true);
    expect(isGeneratorFunction(genFn)).toBe(true);
    expect(isAsyncGeneratorFunction(asyncGenFn)).toBe(true);

    // Cross checks
    expect(isFunction(asyncFn)).toBe(true); // typeof async fn is 'function'
    expect(isAsyncFunction(fn)).toBe(false);
  });

  it("isError", () => {
    expect(isError(new Error("test"))).toBe(true);
    expect(isError({ name: "Error", message: "fake" })).toBe(false);

    // Custom error
    class MyError extends Error {}
    expect(isError(new MyError())).toBe(true);
  });

  it("isPromise", () => {
    const p = Promise.resolve();
    expect(isPromise(p)).toBe(true);
    expect(isPromise({ then: () => {} })).toBe(false);
  });

  it("isPromiseLike", () => {
    const p = Promise.resolve();
    const thenable = { then: () => {} };
    expect(isPromiseLike(p)).toBe(true);
    expect(isPromiseLike(thenable)).toBe(true);
    expect(isPromiseLike({})).toBe(false);
  });

  it("isRegExp", () => {
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp(new RegExp("abc"))).toBe(true);
    expect(isRegExp("/abc/")).toBe(false);
  });
});
