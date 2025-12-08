import type { BigNumber, MathJsInstance } from "mathjs";
import { toMathBignumber } from "./toMathBignumber";

/**
 * 将任意类型的值转换为十进制数字字符串
 *
 * @param mathJsInstance mathJs 实例
 * @param value 任意类型的值
 * @param precision 精度
 * @param isFormat 是否格式化为字符串
 */
export function toMathDecimal(mathJsInstance: MathJsInstance, value: unknown, precision?: number | undefined, isFormat?: true): string;
export function toMathDecimal(mathJsInstance: MathJsInstance, value: unknown, precision?: number | undefined, isFormat?: false): BigNumber;
export function toMathDecimal(mathJsInstance: MathJsInstance, value: unknown, precision?: number | undefined, isFormat = true): string | BigNumber {
  const bigNumber = toMathBignumber(mathJsInstance, value);

  return isFormat ? mathJsInstance.format(bigNumber, { notation: "fixed", precision: precision! }) : bigNumber;
}
