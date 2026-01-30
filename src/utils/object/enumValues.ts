import type { AnyObject, PlainObject } from "@pawover/types";
import type { UnionToTuple, ValueOf } from "type-fest";
import { objectValues } from "..";
import { isEnumeration } from "../typeof";

/**
 * 获取枚举所有属性的值
 *
 * @param enumeration 枚举对象
 * @returns 值数组
 * @example
 * ```ts
 * enum A { k = "v" }
 * enumValues(A); // ["v"]
 * ```
 */
export function enumValues<E extends PlainObject>(enumeration: E): UnionToTuple<ValueOf<E>>;
export function enumValues<E extends AnyObject>(enumeration: E): UnionToTuple<ValueOf<E>>;
export function enumValues(enumeration: AnyObject) {
  const [isEnum, isTwoWayEnum] = isEnumeration(enumeration);

  if (!isEnum) {
    throw Error("function enumValues expected parameter is a enum, and requires at least one member");
  }

  const values = objectValues(enumeration);

  if (isTwoWayEnum) {
    return values.splice(values.length / 2, values.length / 2);
  }

  return values;
}

