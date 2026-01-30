import { isArray, isFunction } from "../typeof";

/**
 * 数组合并
 * - 如果未提供 `match` 函数，则合并两个数组并去重（Union）
 * - 如果提供了 `match` 函数，则仅更新 `initialList` 中匹配到的项（Left Join Update），不会追加 `mergeList` 中新增的项
 *
 * @param initialList 初始数组
 * @param mergeList 待合并数组
 * @param match 匹配函数
 * @returns 合并后的数组
 * @example
 * ```ts
 * // 基础合并去重
 * arrayMerge([1, 2], [2, 3]); // [1, 2, 3]
 *
 * // 按条件更新
 * const source = [{ id: 1, val: "a" }, { id: 2, val: "b" }];
 * const update = [{ id: 2, val: "new" }, { id: 3, val: "c" }];
 * arrayMerge(source, update, (x) => x.id);
 * // [{ id: 1, val: "a" }, { id: 2, val: "new" }] -> id:3 被忽略
 * ```
 */
export function arrayMerge<T>(initialList: readonly T[], mergeList: readonly T[], match?: (item: T) => unknown): T[] {
  if (!isArray(initialList)) {
    return [];
  }
  if (!isArray(mergeList)) {
    return [...initialList];
  }
  if (!isFunction(match)) {
    return Array.from(new Set([...initialList, ...mergeList]));
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
