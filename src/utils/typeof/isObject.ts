import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 判断是否为对象类型
 * - 可选是否检查原型为 `Object.prototype`，防止原型链污染
 *
 * @param value - 待检查值
 * @param prototypeCheck - 是否进行原型检查，默认 `true`
 */
export function isObject(value: unknown, prototypeCheck = true): value is Record<PropertyKey, unknown> {
  const check = resolvePrototypeString(value) === PROTOTYPE_TAGS.object;

  return prototypeCheck ? check && Object.getPrototypeOf(value) === Object.prototype : check;
}
