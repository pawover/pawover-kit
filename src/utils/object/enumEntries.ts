import type { AnyObject, PlainObject } from "@pawover/types";
import { objectEntries } from "..";
import { isEnumeration } from "../typeof";

/**
 * 返回枚举的属性的键/值数组
 *
 * @param enumeration 枚举对象
 * @returns 键值对数组
 * @example
 * ```ts
 * enum A { k = "v" }
 * enumEntries(A); // [["k", "v"]]
 * ```
 */
export function enumEntries<E extends PlainObject> (enumeration: E): [keyof E, E[keyof E]][];
export function enumEntries<E extends AnyObject> (enumeration: E): [keyof E, E[keyof E]][];
export function enumEntries (enumeration: AnyObject) {
  const [isEnum, isTwoWayEnum] = isEnumeration(enumeration);

  if (!isEnum) {
    throw Error("function enumEntries expected parameter is a enum, and requires at least one member");
  }

  const entries = objectEntries(enumeration);

  if (isTwoWayEnum) {
    return entries.splice(entries.length / 2, entries.length / 2);
  }

  return entries;
}
