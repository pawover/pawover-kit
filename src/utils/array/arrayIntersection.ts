import { isArray, isFunction } from "../typeof";

/**
 * 求数组交集
 *
 * @param initialList 初始数组
 * @param diffList 对比数组
 * @param match 匹配函数
 */
export function arrayIntersection<T>(initialList: readonly T[], diffList: readonly T[], match?: (row: T) => unknown): T[] {
  if (!isArray(initialList) && !isArray(diffList)) {
    return [];
  }
  if (!isArray(initialList) || !initialList.length) {
    return [...diffList];
  }
  if (!isArray(diffList) || !diffList.length) {
    return [...initialList];
  }
  if (!isFunction(match)) {
    const arraySet = new Set(diffList);

    return Array.from(new Set(initialList.filter((item) => arraySet.has(item))));
  }

  const map = new Map<unknown, boolean>();

  diffList.forEach((item) => {
    map.set(match(item), true);
  });

  return initialList.filter((a) => map.get(match(a)));
}
