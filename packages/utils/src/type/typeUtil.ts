import type { AnyAsyncFunction, AnyAsyncGeneratorFunction, AnyFunction, AnyGeneratorFunction, AnyObject, PlainObject } from "@pawover/types";
import type { TypedArray } from "type-fest";

import type { Class } from "./index.type";

/**
 * 类型工具类
 */
export class TypeUtil {
  private static readonly PROTOTYPE_TAGS = {
    STRING: "[object String]",
    NUMBER: "[object Number]",
    BOOLEAN: "[object Boolean]",
    BIGINT: "[object BigInt]",
    SYMBOL: "[object Symbol]",
    UNDEFINED: "[object Undefined]",
    NULL: "[object Null]",
    OBJECT: "[object Object]",
    FUNCTION: "[object Function]",

    GENERATOR_FUNCTION: "[object GeneratorFunction]",
    ASYNC_FUNCTION: "[object AsyncFunction]",
    ASYNC_GENERATOR_FUNCTION: "[object AsyncGeneratorFunction]",

    PROMISE: "[object Promise]",

    MAP: "[object Map]",
    SET: "[object Set]",
    WEAK_MAP: "[object WeakMap]",
    WEAK_SET: "[object WeakSet]",

    BLOB: "[object Blob]",
    FILE: "[object File]",
    READABLE_STREAM: "[object ReadableStream]",

    GLOBAL: "[object global]",
    WINDOW: "[object Window]",
    IFRAME: "[object HTMLIFrameElement]",

    DATE: "[object Date]",
    ERROR: "[object Error]",

    REG_EXP: "[object RegExp]",

    WEB_SOCKET: "[object WebSocket]",
    URL_SEARCH_PARAMS: "[object URLSearchParams]",
    ABORT_SIGNAL: "[object AbortSignal]",
  } as const;

  private static readonly TYPED_ARRAY_TAGS: ReadonlySet<string> = new Set([
    "[object Int8Array]",
    "[object Uint8Array]",
    "[object Uint8ClampedArray]",
    "[object Int16Array]",
    "[object Uint16Array]",
    "[object Int32Array]",
    "[object Uint32Array]",
    "[object Float32Array]",
    "[object Float64Array]",
    "[object BigInt64Array]",
    "[object BigUint64Array]",
  ]);

  /**
   * 获取值的 [[Prototype]] 标签
   *
   * @param value - 任意 JavaScript 值
   * @returns 标准化的类型标签字符串
   */
  private static getPrototypeString (value: unknown): string {
    return Object.prototype.toString.call(value);
  }

  private static isConstructable (fn: unknown): boolean {
    try {
      // 尝试用 new 调用（但不执行 constructor）
      Reflect.construct(fn as AnyFunction, []);

      return true;
    } catch {
      return false;
    }
  }

  /**
   * 检查 value 是否为 string 类型
   *
   * @param value 待检查值
   * @param checkEmpty 是否检查空字符串
   * @returns 是否为字符串
   * @example
   * ```ts
   * TypeUtil.isString("abc"); // true
   * TypeUtil.isString(""); // true
   * TypeUtil.isString("", true); // false
   * ```
   */
  static isString (value: unknown, checkEmpty = false): value is string {
    return typeof value === "string" && (!checkEmpty || !!value.length);
  }

  /**
   * 检查 value 是否为 number 类型
   *
   * @param value 待检查值
   * @param checkNaN 是否排除 `NaN`，默认为 `true`
   * @returns 是否为 number
   * @example
   * ```ts
   * TypeUtil.isNumber(1); // true
   * TypeUtil.isNumber(NaN); // false (default)
   * TypeUtil.isNumber(NaN, false); // true
   * ```
   */
  static isNumber (value: unknown, checkNaN = true): value is number {
    return typeof value === "number" && (!checkNaN || !this.isNaN(value));
  }

  /**
   * 检查 value 是否为 NaN
   *
   * @param value 待检查值
   * @returns 是否为 NaN
   */
  static isNaN (value: unknown): value is number {
    return Number.isNaN(value);
  }

