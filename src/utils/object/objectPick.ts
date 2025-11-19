import { isArray, isObject } from "../typeof";

export function objectPick<O extends AnyObject, K extends keyof O>(obj: O, keys: readonly K[]): Pick<O, K> {
  const result = {} as unknown as Pick<O, K>;

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
