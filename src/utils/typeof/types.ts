export const PROTOTYPE_TAGS = {
  string: "[object String]",
  number: "[object Number]",
  boolean: "[object Boolean]",
  object: "[object Object]",
  array: "[object Array]",
  bigInt: "[object BigInt]",
  symbol: "[object Symbol]",
  function: "[object Function]",
  asyncFunction: "[object AsyncFunction]",
  generatorFunction: "[object GeneratorFunction]",
  asyncGeneratorFunction: "[object AsyncGeneratorFunction]",
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
  blob: "[object Blob]",
} as const;

export const TYPED_ARRAY_TAGS = new Set([
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

export function resolvePrototypeString(value: unknown) {
  return Object.prototype.toString.call(value);
}
