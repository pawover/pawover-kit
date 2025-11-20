export const prototypeStrings = {
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

export function resolvePrototypeString(value: unknown) {
  return Object.prototype.toString.call(value);
}