  /**
   * 检查 value 是否为整数
   *
   * @param value 待检查值
   * @param checkSafe 是否附加安全整数检查
   * @returns 是否为整数
   */
  static isInteger (value: unknown, checkSafe = true): value is number {
    const check = Number.isInteger(value);

    return checkSafe ? check && Number.isSafeInteger(value) : check;
  }

  /**
   * 检查 value 是否为正整数
   * - 此函数中 `0` 不被视为正整数
   *
   * @param value 待检查值
   * @param checkSafe 是否附加安全整数检查
   */
  static isPositiveInteger (value: unknown, checkSafe = true): value is number {
    return this.isInteger(value, checkSafe) && value > 0;
  }

  /**
   * 检查 value 是否为负整数
   * - 此函数中 `0` 不被视为负整数
   *
   * @param value 待检查值
   * @param checkSafe 是否附加安全整数检查
   */
  static isNegativeInteger (value: unknown, checkSafe = true): value is number {
    return this.isInteger(value, checkSafe) && value < 0;
  }

  /**
   * 检查 value 是否为 Infinity
   * - 排除 `NaN`
   *
   * @param value 待检查值
   */
  static isInfinity (value: unknown): value is number {
    return this.isNumber(value) && (Number.POSITIVE_INFINITY === value || Number.NEGATIVE_INFINITY === value);
  }

  /**
   * 检查 value 是否类似 Infinity
   * - 排除 `NaN`
   *
   * @param value 待检查值
   */
  static isInfinityLike (value: unknown): boolean {
    const check = this.isInfinity(value);

    if (check) {
      return check;
    }

    if (typeof value === "string") {
      return ["infinity", "-infinity", "+infinity", "Infinity", "-Infinity", "+Infinity"].includes(value.trim());
    }

    return false;
  }

  /**
   * 检查 value 是否为 Boolean
   * @param value 待检查值
   * @returns 是否为 Boolean
   */
  static isBoolean (value: unknown): value is boolean {
    return typeof value === "boolean";
  }

  /**
   * 检查 value 是否为 BigInt
   * @param value 待检查值
   * @returns 是否为 BigInt
   */
  static isBigInt (value: unknown): value is bigint {
    return typeof value === "bigint";
  }

  /**
   * 检查 value 是否为 Symbol
   * @param value 待检查值
   * @returns 是否为 Symbol
   */
  static isSymbol (value: unknown): value is symbol {
    return typeof value === "symbol";
  }

  /**
   * 检查 value 是否为 undefined
   * @param value 待检查值
   * @returns 是否为 undefined
   */
  static isUndefined (value: unknown): value is undefined {
    return typeof value === "undefined";
  }

  /**
   * 检查 value 是否为 null
   * @param value 待检查值
   * @returns 是否为 null
   */
  static isNull (value: unknown): value is null {
    return value === null;
  }

  /**
   * 检查 value 是否为 Function
   * @param value 待检查值
   * @returns 是否为 Function
   */
  static isFunction (value: unknown): value is AnyFunction {
    return typeof value === "function";
  }

  /**
   * 检查 value 是否为 AsyncFunction
   * @param value 待检查值
   * @returns 是否为 AsyncFunction
   */
  static isAsyncFunction (value: unknown): value is AnyAsyncFunction {
    return this.isFunction(value) && this.getPrototypeString(value) === this.PROTOTYPE_TAGS.ASYNC_FUNCTION;
  }

  /**
   * 检查 value 是否为 GeneratorFunction
   * @param value 待检查值
   * @returns 是否为 GeneratorFunction
   */
  static isGeneratorFunction (value: unknown): value is AnyGeneratorFunction {
    return this.isFunction(value) && this.getPrototypeString(value) === this.PROTOTYPE_TAGS.GENERATOR_FUNCTION;
  }

  /**
   * 检查 value 是否为 AsyncGeneratorFunction
   * @param value 待检查值
   * @returns 是否为 AsyncGeneratorFunction
   */
  static isAsyncGeneratorFunction (value: unknown): value is AnyAsyncGeneratorFunction {
    return this.isFunction(value) && this.getPrototypeString(value) === this.PROTOTYPE_TAGS.ASYNC_GENERATOR_FUNCTION;
  }

