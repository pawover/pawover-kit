import type { AnyObject, PlainObject } from "@pawover/types";
import { isArray, isObject } from "../typeof";

/**
 * 排除对象的指定属性
 *
 * @param plainObject 对象
 * @param keys 要排除的属性键数组
 * @returns 排除指定属性后的新对象
 * @example
 * ```ts
 * objectOmit({ a: 1, b: 2 }, ["a"]); // { b: 2 }
 * ```
 */
export function objectOmit<O extends PlainObject, K extends keyof O> (plainObject: O, keys: readonly K[]): Omit<O, K>;
export function objectOmit<O extends AnyObject, K extends keyof O> (anyObject: O, keys: readonly K[]): Omit<O, K>;
export function objectOmit (obj: object, keys: readonly string[]) {
  const result = {} as PlainObject;

  if (!isObject(obj)) {
    return result;
  }
  if (!isArray(keys)) {
    return obj;
  }

  const keysToOmit = new Set(keys);

  return Object.keys(obj).reduce((acc, key) => {
    if (!keysToOmit.has(key)) {
      acc[key] = obj[key];
    }

    return acc;
  }, result);
}
