import type { AnyObject, PlainObject } from "@pawover/types";
import { isArray, isObject } from "../typeof";

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

  return keys.reduce((acc, curr) => {
    if (curr in obj) {
      acc[curr] = obj[curr];
    }

    return acc;
  }, result);
}
