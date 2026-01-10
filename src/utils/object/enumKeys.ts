import type { AnyObject, PlainObject } from "@pawover/types";
import { objectKeys } from "..";
import { isEnumeration } from "../typeof";

/**
 * 获取枚举所有属性的键
 *
 * @param enumeration 枚举
 */
export function enumKeys<E extends PlainObject>(enumeration: E): (keyof E)[];
export function enumKeys<E extends AnyObject>(enumeration: E): (keyof E)[];
export function enumKeys(enumeration: AnyObject) {
  const [isEnum, isTwoWayEnum] = isEnumeration(enumeration);

  if (!isEnum) {
    throw Error("function enumKeys expected parameter is a enum, and requires at least one member");
  }

  const keys = objectKeys(enumeration);

  if (isTwoWayEnum) {
    return keys.splice(keys.length / 2, keys.length / 2);
  }

  return keys;
}
