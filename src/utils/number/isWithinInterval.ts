import { isInfinity, isNumber } from "../typeof";

/**
 * 数字区间检查函数
 *
 * @param input 待检查数字
 * @param interval 由两个数字组成的元组 [left, right]
 * @param includeLeft 是否包含左边界（默认 true）
 * @param includeRight 是否包含右边界（默认 false）
 * @returns 是否在区间内
 * @example
 * ```ts
 * isWithinInterval(5, [1, 10]); // true
 * isWithinInterval(1, [1, 10], false); // false
 * ```
 */
export function isWithinInterval (input: number, interval: [number, number], includeLeft = true, includeRight = false) {
  if (!isNumber(input)) {
    throw new Error("params [input] mast be a number.");
  }

  if (isInfinity(input)) {
    throw new Error("params [input] mast be a finite number.");
  }

  const [left, right] = interval;

  if (left > right) {
    throw new Error(`Invalid interval: left (${left}) must be <= right (${right}).`);
  }

  if (includeLeft && includeRight) {
    return input >= left && input <= right;
  } else if (includeLeft) {
    return input >= left && input < right;
  } else if (includeRight) {
    return input > left && input <= right;
  } else {
    return input > left && input < right;
  }
}
