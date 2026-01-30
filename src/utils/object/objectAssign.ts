import type { AnyObject, PlainObject } from "@pawover/types";
import type { Assign } from "radashi";
import { isObject } from "../typeof";

/**
 * 递归地将第二个对象合并到第一个对象的副本中
 * - 只有普通对象才会递归合并
 *
 * @param initial 初始对象
 * @param override 待合并对象
 * @returns 合并后的新对象
 * @example
 * ```ts
 * const base = { a: 1, b: { c: 2 } };
 * const override = { b: { d: 3 } };
 * objectAssign(base, override); // { a: 1, b: { c: 2, d: 3 } }
 * ```
 */
export function objectAssign<I extends PlainObject, O extends PlainObject>(initial: I, override: O): Assign<I, O>;
export function objectAssign<I extends AnyObject, O extends AnyObject>(initial: I, override: O): Assign<I, O>;
export function objectAssign(initial: AnyObject, override: AnyObject) {
  if (!isObject(initial) || !isObject(override)) {
    return (initial ?? override ?? {});
  }

  const proto = Object.getPrototypeOf(initial);
  const assigned = proto ? { ...initial } : Object.assign(Object.create(proto), initial);

  for (const key of Object.keys(override)) {
    assigned[key] =
      isObject(initial[key]) && isObject(override[key]) ? objectAssign(initial[key], override[key]) : override[key];
  }

  return assigned;
}
