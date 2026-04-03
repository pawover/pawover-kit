const _isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";
export function isReactNative (): boolean {
  return _isReactNative;
}
