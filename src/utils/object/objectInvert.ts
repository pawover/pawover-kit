import type { AnyObject } from "@pawover/types";
import type { Object } from "ts-toolbelt";
import { isNumber, isObject, isString, isSymbol } from "../typeof";
import { objectEntries } from "./objectEntries";

/**
 * 尽可能地交换对象的键和值
 *
/**
 * 尽可能地交换对象的键和值
 *
 * @param obj 对象
 * @returns 键值互换后的对象
 * @example
 * ```ts
 * const obj = { a: "1", b: 2 };
 * objectInvert(obj); // { "1": "a", 2: "b" }
 * ```
 */
export function objectInvert<const O extends Record<keyof O, PropertyKey>> (plainObject: O): Object.Invert<O>;
export function objectInvert<const O extends AnyObject> (anyObject: O): Object.Invert<O>;
export function objectInvert (obj: AnyObject) {
  const result = {} as Object.Invert<AnyObject>;

  if (!isObject(obj)) {
    return result;
  }

  for (const [k, v] of objectEntries(obj)) {
    if (isString(v) || isNumber(v) || isSymbol(v)) {
      (result as AnyObject)[v] = k;
    }
  }

  return result;
}
