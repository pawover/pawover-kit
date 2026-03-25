import type { AnyObject, PlainObject } from "@pawover/types";
import type { UnionToTuple, ValueOf } from "type-fest";
import { isEnumeration, objectValues } from "..";

/**
 * 获取所有枚举成员的值
 *
 * @param enumeration 枚举对象
 * @returns 值数组
 * @example
 * ```ts
 * enum A { k = "v" }
 * enumValues(A); // ["v"]
 * ```
 */
export function enumValues<E extends PlainObject> (enumeration: E): UnionToTuple<ValueOf<E>>;
export function enumValues<E extends AnyObject> (enumeration: E): UnionToTuple<ValueOf<E>>;
export function enumValues (enumeration: AnyObject) {
  const [isEnum, isBidirectionalEnum] = isEnumeration(enumeration);

  if (!isEnum) {
    throw Error("function enumValues expected parameter is a enum, and requires at least one member");
  }

  const values = objectValues(enumeration);

  if (isBidirectionalEnum) {
    return values.splice(values.length / 2, values.length / 2);
  }

  return values;
}
