import type { BigNumber, MathExpression, MathJsInstance, Matrix } from "mathjs";
import { toMathBignumber } from "./toMathBignumber";

/**
 * 数学表达式求值
 *
 * @param mathJsInstance mathJs 实例
 * @param expr 表达式
 * @param scope 键值映射
 * @returns 计算结果的字符串表示
 * @example
 * ```ts
 * toMathEvaluate(math, "a + b", { a: 1, b: 2 }); // "3"
 * ```
 */
export function toMathEvaluate(mathJsInstance: MathJsInstance, expr: MathExpression | Matrix, scope?: Record<string, BigNumber>): string {
  const evaluateValue = `${mathJsInstance.evaluate(expr, scope || {})}`;

  return mathJsInstance.format(toMathBignumber(mathJsInstance, evaluateValue), { notation: "fixed" });
}
