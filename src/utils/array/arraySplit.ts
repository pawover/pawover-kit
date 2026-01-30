import { isArray } from "../typeof";

/**
 * 数组切分
 * - 将数组以指定的长度切分后，组合在高维数组中
 *
 * @param initialList 初始数组
 * @param size 分割尺寸，默认 `10`
 * @returns 切分后的二维数组
 * @example
 * ```ts
 * arraySplit([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 * ```
 */
export function arraySplit<T>(initialList: readonly T[], size = 10): T[][] {
  if (!isArray(initialList)) {
    return [];
  }

  const count = Math.ceil(initialList.length / size);

  return Array.from({ length: count })
    .fill(null)
    .map((_c, i) => {
      return initialList.slice(i * size, i * size + size);
    });
}
