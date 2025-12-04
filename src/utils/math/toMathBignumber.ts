import type { BigNumber, MathJsInstance } from "mathjs";
import { stringToNumber } from "../string/stringToNumber";
import { isFalsyLike, isInfinityLike } from "../typeof";

/**
 * 将任意类型的值转换为 `math.bignumber`
 *
 * @param mathJsInstance mathJs 实例
 * @param value 任意类型的值
 * @param saveValue 安全值
 */
export function toMathBignumber(mathJsInstance: MathJsInstance, value: unknown, saveValue?: BigNumber | undefined): BigNumber {
  const errorValue = saveValue ?? mathJsInstance.bignumber(0);

  if (isFalsyLike(value) || isInfinityLike(value)) {
    return errorValue;
  }

  try {
    return mathJsInstance.bignumber(stringToNumber(`${value}`));
  } catch (error) {
    return errorValue;
  }
}
