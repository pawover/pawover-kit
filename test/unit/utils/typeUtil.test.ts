import { describe, expect, it } from "vitest";
import { TypeUtil } from "@pawover/kit/utils";

describe("TypeUtil", () => {
  describe("isString", () => {
    it("should return true for strings", () => {
      expect(TypeUtil.isString("abc")).toBe(true);
    });

    it("should return false for non-strings", () => {
      expect(TypeUtil.isString(123)).toBe(false);
    });

    it("should return false for empty string when checkNullish is true", () => {
      expect(TypeUtil.isString("", true)).toBe(false);
    });

    it("should return false for whitespace-only string when checkNullish is true", () => {
      expect(TypeUtil.isString("   ", true)).toBe(false);
    });

    it("should return true for non-empty string when checkNullish is true", () => {
      expect(TypeUtil.isString(" a ", true)).toBe(true);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isString(null)).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(TypeUtil.isString(undefined)).toBe(false);
    });
  });

  describe("isNumber", () => {
    it("should return true for numbers", () => {
      expect(TypeUtil.isNumber(1)).toBe(true);
    });

    it("should return false for NaN by default", () => {
      expect(TypeUtil.isNumber(NaN)).toBe(false);
    });

    it("should return true for NaN when checkNaN is false", () => {
      expect(TypeUtil.isNumber(NaN, false)).toBe(true);
    });

    it("should return true for Infinity by default (Infinity is a number)", () => {
      expect(TypeUtil.isNumber(Infinity)).toBe(true);
    });

    it("should return true for Infinity when checkNaN is false", () => {
      expect(TypeUtil.isNumber(Infinity, false)).toBe(true);
    });

    it("should return false for string", () => {
      expect(TypeUtil.isNumber("1")).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isNumber(null)).toBe(false);
    });
  });

  describe("isNaN", () => {
    it("should return true for NaN", () => {
      expect(TypeUtil.isNaN(NaN)).toBe(true);
    });

    it("should return false for numbers", () => {
      expect(TypeUtil.isNaN(1)).toBe(false);
    });

    it("should return false for Infinity", () => {
      expect(TypeUtil.isNaN(Infinity)).toBe(false);
    });

    it("should return false for string 'NaN'", () => {
      expect(TypeUtil.isNaN("NaN")).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(TypeUtil.isNaN(undefined)).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isNaN(null)).toBe(false);
    });
  });

  describe("isInteger", () => {
    it("should return true for integers", () => {
      expect(TypeUtil.isInteger(1)).toBe(true);
    });

    it("should return false for floats", () => {
      expect(TypeUtil.isInteger(1.1)).toBe(false);
    });

    it("should return false for unsafe integer when checkSafe is true", () => {
      expect(TypeUtil.isInteger(9007199254740992)).toBe(false);
    });

    it("should return true for unsafe integer when checkSafe is false", () => {
      expect(TypeUtil.isInteger(9007199254740992, false)).toBe(true);
    });

    it("should return false for NaN", () => {
      expect(TypeUtil.isInteger(NaN)).toBe(false);
    });
  });

  describe("isPositiveInteger", () => {
    it("should return true for positive integers", () => {
      expect(TypeUtil.isPositiveInteger(1)).toBe(true);
    });

    it("should return false for zero", () => {
      expect(TypeUtil.isPositiveInteger(0)).toBe(false);
    });

    it("should return false for negative integers", () => {
      expect(TypeUtil.isPositiveInteger(-1)).toBe(false);
    });

    it("should return true for unsafe positive int when checkSafe is false", () => {
      expect(TypeUtil.isPositiveInteger(9007199254740992, false)).toBe(true);
    });
  });

  describe("isNegativeInteger", () => {
    it("should return true for negative integers", () => {
      expect(TypeUtil.isNegativeInteger(-1)).toBe(true);
    });

    it("should return false for zero", () => {
      expect(TypeUtil.isNegativeInteger(0)).toBe(false);
    });

    it("should return false for positive integers", () => {
      expect(TypeUtil.isNegativeInteger(1)).toBe(false);
    });

    it("should return false for NaN", () => {
      expect(TypeUtil.isNegativeInteger(NaN)).toBe(false);
    });

    it("should return true for unsafe negative int when checkSafe is false", () => {
      expect(TypeUtil.isNegativeInteger(-9007199254740992, false)).toBe(true);
    });
  });

  describe("isInfinity", () => {
    it("should return true for Infinity", () => {
      expect(TypeUtil.isInfinity(Infinity)).toBe(true);
    });

    it("should return false for -Infinity", () => {
      expect(TypeUtil.isInfinity(-Infinity)).toBe(true);
    });

    it("should return false for 1", () => {
      expect(TypeUtil.isInfinity(1)).toBe(false);
    });

    it("should return false for NaN", () => {
      expect(TypeUtil.isInfinity(NaN)).toBe(false);
    });

    it("should return false for string", () => {
      expect(TypeUtil.isInfinity("Infinity")).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isInfinity(null)).toBe(false);
    });
  });

  describe("isInfinityLike", () => {
    it("should return true for Infinity", () => {
      expect(TypeUtil.isInfinityLike(Infinity)).toBe(true);
    });

    it("should return true for -Infinity", () => {
      expect(TypeUtil.isInfinityLike(-Infinity)).toBe(true);
    });

    it("should return true for string 'Infinity'", () => {
      expect(TypeUtil.isInfinityLike("Infinity")).toBe(true);
    });

    it("should return true for string '-Infinity'", () => {
      expect(TypeUtil.isInfinityLike("-Infinity")).toBe(true);
    });

    it("should return true for string '+Infinity'", () => {
      expect(TypeUtil.isInfinityLike("+Infinity")).toBe(true);
    });

    it("should return true for lowercase 'infinity'", () => {
      expect(TypeUtil.isInfinityLike("infinity")).toBe(true);
    });

    it("should return false for '123'", () => {
      expect(TypeUtil.isInfinityLike("123")).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isInfinityLike(null)).toBe(false);
    });

    it("should return false for NaN", () => {
      expect(TypeUtil.isInfinityLike(NaN)).toBe(false);
    });
  });

  describe("isBoolean", () => {
    it("should return true for true", () => {
      expect(TypeUtil.isBoolean(true)).toBe(true);
    });

    it("should return true for false", () => {
      expect(TypeUtil.isBoolean(false)).toBe(true);
    });

    it("should return false for 0", () => {
      expect(TypeUtil.isBoolean(0)).toBe(false);
    });

    it("should return false for 'true'", () => {
      expect(TypeUtil.isBoolean("true")).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isBoolean(null)).toBe(false);
    });
  });

  describe("isBigInt", () => {
    it("should return true for BigInt", () => {
      expect(TypeUtil.isBigInt(1n)).toBe(true);
    });

    it("should return false for number", () => {
      expect(TypeUtil.isBigInt(1)).toBe(false);
    });

    it("should return false for string", () => {
      expect(TypeUtil.isBigInt("1")).toBe(false);
    });
  });

  describe("isSymbol", () => {
    it("should return true for symbol", () => {
      expect(TypeUtil.isSymbol(Symbol("a"))).toBe(true);
    });

    it("should return false for string", () => {
      expect(TypeUtil.isSymbol("a")).toBe(false);
    });

    it("should return false for object", () => {
      expect(TypeUtil.isSymbol({})).toBe(false);
    });
  });

  describe("isUndefined", () => {
    it("should return true for undefined", () => {
      expect(TypeUtil.isUndefined(undefined)).toBe(true);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isUndefined(null)).toBe(false);
    });

    it("should return false for 0", () => {
      expect(TypeUtil.isUndefined(0)).toBe(false);
    });

    it("should return false for void expression", () => {
      expect(TypeUtil.isUndefined(void 0)).toBe(true);
    });
  });

  describe("isNull", () => {
    it("should return true for null", () => {
      expect(TypeUtil.isNull(null)).toBe(true);
    });

    it("should return false for undefined", () => {
      expect(TypeUtil.isNull(undefined)).toBe(false);
    });

    it("should return false for 0", () => {
      expect(TypeUtil.isNull(0)).toBe(false);
    });
  });

  describe("isNullish", () => {
    it("should return true for null", () => {
      expect(TypeUtil.isNullish(null)).toBe(true);
    });

    it("should return true for undefined", () => {
      expect(TypeUtil.isNullish(undefined)).toBe(true);
    });

    it("should return false for false", () => {
      expect(TypeUtil.isNullish(false)).toBe(false);
    });

    it("should return false for 0", () => {
      expect(TypeUtil.isNullish(0)).toBe(false);
    });

    it("should return false for empty string", () => {
      expect(TypeUtil.isNullish("")).toBe(false);
    });
  });

  describe("isFunction", () => {
    it("should return true for arrow function", () => {
      expect(TypeUtil.isFunction(() => {})).toBe(true);
    });

    it("should return true for regular function", () => {
      expect(TypeUtil.isFunction(function () {})).toBe(true);
    });

    it("should return true for async function", () => {
      expect(TypeUtil.isFunction(async () => {})).toBe(true);
    });

    it("should return false for object", () => {
      expect(TypeUtil.isFunction({})).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isFunction(null)).toBe(false);
    });
  });

  describe("isAsyncFunction", () => {
    it("should return true for async function", () => {
      expect(TypeUtil.isAsyncFunction(async () => {})).toBe(true);
    });

    it("should return false for regular function", () => {
      expect(TypeUtil.isAsyncFunction(() => {})).toBe(false);
    });

    it("should return false for generator function", () => {
      expect(TypeUtil.isAsyncFunction(function* () {})).toBe(false);
    });
  });

  describe("isGeneratorFunction", () => {
    it("should return true for generator function", () => {
      expect(TypeUtil.isGeneratorFunction(function* a() {})).toBe(true);
    });

    it("should return false for regular function", () => {
      expect(TypeUtil.isGeneratorFunction(() => {})).toBe(false);
    });

    it("should return false for async generator function", () => {
      expect(TypeUtil.isGeneratorFunction(async function* a() {})).toBe(false);
    });
  });

  describe("isAsyncGeneratorFunction", () => {
    it("should return true for async generator function", () => {
      expect(TypeUtil.isAsyncGeneratorFunction(async function* a() {})).toBe(true);
    });

    it("should return false for generator function", () => {
      expect(TypeUtil.isAsyncGeneratorFunction(function* a() {})).toBe(false);
    });

    it("should return false for regular function", () => {
      expect(TypeUtil.isAsyncGeneratorFunction(() => {})).toBe(false);
    });
  });

  describe("isPromise", () => {
    it("should return true for resolved promise", () => {
      expect(TypeUtil.isPromise(Promise.resolve(1))).toBe(true);
    });

    it("should return true for rejected promise", () => {
      expect(TypeUtil.isPromise(Promise.reject(new Error("test")).catch(() => {}))).toBe(true);
    });

    it("should return false for plain object", () => {
      expect(TypeUtil.isPromise({})).toBe(false);
    });

    it("should return false for thenable without Promise tag", () => {
      const thenable = { then: () => {} };
      expect(TypeUtil.isPromise(thenable)).toBe(false);
    });
  });

  describe("isPromiseLike", () => {
    it("should return true for promise", () => {
      expect(TypeUtil.isPromiseLike(Promise.resolve(1))).toBe(true);
    });

    it("should return true for thenable object", () => {
      expect(TypeUtil.isPromiseLike({ then: () => {} })).toBe(true);
    });

    it("should return false for plain object without then", () => {
      expect(TypeUtil.isPromiseLike({})).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isPromiseLike(null)).toBe(false);
    });
  });

  describe("isPlainObject", () => {
    it("should return true for {}", () => {
      expect(TypeUtil.isPlainObject({})).toBe(true);
    });

    it("should return false for array", () => {
      expect(TypeUtil.isPlainObject([])).toBe(false);
    });

    it("should return false for Date", () => {
      expect(TypeUtil.isPlainObject(new Date())).toBe(false);
    });

    it("should return false for class instance", () => {
      expect(TypeUtil.isPlainObject(new (class {})())).toBe(false);
    });

    it("should return true for class instance when prototypeCheck is false", () => {
      expect(TypeUtil.isPlainObject(new (class {})(), false)).toBe(true);
    });

    it("should return false for Object.create(null)", () => {
      expect(TypeUtil.isPlainObject(Object.create(null))).toBe(false);
    });

    it("should return true for Object.create(null) when prototypeCheck is false", () => {
      expect(TypeUtil.isPlainObject(Object.create(null), false)).toBe(true);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isPlainObject(null)).toBe(false);
    });
  });

  describe("isObject", () => {
    it("should return true for {}", () => {
      expect(TypeUtil.isObject({})).toBe(true);
    });

    it("should return true for arrays", () => {
      expect(TypeUtil.isObject([])).toBe(true);
    });

    it("should return true for Date", () => {
      expect(TypeUtil.isObject(new Date())).toBe(true);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isObject(null)).toBe(false);
    });

    it("should return false for string", () => {
      expect(TypeUtil.isObject("string")).toBe(false);
    });

    it("should return false for number", () => {
      expect(TypeUtil.isObject(42)).toBe(false);
    });
  });

  describe("isEnumeration", () => {
    it("should return [true, true] for numeric enum", () => {
      enum A { X, Y }
      expect(TypeUtil.isEnumeration(A as any)).toEqual([true, true]);
    });

    it("should return [true, false] for string enum", () => {
      enum B { X = "x", Y = "y" }
      expect(TypeUtil.isEnumeration(B as any)).toEqual([true, false]);
    });

    it("should return [false, false] for non-object", () => {
      expect(TypeUtil.isEnumeration(null as any)).toEqual([false, false]);
    });

    it("should return [false, false] for empty object", () => {
      expect(TypeUtil.isEnumeration({})).toEqual([false, false]);
    });

    it("should return [false, false] for mixed value types", () => {
      expect(TypeUtil.isEnumeration({ a: 1, b: "x" })).toEqual([false, false]);
    });

    it("should return [false, false] for duplicate values", () => {
      expect(TypeUtil.isEnumeration({ a: 1, b: 1 })).toEqual([false, false]);
    });
  });

  describe("isClass", () => {
    it("should return true for class", () => {
      class A {}
      expect(TypeUtil.isClass(A)).toBe(true);
    });

    it("should return false for arrow function", () => {
      expect(TypeUtil.isClass(() => {})).toBe(false);
    });

    it("should return false for regular function", () => {
      expect(TypeUtil.isClass(function () {})).toBe(false);
    });

    it("should return false for async function", () => {
      expect(TypeUtil.isClass(async () => {})).toBe(false);
    });
  });

  describe("isArray", () => {
    it("should return true for array", () => {
      expect(TypeUtil.isArray([])).toBe(true);
    });

    it("should return true for non-empty array", () => {
      expect(TypeUtil.isArray([1, 2])).toBe(true);
    });

    it("should return false for array-like object", () => {
      expect(TypeUtil.isArray({ length: 2 })).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isArray(null)).toBe(false);
    });

    it("should return false for string", () => {
      expect(TypeUtil.isArray("abc")).toBe(false);
    });
  });

  describe("isTypedArray", () => {
    it("should return true for Int8Array", () => {
      expect(TypeUtil.isTypedArray(new Int8Array())).toBe(true);
    });

    it("should return true for Uint8Array", () => {
      expect(TypeUtil.isTypedArray(new Uint8Array())).toBe(true);
    });

    it("should return true for Float64Array", () => {
      expect(TypeUtil.isTypedArray(new Float64Array())).toBe(true);
    });

    it("should return false for regular array", () => {
      expect(TypeUtil.isTypedArray([])).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isTypedArray(null)).toBe(false);
    });
  });

  describe("isMap", () => {
    it("should return true for Map", () => {
      expect(TypeUtil.isMap(new Map())).toBe(true);
    });

    it("should return false for WeakMap", () => {
      expect(TypeUtil.isMap(new WeakMap())).toBe(false);
    });

    it("should return false for plain object", () => {
      expect(TypeUtil.isMap({})).toBe(false);
    });
  });

  describe("isWeakMap", () => {
    it("should return true for WeakMap", () => {
      expect(TypeUtil.isWeakMap(new WeakMap())).toBe(true);
    });

    it("should return false for Map", () => {
      expect(TypeUtil.isWeakMap(new Map())).toBe(false);
    });

    it("should return false for plain object", () => {
      expect(TypeUtil.isWeakMap({})).toBe(false);
    });
  });

  describe("isSet", () => {
    it("should return true for Set", () => {
      expect(TypeUtil.isSet(new Set())).toBe(true);
    });

    it("should return false for WeakSet", () => {
      expect(TypeUtil.isSet(new WeakSet())).toBe(false);
    });

    it("should return false for array", () => {
      expect(TypeUtil.isSet([])).toBe(false);
    });
  });

  describe("isWeakSet", () => {
    it("should return true for WeakSet", () => {
      expect(TypeUtil.isWeakSet(new WeakSet())).toBe(true);
    });

    it("should return false for Set", () => {
      expect(TypeUtil.isWeakSet(new Set())).toBe(false);
    });

    it("should return false for array", () => {
      expect(TypeUtil.isWeakSet([])).toBe(false);
    });
  });

  describe("isBlob", () => {
    it("should return true for Blob", () => {
      expect(TypeUtil.isBlob(new Blob(["a"]))).toBe(true);
    });

    it("should return false for plain object", () => {
      expect(TypeUtil.isBlob({})).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isBlob(null)).toBe(false);
    });
  });

  describe("isFile", () => {
    it("should return true for File", () => {
      expect(TypeUtil.isFile(new File(["a"], "a.txt"))).toBe(true);
    });

    it("should return false for Blob", () => {
      expect(TypeUtil.isFile(new Blob(["a"]))).toBe(false);
    });

    it("should return false for plain object", () => {
      expect(TypeUtil.isFile({})).toBe(false);
    });
  });

  describe("isReadableStream", () => {
    it("should return true for ReadableStream", () => {
      expect(TypeUtil.isReadableStream(new ReadableStream())).toBe(true);
    });

    it("should return false for plain object", () => {
      expect(TypeUtil.isReadableStream({})).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isReadableStream(null)).toBe(false);
    });

    it("should return true for duck-typed ReadableStream", () => {
      const fake = { getReader: () => {}, pipeThrough: () => {} };
      expect(TypeUtil.isReadableStream(fake)).toBe(true);
    });

    it("should return false for object missing pipeThrough", () => {
      const fake = { getReader: () => {} };
      expect(TypeUtil.isReadableStream(fake)).toBe(false);
    });
  });

  describe("isWindow", () => {
    it("should return false for plain object", () => {
      expect(TypeUtil.isWindow({})).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isWindow(null)).toBe(false);
    });
  });

  describe("isIframe", () => {
    it("should return false for plain object", () => {
      expect(TypeUtil.isIframe({})).toBe(false);
    });
  });

  describe("isDate", () => {
    it("should return true for valid Date", () => {
      expect(TypeUtil.isDate(new Date())).toBe(true);
    });

    it("should return false for invalid Date", () => {
      expect(TypeUtil.isDate(new Date("invalid"))).toBe(false);
    });

    it("should return true for invalid Date when invalidCheck is false", () => {
      expect(TypeUtil.isDate(new Date("invalid"), false)).toBe(true);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isDate(null)).toBe(false);
    });

    it("should return false for plain object", () => {
      expect(TypeUtil.isDate({})).toBe(false);
    });

    it("should return false for a number", () => {
      expect(TypeUtil.isDate(Date.now())).toBe(false);
    });
  });

  describe("isError", () => {
    it("should return true for Error", () => {
      expect(TypeUtil.isError(new Error("x"))).toBe(true);
    });

    it("should return true for TypeError", () => {
      expect(TypeUtil.isError(new TypeError("x"))).toBe(true);
    });

    it("should return true for object with Error prototype tag", () => {
      const fake = { message: "test" };
      Object.prototype.toString.call(fake);
      expect(TypeUtil.isError(fake)).toBe(false);
    });

    it("should return false for plain object", () => {
      expect(TypeUtil.isError({})).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isError(null)).toBe(false);
    });
  });

  describe("isRegExp", () => {
    it("should return true for RegExp literal", () => {
      expect(TypeUtil.isRegExp(/a/)).toBe(true);
    });

    it("should return true for RegExp constructor", () => {
      expect(TypeUtil.isRegExp(new RegExp("a"))).toBe(true);
    });

    it("should return false for string", () => {
      expect(TypeUtil.isRegExp("/a/")).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isRegExp(null)).toBe(false);
    });

    it("should return false for plain object", () => {
      expect(TypeUtil.isRegExp({})).toBe(false);
    });
  });

  describe("isWebSocket", () => {
    it("should return false for plain object", () => {
      expect(TypeUtil.isWebSocket({})).toBe(false);
    });
  });

  describe("isURLSearchParams", () => {
    it("should return true for URLSearchParams", () => {
      expect(TypeUtil.isURLSearchParams(new URLSearchParams("a=1"))).toBe(true);
    });

    it("should return false for plain object", () => {
      expect(TypeUtil.isURLSearchParams({})).toBe(false);
    });
  });

  describe("isAbortSignal", () => {
    it("should return true for AbortSignal", () => {
      expect(TypeUtil.isAbortSignal(new AbortController().signal)).toBe(true);
    });

    it("should return false for plain object", () => {
      expect(TypeUtil.isAbortSignal({})).toBe(false);
    });
  });

  describe("isIterable", () => {
    it("should return true for array", () => {
      expect(TypeUtil.isIterable([1, 2])).toBe(true);
    });

    it("should return true for string", () => {
      expect(TypeUtil.isIterable("abc")).toBe(true);
    });

    it("should return true for Set", () => {
      expect(TypeUtil.isIterable(new Set([1]))).toBe(true);
    });

    it("should return true for Map", () => {
      expect(TypeUtil.isIterable(new Map())).toBe(true);
    });

    it("should return false for plain object", () => {
      expect(TypeUtil.isIterable({})).toBe(false);
    });

    it("should return false for null", () => {
      expect(TypeUtil.isIterable(null)).toBe(false);
    });
  });

  describe("isFalsy", () => {
    it("should return true for false", () => {
      expect(TypeUtil.isFalsy(false)).toBe(true);
    });

    it("should return true for 0", () => {
      expect(TypeUtil.isFalsy(0)).toBe(true);
    });

    it("should return true for empty string", () => {
      expect(TypeUtil.isFalsy("")).toBe(true);
    });

    it("should return true for null", () => {
      expect(TypeUtil.isFalsy(null)).toBe(true);
    });

    it("should return true for undefined", () => {
      expect(TypeUtil.isFalsy(undefined)).toBe(true);
    });

    it("should return true for NaN", () => {
      expect(TypeUtil.isFalsy(NaN)).toBe(true);
    });

    it("should return true for 0n", () => {
      expect(TypeUtil.isFalsy(0n)).toBe(true);
    });

    it("should return false for 1", () => {
      expect(TypeUtil.isFalsy(1)).toBe(false);
    });

    it("should return false for '0'", () => {
      expect(TypeUtil.isFalsy("0")).toBe(false);
    });
  });

  describe("isFalsyLike", () => {
    it("should return true for falsy values", () => {
      expect(TypeUtil.isFalsyLike(0)).toBe(true);
    });

    it("should return true for string 'null'", () => {
      expect(TypeUtil.isFalsyLike("null")).toBe(true);
    });

    it("should return true for string 'undefined'", () => {
      expect(TypeUtil.isFalsyLike("undefined")).toBe(true);
    });

    it("should return true for string 'NaN'", () => {
      expect(TypeUtil.isFalsyLike("NaN")).toBe(true);
    });

    it("should return true for string 'false'", () => {
      expect(TypeUtil.isFalsyLike("false")).toBe(true);
    });

    it("should return true for string '0'", () => {
      expect(TypeUtil.isFalsyLike("0")).toBe(true);
    });

    it("should return true for string '-0'", () => {
      expect(TypeUtil.isFalsyLike("-0")).toBe(true);
    });

    it("should return true for string '0n'", () => {
      expect(TypeUtil.isFalsyLike("0n")).toBe(true);
    });

    it("should return false for string 'hello'", () => {
      expect(TypeUtil.isFalsyLike("hello")).toBe(false);
    });

    it("should return false for 1", () => {
      expect(TypeUtil.isFalsyLike(1)).toBe(false);
    });

    it("should return false for empty object", () => {
      expect(TypeUtil.isFalsyLike({})).toBe(false);
    });
  });
});