  /**
   * 检查 value 是否为 Promise
   * @param value 待检查值
   * @returns 是否为 Promise
   */
  static isPromise (value: unknown): value is Promise<unknown> {
    return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.PROMISE;
  }

  /**
   * 检查 value 是否为 PromiseLike
   * - 可识别拥有 then 方法的非 Promise 对象
   * @param value 待检查值
   * @returns 是否为 PromiseLike
   */
  static isPromiseLike (value: unknown): value is PromiseLike<unknown> {
    return this.isPromise(value) || (this.isObject(value, false) && this.isFunction(value["then"]));
  }

  /**
   * 判断是否为普通对象类型
   * - 可选是否检查原型为 `Object.prototype`，防止原型链污染
   *
   * @param value 待检查值
   * @param prototypeCheck 是否进行原型检查，默认 `true`
   * @returns 是否为 Plain Object (当 checkPrototype=true) 或 object
   * @example
   * ```ts
   * TypeUtil.isObject({}); // true
   * TypeUtil.isObject([]); // false
   * TypeUtil.isObject(new Date()); // false
   * TypeUtil.isObject(new Date(), false); // true
   * TypeUtil.isObject(Object.create(null)) // false
   * TypeUtil.isObject(Object.create(null), false) // true
   * ```
   */
  static isObject (value: unknown, prototypeCheck = true): value is Record<PropertyKey, unknown> {
    const check = this.getPrototypeString(value) === this.PROTOTYPE_TAGS.OBJECT;

    return prototypeCheck ? check && Object.getPrototypeOf(value) === Object.prototype : check;
  }

  /**
   * 判断一个对象是否为有效的枚举
   * - 枚举成员不能为空
   * - 枚举成员的键不能具有数值名
   * - 枚举成员的值必须类型一致且为 `string` 或 `number` 类型
   * - 枚举成员的值不能重复
   * - 枚举成员的值必须全部为双向映射或非双向映射
   *
   * @param enumeration 待检查值
   * @returns [是否为有效的枚举, 是否为双向枚举]
   */
  static isEnumeration (enumeration: PlainObject): [boolean, boolean] {
    if (typeof enumeration !== "object" || enumeration === null) {
      return [false, false];
    }

    const keys = Object.keys(enumeration);

    // 枚举成员不能为空
    if (keys.length === 0) {
      return [false, false];
    }

    const originalKeys: string[] = [];
    const numericKeys: string[] = [];

    // 区分 "原始枚举键" 和 "反向映射产生的数值键"
    for (const key of keys) {
      // 正则 /^\d+$/ 匹配纯数字字符串键名，如 "0", "1", "123"
      if (/^\d+$/.test(key)) {
        numericKeys.push(key);
      } else {
        originalKeys.push(key);
      }
    }

    // 必须有原始的枚举成员
    if (originalKeys.length === 0) {
      return [false, false];
    }

    // 检查原始枚举成员的值
    let valueType: "string" | "number" | null = null;
    const values: (string | number)[] = [];

    for (const key of originalKeys) {
      const value = enumeration[key];
      const type = typeof value;

      // 值必须是 string 或 number
      if (type !== "string" && type !== "number") {
        return [false, false];
      }

      // 检查类型一致性
      if (valueType === null) {
        valueType = type;
      } else if (type !== valueType) {
        return [false, false];
      }

      values.push(value as string | number);
    }

    // 检查值是否重复
    if (new Set(values).size !== values.length) {
      return [false, false];
    }

    // 判断是否为双向枚举
    let isBidirectional = false;

    // 如果 numericKeys.length === 0 说明没有反向映射键
    if (numericKeys.length > 0) {
      // 如果存在数值键，说明可能是 TS 数字枚举
      // 此时必须满足严格的双向映射规则：数值键数量必须等于原始键数量
      if (numericKeys.length !== originalKeys.length) {
        return [false, false];
      }

      const reverseMappedNames = new Set<string>();

      for (const numKey of numericKeys) {
        const reverseValue = enumeration[numKey];

        // 反向映射的值必须是字符串（即原始键名）
        if (typeof reverseValue !== "string") {
          return [false, false];
        }

        // 反向映射的值必须是已知的原始键名之一
        if (!originalKeys.includes(reverseValue)) {
          return [false, false];
        }

        reverseMappedNames.add(reverseValue);
      }

      // 所有原始键名都必须和反向映射对应
      if (reverseMappedNames.size !== originalKeys.length) {
        return [false, false];
      }

      isBidirectional = true;
    }

    return [true, isBidirectional];
  }

