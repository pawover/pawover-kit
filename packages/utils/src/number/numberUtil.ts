import { TypeUtil } from "../type";

/**
 * 数字工具类
 */
export class NumberUtil {
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
   * NumberUtil.within(5, [1, 10]); // true
   * NumberUtil.within(1, [1, 10], false); // false
   * ```
   */
  static within (input: number, interval: [number, number], includeLeft = true, includeRight = false) {
    if (!TypeUtil.isNumber(input) || TypeUtil.isInfinity(input)) {
      throw new Error("function [within] Expected parameter [input] to be a finite number.");
    }

    if (!TypeUtil.isArray(interval) || interval.length !== 2) {
      throw new Error("function [within] Expected parameter [interval] to be a tuple with 2 numbers.");
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
}
