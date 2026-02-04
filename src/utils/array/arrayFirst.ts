import { isArray } from "../typeof";

/**
 * 获取数组第一项
 *
 * @param initialList 初始数组
 * @param saveValue 安全值
 * @returns 数组第一项，如果为空则返回安全值
 * @example
 * ```ts
 * arrayFirst([1, 2]); // 1
 * arrayFirst([], 0); // 0
 * ```
 */
export function arrayFirst<T> (initialList: readonly T[]): T | undefined;
export function arrayFirst<T> (initialList: readonly T[], saveValue: T): T;
export function arrayFirst<T> (initialList: readonly T[], saveValue?: T): T | undefined {
  if (!isArray(initialList) || initialList.length === 0) {
    return saveValue;
  }

  return initialList[0];
}
