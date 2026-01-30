/**
 * 检查 value 是否为 BigInt
 * @param value 待检查值
 * @returns 是否为 BigInt
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === "bigint";
}
