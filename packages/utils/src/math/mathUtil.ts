import type { BigNumber, MathExpression, MathJsInstance, Matrix } from "mathjs";

import { StringUtil } from "../string";
import { TypeUtil } from "../type";

/**
 * 数学工具类
 * - 基于 [`mathjs`](https://mathjs.org)
 */
export class MathUtil {
  /**
   * 将任意类型的值转换为 `math.bignumber`
   *
   * @param mathJsInstance mathJs 实例
   * @param value 任意类型的值
   * @param fallback 回退值
   * @returns 转换后的 BigNumber
   * @example
   * ```ts
   * import { create, all } from "mathjs";
   * const math = create(all);
   * MathUtil.toBignumber(math, "0.1");
   * ```
   */
  static toBignumber (mathJsInstance: MathJsInstance, value: unknown, fallback?: BigNumber | undefined): BigNumber {
    const errorValue = fallback ?? mathJsInstance.bignumber(0);

    if (TypeUtil.isFalsyLike(value) || TypeUtil.isInfinityLike(value)) {
      return errorValue;
    }

    try {
      return mathJsInstance.bignumber(StringUtil.toNumber(`${value}`));
    } catch (error) {
      return errorValue;
    }
  }

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
   * MathUtil.toDecimal(math, 0.12345, 2); // "0.12"
   * ```
   */
  static toDecimal (mathJsInstance: MathJsInstance, value: unknown, precision?: number | undefined, isFormat?: true | undefined,): string;
  static toDecimal (mathJsInstance: MathJsInstance, value: unknown, precision?: number | undefined, isFormat?: false | undefined,): BigNumber;
  static toDecimal (mathJsInstance: MathJsInstance, value: unknown, precision?: number | undefined, isFormat = true): string | BigNumber {
    const bigNumber = MathUtil.toBignumber(mathJsInstance, value);

    return isFormat ? mathJsInstance.format(bigNumber, { notation: "fixed", precision: precision! }) : bigNumber;
  }

  /**
   * 数学表达式求值
   *
   * @param mathJsInstance mathJs 实例
   * @param expr 表达式
   * @param scope 键值映射
   * @returns 计算结果的字符串表示
   * @example
   * ```ts
   * MathUtil.toEvaluate(math, "a + b", { a: 1, b: 2 }); // "3"
   * ```
   */
  static toEvaluate (mathJsInstance: MathJsInstance, expr: MathExpression | Matrix, scope?: Record<string, BigNumber> | undefined): string {
    const evaluateValue = `${mathJsInstance.evaluate(expr, scope || {})}`;

    return mathJsInstance.format(MathUtil.toBignumber(mathJsInstance, evaluateValue), { notation: "fixed" });
  }
}
