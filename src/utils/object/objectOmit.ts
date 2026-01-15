import type { AnyObject, PlainObject } from "@pawover/types";
import { isArray, isObject } from "../typeof";

export function objectOmit<O extends PlainObject, K extends keyof O>(plainObject: O, keys: readonly K[]): Pick<O, K>;
export function objectOmit<O extends AnyObject, K extends keyof O>(anyObject: O, keys: readonly K[]): Pick<O, K>;
export function objectOmit(obj: object, keys: readonly string[]) {
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
