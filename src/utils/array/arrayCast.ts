import { isArray, isNull, isUndefined } from "../typeof";

/**
 * 构造数组
 * @param candidate 待构造项
 * @param checkEmpty 是否检查 `undefined` 和 `null`，默认为 `true`
 * @returns 构造后的数组
 * @example
 * ```ts
 * arrayCast(1); // [1]
 * arrayCast([1, 2]); // [1, 2]
 * arrayCast(null); // []
 * arrayCast(undefined); // []
 * arrayCast(null, false); // [null]
 * ```
 */
export function arrayCast<T>(candidate: T | T[] | null | undefined, checkEmpty?: true): NonNullable<T>[];
export function arrayCast<T>(candidate: T | T[] | null | undefined, checkEmpty?: false): T[];
export function arrayCast<T>(candidate: T | T[] | null | undefined, checkEmpty = true): T[] {
  if (checkEmpty && (isUndefined(candidate) || isNull(candidate))) {
    return [];
  }

  return isArray(candidate) ? [...candidate] : [candidate as T];
}
