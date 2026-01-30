import { isArray, isFunction } from "../typeof";

/**
 * 求数组差集
 * - 返回在 `initialList` 中存在，但在 `diffList` 中不存在的元素
 *
 * @param initialList 初始数组
 * @param diffList 对比数组
 * @param match 匹配函数
 * @returns 差集数组
 * @example
 * ```ts
 * arrayDifference([1, 2, 3], [2, 3, 4]); // [1]
 * arrayDifference([{ id: 1 }, { id: 2 }], [{ id: 2 }], (x) => x.id); // [{ id: 1 }]
 * ```
 */
export function arrayDifference<T>(initialList: readonly T[], diffList: readonly T[], match?: (row: T) => unknown): T[] {
  if (!isArray(initialList) && !isArray(diffList)) {
    return [];
  }
  if (!isArray(initialList) || !initialList.length) {
    return [];
  }
  if (!isArray(diffList) || !diffList.length) {
    return [...initialList];
  }
  if (!isFunction(match)) {
    const arraySet = new Set(diffList);

    return Array.from(new Set(initialList.filter((item) => !arraySet.has(item))));
  }

  const map = new Map<unknown, boolean>();

  diffList.forEach((item) => {
    map.set(match(item), true);
  });

  return initialList.filter((a) => !map.get(match(a)));
}
