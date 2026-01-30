import { isPositiveInteger, isString } from "../typeof";

/**
/**
 * 截取字符串
 * - 支持自定义省略符，不会截断在汉字中间（因为JS字符串本身按字符处理）
 *
 * @param input 待处理字符串
 * @param maxLength 最大长度 (包含省略符)
 * @param ellipsis 省略符，默认为 `...`
 * @returns 截取后的字符串
 * @example
 * ```ts
 * stringTruncate("hello world", 8); // "hello..."
 * ```
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
