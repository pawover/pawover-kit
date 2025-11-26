import { isArray, isNull, isUndefined } from "../typeof";

/**
 * 构造数组
 * @param candidate 待构造项
 * @param checkEmpty 是否检查 `undefined` 和 `null`
 */
export function arrayCast<T>(candidate: T | T[], checkEmpty = true): T[] {
  if (checkEmpty && (isUndefined(candidate) || isNull(candidate))) {
    return [];
  }

  return isArray(candidate) ? [...candidate] : [candidate];
}
