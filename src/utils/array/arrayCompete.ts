import { isArray, isFunction } from "../typeof";

/**
 * 数组竞争
 * - 返回在匹配函数的比较条件中获胜的最终项目，适用于更复杂的最小值/最大值计算
 *
 * @param initialList 数组
 * @param match 匹配函数
 */
export function arrayCompete<T>(initialList: readonly T[], match: (a: T, b: T) => T): T | null {
  if (!isArray(initialList) || initialList.length === 0 || !isFunction(match)) {
    return null;
  }

  return initialList.reduce(match);
}
