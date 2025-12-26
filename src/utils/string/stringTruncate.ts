import { isPositiveInteger, isString } from "../typeof";

/**
 * 截取字符串
 * - 支持中英文混排，不会在汉字中间截断
 *
 * @param input 待处理字符串
 * @param maxLength 最大长度
 * @param ellipsis 省略符，默认为 `...`
 */
export function stringTruncate(input: string, maxLength: number, ellipsis = "...") {
  if (!isString(input, true)) {
    return "";
  }

  if (!isPositiveInteger(maxLength)) {
    return input;
  }

  if (input.length <= maxLength) {
    return input;
  }

  const truncated = input.slice(0, maxLength - ellipsis.length);

  return truncated.length > 0 ? truncated + ellipsis : "";
}
