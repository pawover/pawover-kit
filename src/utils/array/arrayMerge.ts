import { isArray, isFunction } from "../typeof";

/**
 * 数组合并
 * - 通过给定的标识符匹配函数，用第二个数组中的匹配项替换第一个数组中匹配项的所有内容
 *
 * @param initialList 初始数组
 * @param mergeList 待合并数组
 * @param match 匹配函数
 */
export function arrayMerge<T>(initialList: readonly T[], mergeList: readonly T[], match: (item: T) => unknown): T[] {
  if (!isArray(initialList)) {
    return [];
  }
  if (!isArray(mergeList)) {
    return [...initialList];
  }
  if (!isFunction(match)) {
    return [...initialList];
  }

  const keys = new Map();
  for (const item of mergeList) {
    keys.set(match(item), item);
  }

  return initialList.map((prevItem) => {
    const key = match(prevItem);

    return keys.has(key) ? keys.get(key)! : prevItem;
  });
}
