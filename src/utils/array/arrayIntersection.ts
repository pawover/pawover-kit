import type { MatchFunction } from "../../types/index.type";
import { isArray, isFunction } from "../typeof";

/**
 * 求数组交集
 * - 返回在 `initialList` 和 `diffList` 中都存在的元素
 *
 * @param initialList 初始数组
 * @param diffList 对比数组
 * @param match 匹配函数
 * @returns 交集数组
 * @example
 * ```ts
 * arrayIntersection([1, 2], [2, 3]); // [2]
 * arrayIntersection([{ id: 1 }, { id: 2 }], [{ id: 2 }], (x) => x.id); // [{ id: 2 }]
 * ```
 */
export function arrayIntersection<T> (initialList: readonly T[], diffList: readonly T[]): T[];
export function arrayIntersection<T, D = T> (initialList: readonly T[], diffList: readonly D[], match: MatchFunction<T>): T[];
export function arrayIntersection<T> (initialList: readonly T[], diffList: readonly T[], match?: MatchFunction<T>): T[] {
  if (!isArray(initialList) || !isArray(diffList)) {
    return [];
  }
  if (!initialList.length || !diffList.length) {
    return [];
  }

  if (!isFunction(match)) {
    const diffSet = new Set(diffList);

    return initialList.filter((item) => diffSet.has(item));
  }

  const diffKeys = new Set(diffList.map((item, index) => match(item, index)));

  return initialList.filter((item, index) => diffKeys.has(match(item, index)));
}
