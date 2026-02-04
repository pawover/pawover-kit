import type { PlainObject } from "@pawover/types";
import { objectEntries } from "./objectEntries";

/**
 * 映射对象条目
 * - 将对象的键值对映射为新的键值对
 *
 * @param obj 对象
 * @param toEntry 映射函数
 * @returns 映射后的新对象
 * @example
 * ```ts
 * const obj = { a: 1, b: 2 };
 * mapEntries(obj, (k, v) => [k, v * 2]); // { a: 2, b: 4 }
 * ```
 */
export function mapEntries<K extends PropertyKey, V, NK extends PropertyKey, NV> (obj: PlainObject<K, V>, toEntry: (key: K, value: V) => [NK, NV]): PlainObject<NK, NV> {
  const defaultResult = {} as PlainObject<NK, NV>;

  if (!obj) {
    return defaultResult;
  }

  return objectEntries(obj).reduce((acc, [key, value]) => {
    const [newKey, newValue] = toEntry(key, value);
    acc[newKey] = newValue;

    return acc;
  }, defaultResult);
}
