import type { Assign } from "radashi";
import { isObject } from "../typeof";

/**
 * 递归地将第二个对象合并到第一个对象的副本中
 * - 只有普通对象才会递归合并
 *
 * @param initial 初始对象
 * @param override 待合并对象
 */
export function objectAssign<I extends PlainObject, O extends PlainObject>(initial: I, override: O): Assign<I, O> {
  if (!isObject(initial) || !isObject(override)) {
    return (initial ?? override ?? {}) as Assign<I, O>;
  }

  const proto = Object.getPrototypeOf(initial);
  const assigned = proto ? { ...initial } : Object.assign(Object.create(proto), initial);

  for (const key of Object.keys(override)) {
    assigned[key] = isObject(initial[key]) && isObject(override[key]) ? objectAssign(initial[key], override[key]) : override[key];
  }

  return assigned;
}
