import { isString } from "../typeof";

/**
 * 将路径转换为 POSIX 风格
 * - 统一使用正斜杠 (/)
 * - 可选移除 Windows 盘符 (如 C:)
 * - 可选移除开头的斜杠
 * - 规范化连续斜杠为单个斜杠
 *
 * @param input 待处理字符串
 * @param removeLeadingSlash 是否移除开头斜杠，默认为 `false`。如果移除了盘符，路径通常会以 / 开头，此参数可控制是否保留该 /
 * @returns 转换后的路径，如果输入无效则返回空字符串
 *
 * @example
 * ```ts
 * stringToPosix("C:\\Windows\\System32");
 * // 默认: "/Windows/System32" (移除了 C: 并标准化)
 *
 * stringToPosix("C:\\Windows\\System32", true);
 * // 移除开头斜杠: "Windows/System32"
 *
 * stringToPosix("\\\\server\\share\\file.txt");
 * // UNC 路径: "/server/share/file.txt"
 *
 * stringToPosix("folder\\subfolder\\file.txt");
 * // 相对路径: "folder/subfolder/file.txt"
 * ```
 */
export function stringToPosix (input: string | null | undefined, removeLeadingSlash = false) {
  if (!isString(input, true)) {
    return "";
  }

  // 1. 移除 Windows 盘符 (例如 "C:", "d:") 替换为: 如果盘符后有斜杠，则保留一个正斜杠作为根目录标识；否则不留斜杠
  let normalized = input.replace(/^[A-Za-z]:([\\/])?/, (_, separator) => {
    // 如果盘符后有分隔符 (如 C:\ 或 C:/)，则替换为单个正斜杠 "/"
    // 如果盘符后无分隔符 (如 C:file.txt，这是 Windows 相对当前目录的路径)，则替换为空字符串
    return separator ? "/" : "";
  });
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
