import type { PlainObject } from "@pawover/types";
import { isArray, isFunction } from "../typeof";

export function arrayZipToObject<const K extends PropertyKey, const V>(keys: readonly K[], array: readonly V[]): Record<K, V>;
export function arrayZipToObject<const K extends PropertyKey, const V>(keys: readonly K[], match: ((key: K, index: number) => V)): Record<K, V>;
export function arrayZipToObject<const K extends PropertyKey, const V>(keys: readonly K[], value: V): Record<K, V>;
export function arrayZipToObject<const K extends PropertyKey, const V>(keys: readonly K[], values: V | ((key: K, index: number) => V) | readonly V[]): Record<K, V> {
  const result = {} as PlainObject<K, V>;

  if (!isArray(keys) || !keys.length) {
    return result;
  }

  const getValue = isFunction(values)
    ? values
    : isArray(values)
      ? (_k: K, i: number) => values[i]
      : (_k: K, _i: number) => values;

  return keys.reduce(
    (acc, key, idx) => {
      acc[key] = getValue(key, idx) as V;

      return acc;
    },
    result,
  );
}
