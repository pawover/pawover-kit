import type { Class } from "type-fest";

const prototypes = {
  string: "[object String]",
  number: "[object Number]",
  boolean: "[object Boolean]",
  object: "[object Object]",
  array: "[object Array]",
  bigInt: "[object BigInt]",
  symbol: "[object Symbol]",
  function: "[object Function]",
  generatorFunction: "[object GeneratorFunction]",
  asyncFunction: "[object AsyncFunction]",
  promise: "[object Promise]",
  null: "[object Null]",
  undefined: "[object Undefined]",
  date: "[object Date]",
  regExp: "[object RegExp]",
  error: "[object Error]",
  file: "[object File]",
  map: "[object Map]",
  weakMap: "[object WeakMap]",
  set: "[object Set]",
  weakSet: "[object WeakSet]",
  window: "[object Window]",
  webSocket: "[object WebSocket]",
  URLSearchParams: "[object URLSearchParams]",
} as const;

function resolvePrototypeString(value: unknown) {
  return Object.prototype.toString.call(value);
}

export function isString<T extends string>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.string;
}

export function isNumber<T extends number>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.number;
}

export function isBoolean<T extends boolean>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.boolean;
}

export function isObject<T extends Record<PropertyKey, unknown>>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.object;
}

export function isArray<T extends unknown[]>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.array;
}

export function isBigInt<T extends bigint>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.bigInt;
}

export function isSymbol<T extends symbol>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.symbol;
}

export function isFunction<T extends Func>(value: unknown): value is T {
  const prototypeList: string[] = [prototypes.function, prototypes.generatorFunction, prototypes.asyncFunction];

  return prototypeList.includes(resolvePrototypeString(value));
}

export function isGeneratorFunction<T extends Func>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.generatorFunction;
}

export function isAsyncFunction<T extends AsyncFunc>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.asyncFunction;
}

export function isPromise<T extends Promise<unknown>>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.promise;
}

export function isPromiseLike<T extends PromiseLike<unknown>>(value: unknown): value is T {
  return isPromise(value) || (isObject(value) && isFunction(value["then"]));
}

export function isNull<T extends null>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.null;
}

export function isUndefined<T extends undefined>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.undefined;
}

export function isDate<T extends Date>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.date;
}

export function isRegExp<T extends RegExp>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.regExp;
}

export function isError<T extends Error>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.error;
}

export function isFile<T extends File>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.file;
}

export function isMap<T extends Map<unknown, unknown>>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.map;
}

export function isWeakMap<T extends WeakMap<AnyObject, unknown>>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.weakMap;
}

export function isSet<T extends Set<unknown>>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.set;
}

export function isWeakSet<T extends WeakSet<AnyObject>>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.weakSet;
}

export function isWindow<T extends Window>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.window;
}

export function isWebSocket<T extends WebSocket>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.webSocket;
}

export function isURLSearchParams<T extends Window>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypes.URLSearchParams;
}

export function isClass<T extends Class<AnyObject>>(value: unknown): value is T {
  return resolvePrototypeString(value).startsWith("class ");
}

export function isInteger<T extends number>(value: unknown): value is T {
  return Number.isInteger(value);
}

export function isIterable<T extends Iterable<unknown>>(value: unknown): value is T {
  return isObject(value) && Symbol.iterator in value;
}

/**
 * 判断给定的值是否相等
 * @reference https://github.com/radashi-org/radashi/blob/main/src/typed/isEqual.ts
 *
 * @param {T} x
 * @param {T} y
 */
export function isEqual<T>(x: T, y: T): boolean {
  if (Object.is(x, y)) {
    return true;
  }
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime();
  }
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.toString() === y.toString();
  }
  if (typeof x !== "object" || x === null || typeof y !== "object" || y === null) {
    return false;
  }

  const keysX = Reflect.ownKeys(x) as (keyof typeof x)[];
  const keysY = Reflect.ownKeys(y);
  if (keysX.length !== keysY.length) {
    return false;
  }

  for (const key of keysX) {
    if (!Reflect.has(y, key)) {
      return false;
    }
    if (!isEqual(x[key], y[key])) {
      return false;
    }
  }

  return true;
}
