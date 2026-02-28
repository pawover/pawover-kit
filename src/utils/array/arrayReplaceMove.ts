import { isArray, isFunction, isPositiveInteger } from "../typeof";

type PositionType = "start" | "end" | number;
/**
 * 数组项替换并移动
 * - 在给定的数组中，替换并移动符合匹配函数结果的项目
 * - 只替换和移动第一个匹配项
 * - 未匹配时，根据 `position` 在指定位置插入 `newItem`
 *
 * @param initialList 初始数组
 * @param newItem 替换项
 * @param match 匹配函数
 * @param position 移动位置，可选 `start` | `end` | 索引位置， 默认为 `end`
 * @returns
 * @example
 * ```ts
 * arrayReplaceMove([1, 2, 3, 4], 5, (n) => n === 2, 0); // [5, 1, 3, 4]
 * arrayReplaceMove([1, 2, 3, 4], 5, (n) => n === 2, 2); // [1, 3, 5, 4]
 * arrayReplaceMove([1, 2, 3, 4], 5, (n) => n === 2, "start"); // [5, 1, 3, 4]
 * arrayReplaceMove([1, 2, 3, 4], 5, (n) => n === 2); // [1, 3, 4, 5]
 * ```
 */
export function arrayReplaceMove<const T> (
  initialList: readonly T[],
  newItem: T,
  match: (row: T, index: number) => boolean,
  position?: PositionType,
): T[] {
  if (!isArray(initialList)) {
    return [];
  }
  if (!initialList.length) {
    return [newItem];
  }
  if (newItem === undefined || !isFunction(match)) {
    return [...initialList];
  }

  const result = [...initialList];
  const matchIndex = initialList.findIndex(match);

  if (matchIndex !== -1) {
    result.splice(matchIndex, 1) as (typeof newItem)[];
  }

  if (position === "start") {
    result.unshift(newItem);
  } else if (position === 0 || isPositiveInteger(position, false)) {
    result.splice(Math.min(position, result.length), 0, newItem);
  } else {
    result.push(newItem);
  }

  return result;
}
