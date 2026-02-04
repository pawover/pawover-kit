/**
 * 检查 value 是否为 undefined
 * @param value 待检查值
 * @returns 是否为 undefined
 */
export function isUndefined (value: unknown): value is undefined {
  return typeof value === "undefined";
}
