import { prototypeStrings, resolvePrototypeString } from "./types";

/**
 * 判断是否为对象类型
 * - 可选是否检查原型为 `Object.prototype`，防止原型链污染
 *
 * @param value - 待检查值
 * @param prototypeCheck - 是否进行原型检查，默认 `true`
 */
export function isObject<T extends Record<PropertyKey, unknown>>(value: unknown, prototypeCheck = true): value is T {
  const checkValue = resolvePrototypeString(value) === prototypeStrings.object;

  if (prototypeCheck && checkValue) {
    return Object.getPrototypeOf(value) === Object.prototype;
  } else {
    return checkValue;
  }
}
