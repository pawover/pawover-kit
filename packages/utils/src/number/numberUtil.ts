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
   * @throws {Error} 当 `input` 不是有限数、`interval` 不是两个有限数字组成的二元组，或 `interval[0] > interval[1]` 时抛出
   * @example
   * ```ts
   * NumberUtil.within(5, [1, 10]); // true
   * NumberUtil.within(1, [1, 10], false); // false
   * ```
   */
  static within (input: number, interval: [number, number], includeLeft = true, includeRight = false) {
    assertFiniteNumber("within", "input", input);
    assertInterval("within", interval);

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

  /**
   * 数字区间夹取函数
   * - 入参校验与 `within` 保持一致：`value` 必须为有限数，`interval` 必须为两个有限数字组成的二元组
   *
   * @param value 待夹取数字
   * @param interval 由两个有限数字组成的元组 [lower, upper]，要求 `lower <= upper`
   * @returns 夹取到闭区间 `[lower, upper]` 内的数字
   * @throws {Error} 当 `value` 不是有限数、`interval` 不是两个有限数字组成的二元组，或 `interval[0] > interval[1]` 时抛出
   * @example
   * ```ts
   * NumberUtil.clamp(5, [1, 10]); // 5
   * NumberUtil.clamp(0, [1, 10]); // 1
   * NumberUtil.clamp(11, [1, 10]); // 10
   * NumberUtil.clamp(10, [1, 10]); // 10
   * ```
   */
  static clamp (value: number, interval: [number, number]): number {
    assertFiniteNumber("clamp", "value", value);
    assertInterval("clamp", interval);

    const [lower, upper] = interval;

    if (lower > upper) {
      throw new Error(`Invalid interval: left (${lower}) must be <= right (${upper}).`);
    }

    return Math.min(Math.max(value, lower), upper);
  }
}

function assertFiniteNumber (functionName: string, parameterName: string, value: number): void {
  if (!TypeUtil.isFiniteNumber(value)) {
    throw new Error(`function [${functionName}] Expected parameter [${parameterName}] to be a finite number.`);
  }
}

function assertInterval (functionName: string, interval: [number, number]): void {
  if (!TypeUtil.isArray(interval) || interval.length !== 2 || !interval.every((bound) => TypeUtil.isFiniteNumber(bound))) {
    throw new Error(`function [${functionName}] Expected parameter [interval] to be a tuple with 2 numbers.`);
  }
}
