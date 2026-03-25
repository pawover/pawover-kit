import type { PlainObject } from "@pawover/types";
import { objectEntries } from "./objectEntries";
import { isObject } from "../typeof";

/**
 * 映射对象条目
 * - 将对象的键值对映射为新的键值对
 *
 * @param plainObject 对象
 * @param toEntry 映射函数
 * @returns 映射后的新对象
 * @example
 * ```ts
 * const obj = { a: 1, b: 2 };
 * objectMapEntries(obj, (k, v) => [k, v * 2]); // { a: 2, b: 4 }
 * ```
 */
export function objectMapEntries<O extends PlainObject, NK extends PropertyKey, NV> (plainObject: O, toEntry: (key: keyof O, value: O[keyof O]) => [NK, NV]): PlainObject<NK, NV> {
  const defaultResult = {} as PlainObject<NK, NV>;

  if (!isObject(plainObject)) {
    return defaultResult;
  }

  return objectEntries(plainObject).reduce((acc, [key, value]) => {
    const [newKey, newValue] = toEntry(key, value);
    acc[newKey] = newValue;

    return acc;
  }, defaultResult);
}
