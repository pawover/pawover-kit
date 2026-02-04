/**
 * 检查 value 是否为 Boolean
 * @param value 待检查值
 * @returns 是否为 Boolean
 */
export function isBoolean (value: unknown): value is boolean {
  return typeof value === "boolean";
}
