export const PROTOTYPE_TAGS = Object.freeze({
  abortSignal: "[object AbortSignal]",
  array: "[object Array]",
  asyncFunction: "[object AsyncFunction]",
  asyncGeneratorFunction: "[object AsyncGeneratorFunction]",
  bigInt: "[object BigInt]",
  blob: "[object Blob]",
  boolean: "[object Boolean]",
  date: "[object Date]",
  error: "[object Error]",
  file: "[object File]",
  function: "[object Function]",
  generatorFunction: "[object GeneratorFunction]",
  global: "[object global]",
  iframe: "[object HTMLIFrameElement]",
  map: "[object Map]",
  null: "[object Null]",
  number: "[object Number]",
  object: "[object Object]",
  promise: "[object Promise]",
  readableStream: "[object ReadableStream]",
  regExp: "[object RegExp]",
  set: "[object Set]",
  string: "[object String]",
  symbol: "[object Symbol]",
  undefined: "[object Undefined]",
  URLSearchParams: "[object URLSearchParams]",
  weakMap: "[object WeakMap]",
  weakSet: "[object WeakSet]",
  webSocket: "[object WebSocket]",
  window: "[object Window]",
} as const);

export const TYPED_ARRAY_TAGS: ReadonlySet<string> = new Set([
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
 * 获取值的 [[Prototype]] 标签（通过 Object.prototype.toString）
 *
 * @example
 * resolvePrototypeString([]) // "[object Array]"
 * resolvePrototypeString(null) // "[object Null]"
 *
 * @param value - 任意 JavaScript 值
 * @returns 标准化的类型标签字符串
 */
export function resolvePrototypeString (value: unknown): string {
  return Object.prototype.toString.call(value);
}
