import type { AnyObject, PlainObject } from "@pawover/types";
import { isEnumeration, objectKeys } from "..";

/**
 * 获取所有枚举成员的键
 *
 * @param enumeration 枚举对象
 * @returns 键数组
 * @example
 * ```ts
 * enum A { k = "v" }
 * enumKeys(A); // ["k"]
 * ```
 */
export function enumKeys<E extends PlainObject> (enumeration: E): (keyof E)[];
export function enumKeys<E extends AnyObject> (enumeration: E): (keyof E)[];
export function enumKeys (enumeration: AnyObject) {
  const [isEnum, isBidirectionalEnum] = isEnumeration(enumeration);

  if (!isEnum) {
    throw Error("function enumKeys expected parameter is a enum, and requires at least one member");
  }

  const keys = objectKeys(enumeration);

  if (isBidirectionalEnum) {
    return keys.splice(keys.length / 2, keys.length / 2);
  }

  return keys;
}
