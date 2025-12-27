import { isString } from "../typeof";

/**
 * 将路径转换为 POSIX 风格
 *
 * @param input 待处理字符串
 * @param removeLeadingSlash 是否移除开头斜杠，默认为 `false`
 */
export function stringToPosix(input: string | null | undefined, removeLeadingSlash = false) {
  if (!isString(input, true)) {
    return "";
  }

  // 1. 移除盘符（Windows）和开头的根路径（/ 或 \）
  let normalized = input.replace(/^[A-Za-z]:[\\/]?/, "").replace(/^[\\/]+/, "");
  // 2. 替换所有反斜杠为正斜杠
  normalized = normalized.replace(/\\/g, "/");
  // 3. 合并连续斜杠
  normalized = normalized.replace(/\/+/g, "/");
  // 4. 移除开头的斜杠
  if (removeLeadingSlash && normalized.startsWith("/")) {
    normalized = normalized.substring(1);
  }

  return normalized;
}