  /**
   * 检查 value 是否为 Class
   *
   * @param value 待检查值
   * @returns 是否为 Class
   * @example
   * ```ts
   * class A {}
   * TypeUtil.isClass(A); // true
   * TypeUtil.isClass(() => {}); // false
   * ```
   */
  static isClass (value: unknown): value is Class<AnyObject> {
    return this.isFunction(value) && !this.isAsyncFunction(value) && Function.prototype.toString.call(value).startsWith("class ") && this.isConstructable(value) && value.prototype !== undefined;
  }

  /**
   * 检查 value 是否为数组
   *
   * @param value 待检查值
   * @returns 是否为数组
   * @example
   * ```ts
   * TypeUtil.isArray([]); // true
   * ```
   */
  static isArray (value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  /**
   * 检查 value 是否为 TypedArray
   *
   * @param value 待检查值
   * @returns 是否为 TypedArray
   * @example
   * ```ts
   * TypeUtil.isTypedArray(new Int8Array()); // true
   * ```
   */
  static isTypedArray (value: unknown): value is TypedArray {
    return typeof value === "object" && value !== null && this.TYPED_ARRAY_TAGS.has(this.getPrototypeString(value));
  }

  /**
   * 检查 value 是否为 Map
   * @param value 待检查值
   * @returns 是否为 Map
   */
  static isMap (value: unknown): value is Map<unknown, unknown> {
    return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.MAP;
  }

  /**
   * 检查 value 是否为 WeakMap
   * @param value 待检查值
   * @returns 是否为 WeakMap
   */
  static isWeakMap (value: unknown): value is WeakMap<AnyObject, unknown> {
    return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.WEAK_MAP;
  }

  /**
   * 检查 value 是否为 Set
   * @param value 待检查值
   * @returns 是否为 Set
   */
  static isSet (value: unknown): value is Set<unknown> {
    return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.SET;
  }

  /**
   * 检查 value 是否为 WeakSet
   * @param value 待检查值
   * @returns 是否为 WeakSet
   */
  static isWeakSet (value: unknown): value is WeakSet<AnyObject> {
    return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.WEAK_SET;
  }

  /**
   * 检查 value 是否为 Blob
   * @param value 待检查值
   * @returns 是否为 Blob
   */
  static isBlob (value: unknown): value is Blob {
    return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.BLOB;
  }

  /**
   * 检查 value 是否为 File
   * @param value 待检查值
   * @returns 是否为 File
   */
  static isFile (value: unknown): value is File {
    return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.FILE;
  }

  /**
   * 检查 value 是否为 ReadableStream
   * - Uses `Object.prototype.toString` where supported (modern browsers, Node.js ≥18).
   * - Falls back to duck-typing in older environments.
   * - Resistant to basic forgery, but not 100% secure in all polyfill scenarios.
   * - ⚠️ Note: In older Node.js (<18) or with non-compliant polyfills, this may return false positives or negatives.
   *
   * @param value 待检查值
   * @returns 是否为 ReadableStream
   */
  static isReadableStream (value: unknown): value is ReadableStream {
    if (this.getPrototypeString(value) === this.PROTOTYPE_TAGS.READABLE_STREAM) {
      return true;
    }

    return this.isObject(value) && this.isFunction(value["getReader"]) && this.isFunction(value["pipeThrough"]);
  }

  /**
   * 检查 value 是否为 Window
   * @param value 待检查值
   * @returns 是否为 Window
   */
  static isWindow (value: unknown): value is Window {
    return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.WINDOW;
  }

  /**
   * 检查 value 是否为 HTMLIFrameElement
   * @param value 待检查值
   * @returns 是否为 HTMLIFrameElement
   */
  static isIframe (value: unknown): value is HTMLIFrameElement {
    if (typeof window === "undefined") {
      return false;
    }

    return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.IFRAME;
  }

  /**
   * 检查 value 是否为 Date 对象
   *
   * @param value 待检查值
   * @param invalidCheck 是否要求日期有效（非 Invalid Date）。默认 true
   *   - true: 仅当是有效 Date 对象时返回 true（排除 new Date('invalid')）
   *   - false: 只要 [[Prototype]] 是 Date 即返回 true（包含 Invalid Date）
   * @returns 是否为 Date 对象，根据 invalidCheck 返回不同语义的 Date 判定
   *
   * @example
   * ```ts
   * TypeUtil.isDate(new Date()); // true
   * TypeUtil.isDate(new Date('invalid')); // false
   * TypeUtil.isDate(new Date('invalid'), false); // true
   * TypeUtil.isDate(null); // false
   * TypeUtil.isDate({}); // false
   * ```
   */
  static isDate (value: unknown, invalidCheck = true): value is Date {
    if (!value || typeof value !== "object") {
      return false;
    }

    if (this.getPrototypeString(value) !== this.PROTOTYPE_TAGS.DATE) {
      return false;
    }

    if (!invalidCheck) {
      return true;
    }

    // 验证是否为有效日期（排除 Invalid Date）
    try {
      const time = (value as Date).getTime();

      return typeof time === "number" && !Number.isNaN(time);
    } catch {
      return false;
    }
  }

  /**
   * 检查 value 是否为 Error 对象
   * @param value 待检查值
   * @returns 是否为 Error
   */
  static isError (value: unknown): value is Error {
    return value instanceof Error || this.getPrototypeString(value) === this.PROTOTYPE_TAGS.ERROR;
  }

  /**
   * 检查 value 是否为 RegExp
   * @param value 待检查值
   * @returns 是否为 RegExp
   */
  static isRegExp (value: unknown): value is RegExp {
    if (typeof value !== "object" || value === null) {
      return false;
    }

    try {
      const regex = value as unknown as RegExp;

      return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.REG_EXP && this.isString(regex.source) && this.isString(regex.flags) && this.isBoolean(regex.global) && this.isFunction(regex.test);
    } catch (error) {
      return false;
    }
  }

  /**
   * 检查 value 是否为 WebSocket
   * @param value 待检查值
   * @returns 是否为 WebSocket
   */
  static isWebSocket (value: unknown): value is WebSocket {
    return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.WEB_SOCKET;
  }

  /**
   * 检查 value 是否为 URLSearchParams
   * @param value 待检查值
   * @returns 是否为 URLSearchParams
   */
  static isURLSearchParams (value: unknown): value is URLSearchParams {
    return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.URL_SEARCH_PARAMS;
  }

  /**
   * 检查 value 是否为 AbortSignal
   * @param value 待检查值
   * @returns 是否为 AbortSignal
   */
  static isAbortSignal (value: unknown): value is AbortSignal {
    return this.getPrototypeString(value) === this.PROTOTYPE_TAGS.ABORT_SIGNAL;
  }

  /**
   * 检查 value 是否为可迭代对象 (Iterable)
   * @param value 待检查值
   * @returns 是否为 Iterable
   */
  static isIterable (value: unknown): value is { [Symbol.iterator]: () => Iterator<unknown> } {
    return !!value && typeof (value as AnyObject)[Symbol.iterator] === "function";
  }

  /**
   * 检查 value 是否为 Falsy 值 (false, 0, "", null, undefined, NaN)
   * @param value 待检查值
   * @returns 是否为 Falsy
   */
  static isFalsy (value: unknown): value is false | 0 | "" | null | undefined {
    if (this.isNaN(value) || this.isNull(value) || this.isUndefined(value)) {
      return true;
    }

    return value === false || value === 0 || value === 0n || value === "";
  }

  static isFalsyLike (value: unknown): boolean {
    if (this.isFalsy(value)) {
      return true;
    }

    return typeof value === "string" && (value === "null" || value === "undefined" || value === "NaN" || value === "false" || value === "0" || value === "-0" || value === "0n");
  }
}
