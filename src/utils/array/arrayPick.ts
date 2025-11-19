import { isArray, isFunction } from "../typeof";

/**
 * 数组选择
 * - 一次性应用 `filter` 和 `map` 操作
 *
 * @param initialList 初始数组
 * @param filter filter 函数
 * @param mapper map 函数
 */
export function arrayPick<T, K = T>(initialList: readonly T[], filter: (row: T, index: number) => boolean, mapper?: ((row: T, index: number) => K) | undefined) {
  if (!isArray(initialList)) {
    return [];
  }
  if (!isFunction(filter)) {
    return [...initialList];
  }

  const hasMapper = isFunction(mapper);

  return initialList.reduce<K[]>((prev, curr, index) => {
    if (!filter(curr, index)) {
      return prev;
    }
    if (hasMapper) {
      prev.push(mapper(curr, index));
    } else {
      prev.push(curr as unknown as K);
    }

    return prev;
  }, []);
}
