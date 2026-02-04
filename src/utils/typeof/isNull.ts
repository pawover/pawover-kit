/**
 * 检查 value 是否为 null
 * @param value 待检查值
 * @returns 是否为 null
 */
export function isNull (value: unknown): value is null {
  return value === null;
}
