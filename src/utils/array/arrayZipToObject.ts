import type { PlainObject } from "@pawover/types";
import { isArray, isFunction } from "../typeof";

/**
 * 数组压缩为对象
 * - 将键数组和值（数组、函数或静态值）组合成对象
 *
 * @param keys 键数组
 * @param values 值数组、生成值的函数或静态值
 * @returns 生成的对象
 * @example
 * ```ts
 * arrayZipToObject(["a", "b"], [1, 2]); // { a: 1, b: 2 }
 * arrayZipToObject(["a", "b"], (k, i) => k + i); // { a: "a0", b: "b1" }
 * arrayZipToObject(["a", "b"], 1); // { a: 1, b: 1 }
 * ```
 */
export function arrayZipToObject<const K extends PropertyKey, const V> (keys: readonly K[], array: readonly V[]): Record<K, V>;
export function arrayZipToObject<const K extends PropertyKey, const V> (keys: readonly K[], match: ((key: K, index: number) => V)): Record<K, V>;
export function arrayZipToObject<const K extends PropertyKey, const V> (keys: readonly K[], value: V): Record<K, V>;
export function arrayZipToObject<const K extends PropertyKey, const V> (keys: readonly K[], values: V | ((key: K, index: number) => V) | readonly V[]): Record<K, V> {
  const result = {} as PlainObject<K, V>;

  if (!isArray(keys) || !keys.length) {
    return result;
  }

  const getValue = isFunction(values)
    ? values
    : isArray(values)
      ? (_k: K, i: number) => values[i]
      : (_k: K, _i: number) => values;

  return keys.reduce((acc, key, idx) => {
    acc[key] = getValue(key, idx) as V;

    return acc;
  }, result);
}
