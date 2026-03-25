import type { MatchFunction } from "../../types/index.type";
import { isArray, isFunction } from "../typeof";

/**
 * 数组项替换
 * - 在给定的数组中，替换符合匹配函数结果的项目
 * - 只替换第一个匹配项
 *
 * @param initialList 初始数组
 * @param newItem 替换项
 * @param match 匹配函数
 * @returns 替换后的新数组
 * @example
 * ```ts
 * arrayReplace([1, 2, 3], 4, (n) => n === 2); // [1, 4, 3]
 * ```
 */
export function arrayReplace<const T> (initialList: readonly T[], newItem: T, match: MatchFunction<T, boolean>): T[];
export function arrayReplace<const T, K extends T> (initialList: readonly T[], newItem: K, match: MatchFunction<T, boolean>): T[];
export function arrayReplace<const T, K> (initialList: readonly T[], newItem: K, match: MatchFunction<T, boolean>): (T | K)[];
export function arrayReplace<const T, K> (initialList: readonly T[], newItem: K, match: MatchFunction<T, boolean>): (T | K)[] {
  if (!isArray(initialList) || !initialList.length) {
    return [];
  }
  if (!isFunction(match)) {
    return [...initialList];
  }

  for (let i = 0; i < initialList.length; i++) {
    const item = initialList[i]!;
    if (match(item, i)) {
      return [...initialList.slice(0, i), newItem, ...initialList.slice(i + 1, initialList.length)] as (T | K)[];
    }
  }

  return [...initialList];
}
