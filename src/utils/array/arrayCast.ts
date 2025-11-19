import { isArray, isNull, isUndefined } from "../typeof";

export function arrayCast<T>(candidate: T | T[], checkEmpty = true): T[] {
  if (checkEmpty && (isUndefined(candidate) || isNull(candidate))) {
    return [];
  }

  return isArray(candidate) ? [...candidate] : [candidate];
}
