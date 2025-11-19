import type { NonEmptyObject } from "type-fest";
import { isObject } from "../typeof";
import { objectEntries } from "./objectEntries";

/**
 * 对象反转
 * - 返回交换了对象的可枚举属性的值/键对象
 *
 * @param obj 对象
 */
export function objectSwitch<O extends AnyObject>(obj: NonEmptyObject<O>): Record<O[keyof O], keyof O> {
  const result = {} as unknown as Record<O[keyof O], keyof O>;

  if (!isObject(obj)) {
    return result;
  }

  for (const [k, v] of objectEntries(obj)) {
    result[v] = k;
  }

  return result;
}
