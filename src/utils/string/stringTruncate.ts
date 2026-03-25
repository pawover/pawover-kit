import { isString, isInteger } from "../typeof";

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
export function stringTruncate (input: string, maxLength: number, ellipsis = "...") {
  if (!isString(input, true)) {
    return "";
  }

  // 将字符串转换为码位数组，以正确处理多字节字符
  const codePoints = Array.from(input);

  if (!isInteger(maxLength) || maxLength < 0) {
    return input;
  }

  // 如果整个字符串（以码位计数）都短于或等于最大长度，则返回原字符串
  if (codePoints.length <= maxLength) {
    return input;
  }

  // 计算可用于原始内容的码位数量
  const availableLength = maxLength - ellipsis.length;

  if (availableLength <= 0) {
    return "";
  }

  const truncated = codePoints.slice(0, availableLength).join("");

  return truncated + ellipsis;
}
