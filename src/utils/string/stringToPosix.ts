import { isString } from "../typeof";

/**
 * 将路径转换为 POSIX 风格
 *
/**
 * 将路径转换为 POSIX 风格
 * - 统一使用正斜杠
 * - 处理 Windows 盘符
 *
 * @param input 待处理字符串
 * @param removeLeadingSlash 是否移除开头斜杠，默认为 `false`
 * @returns 转换后的路径
 * @example
 * ```ts
 * stringToPosix("C:\\Windows\\System32"); // "/Windows/System32"
 * ```
 */
export function stringToPosix (input: string | null | undefined, removeLeadingSlash = false) {
  if (!isString(input, true)) {
    return "";
  }

  // 1. 移除盘符（Windows）和开头的根路径（/ 或 \），将开头斜杠序列标准化为单个斜杠
  let normalized = input.replace(/^[A-Za-z]:[\\/]?/, "").replace(/^[\\/]+/, "/");
  // 2. 替换所有反斜杠为正斜杠
  normalized = normalized.replace(/\\/g, "/");
  // 3. 合并连续斜杠
  normalized = normalized.replace(/\/+/g, "/");
  // 4. 移除开头斜杠
  if (removeLeadingSlash && normalized.startsWith("/")) {
    normalized = normalized.substring(1);
  }

  return normalized;
}
