/**
 * 检查 value 是否为 string 类型
 *
 * @param value 待检查值
 * @param checkEmpty 是否排除空字符串
 * @returns 是否为字符串
 * @example
 * ```ts
 * isString("abc"); // true
 * isString(""); // true
 * isString("", true); // false
 * ```
 */
export function isString (value: unknown, checkEmpty = false): value is string {
  return typeof value === "string" && (!checkEmpty || !!value.length);
}
