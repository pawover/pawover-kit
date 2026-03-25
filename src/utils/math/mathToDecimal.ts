import type { BigNumber, MathJsInstance } from "mathjs";
import { mathToBignumber } from "./mathToBignumber";

/**
 * 将任意类型的值转换为十进制数字字符串
 *
 * @param mathJsInstance mathJs 实例
 * @param value 任意类型的值
 * @param precision 精度
 * @param isFormat 是否格式化为字符串
 * @returns 格式化后的字符串或 BigNumber
 * @example
 * ```ts
 * mathToDecimal(math, 0.12345, 2); // "0.12"
 * ```
 */
export function mathToDecimal (mathJsInstance: MathJsInstance, value: unknown, precision?: number | undefined, isFormat?: true): string;
export function mathToDecimal (mathJsInstance: MathJsInstance, value: unknown, precision?: number | undefined, isFormat?: false): BigNumber;
export function mathToDecimal (mathJsInstance: MathJsInstance, value: unknown, precision?: number | undefined, isFormat = true): string | BigNumber {
  const bigNumber = mathToBignumber(mathJsInstance, value);

  return isFormat ? mathJsInstance.format(bigNumber, { notation: "fixed", precision: precision! }) : bigNumber;
}
