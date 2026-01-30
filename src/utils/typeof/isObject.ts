import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 判断是否为对象类型
 * - 可选是否检查原型为 `Object.prototype`，防止原型链污染
 *
 * @param value 待检查值
 * @param prototypeCheck 是否进行原型检查，默认 `true`
 * @returns 是否为 Plain Object (当 checkPrototype=true) 或 object
 * @example
 * ```ts
 * isObject({}); // true
 * isObject(new Date()); // false (because prototype is not Object.prototype)
 * isObject(new Date(), false); // true (is object type)
 * ```
 */
export function isObject(value: unknown, prototypeCheck = true): value is Record<PropertyKey, unknown> {
  const check = resolvePrototypeString(value) === PROTOTYPE_TAGS.object;

  return prototypeCheck ? check && Object.getPrototypeOf(value) === Object.prototype : check;
}
