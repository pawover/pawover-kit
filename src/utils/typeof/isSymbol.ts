/**
 * 检查 value 是否为 Symbol
 * @param value 待检查值
 * @returns 是否为 Symbol
 */
export function isSymbol (value: unknown): value is symbol {
  return typeof value === "symbol";
}
