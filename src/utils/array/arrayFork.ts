import { isArray } from "../typeof";

/**
 * 数组分组过滤
 * - 给定一个数组和一个条件，返回一个由两个数组组成的元组，其中第一个数组包含所有满足条件的项，第二个数组包含所有不满足条件的项
 *
 * @param initialList 初始数组
 * @param match 条件匹配函数
 */
export function arrayFork<T>(initialList: readonly T[], match: (item: T) => boolean): [T[], T[]] {
  const forked: [T[], T[]] = [[], []];

  if (isArray(initialList)) {
    for (const item of initialList) {
      forked[match(item) ? 0 : 1].push(item);
    }
  }

  return forked;
}
