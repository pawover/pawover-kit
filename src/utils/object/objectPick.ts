import type { AnyObject, PlainObject } from "@pawover/types";
import { isArray, isObject } from "../typeof";

/**
 * 选取对象的指定属性
 *
 * @param plainObject 对象
 * @param keys 要选取的属性键数组
 * @returns 包含指定属性的新对象
 * @example
 * ```ts
 * objectPick({ a: 1, b: 2 }, ["a"]); // { a: 1 }
 * ```
 */
export function objectPick<O extends PlainObject, K extends keyof O>(plainObject: O, keys: readonly K[]): Pick<O, K>;
export function objectPick<O extends AnyObject, K extends keyof O>(anyObject: O, keys: readonly K[]): Pick<O, K>;
export function objectPick(obj: object, keys: readonly string[]) {
  const result = {} as PlainObject;

  if (!isObject(obj)) {
    return result;
  }
  if (!isArray(keys)) {
    return obj;
  }

  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }

    return acc;
  }, result);
}
