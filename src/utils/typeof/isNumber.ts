export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

/**
 * 检查 value 是否为整数
 *
 * @param value - 待检查值
 * @param safeCheck - 是否附加安全数检查
 */
export function isInteger(value: unknown, safeCheck = true): value is number {
  const check = Number.isInteger(value);

  return safeCheck ? check && Number.isSafeInteger(value) : check;
}

/**
 * 检查 value 是否为正整数
 * - 未考虑 value 为 0 的情况
 *
 * @param value - 待检查值
 * @param safeCheck - 是否附加安全数检查
 */
export function isPositiveInteger(value: unknown, safeCheck = true): value is number {
  return isInteger(value, safeCheck) && value > 0;
}

/**
 * 检查 value 是否为负整数
 * - 未考虑 value 为 0 的情况
 *
 * @param value - 待检查值
 * @param safeCheck - 是否附加安全数检查
 */
export function isNegativeInteger(value: unknown, safeCheck = true): value is number {
  return isInteger(value, safeCheck) && value < 0;
}

export function isInfinity(value: unknown): value is number {
  return isNumber(value) && (Number.POSITIVE_INFINITY === value || Number.NEGATIVE_INFINITY === value);
}

export function isInfinityLike(value: unknown): boolean {
  return isInfinity(value) && typeof value === "string" && (value === "Infinity" || value === "-Infinity" || value === "+Infinity");
}
