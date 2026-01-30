import { isArray } from "../typeof";

/**
 * 获取数组最后一项
 *
 * @param initialList 初始数组
 * @param saveValue 安全值
 * @returns 数组最后一项，如果为空则返回安全值
 * @example
 * ```ts
 * arrayLast([1, 2, 3]); // 3
 * arrayLast([], 0); // 0
 * ```
 */
export function arrayLast<T>(initialList: readonly T[]): T | undefined;
export function arrayLast<T>(initialList: readonly T[], saveValue: T): T;
export function arrayLast<T>(initialList: readonly T[], saveValue?: T): T | undefined {
  if (!isArray(initialList) || initialList.length === 0) {
    return saveValue;
  }

  return initialList[initialList.length - 1];
}
