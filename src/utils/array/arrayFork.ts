import { isArray } from "../typeof";

/**
 * 数组分组过滤
 * - 给定一个数组和一个条件，返回一个由两个数组组成的元组，其中第一个数组包含所有满足条件的项，第二个数组包含所有不满足条件的项
 *
 * @param initialList 初始数组
 * @param match 条件匹配函数
 * @returns [满足条件的项[], 不满足条件的项[]]
 * @example
 * ```ts
 * arrayFork([1, 2, 3, 4], (n) => n % 2 === 0); // [[2, 4], [1, 3]]
 * ```
 */
export function arrayFork<T> (initialList: readonly T[], match: (row: T, index: number) => boolean): [T[], T[]] {
  const forked: [T[], T[]] = [[], []];

  if (isArray(initialList)) {
    initialList.forEach((item, index) => {
      forked[match(item, index) ? 0 : 1].push(item);
    });
  }

  return forked;
}
