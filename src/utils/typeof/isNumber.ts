/**
 * 检查 value 是否为 number 类型
 *
 * @param value - 待检查值
 * @param checkNaN - 是否排除 `NaN`，默认为 `true`
 */
export function isNumber(value: unknown, checkNaN = true): value is number {
  return typeof value === "number" && (!checkNaN || !isNaN(value));
}

/**
 * 检查 value 是否为 NaN
 *
 * @param value - 待检查值
 */
export function isNaN(value: unknown): value is number {
  return Number.isNaN(value);
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
 * - 此函数中 `0` 不被视为正整数
 *
 * @param value - 待检查值
 * @param safeCheck - 是否附加安全数检查
 */
export function isPositiveInteger(value: unknown, safeCheck = true): value is number {
  return isInteger(value, safeCheck) && value > 0;
}

/**
 * 检查 value 是否为负整数
 * - 此函数中 `0` 不被视为负整数
 *
 * @param value - 待检查值
 * @param safeCheck - 是否附加安全数检查
 */
export function isNegativeInteger(value: unknown, safeCheck = true): value is number {
  return isInteger(value, safeCheck) && value < 0;
}

/**
 * 检查 value 是否为 Infinity
 * - 排除 `NaN`
 *
 * @param value - 待检查值
 */
export function isInfinity(value: unknown): value is number {
  return isNumber(value) && (Number.POSITIVE_INFINITY === value || Number.NEGATIVE_INFINITY === value);
}

/**
 * 检查 value 是否类似 Infinity
 * - 排除 `NaN`
 *
 * @param value - 待检查值
 */
export function isInfinityLike(value: unknown): boolean {
  const check = isInfinity(value);

  if (check) {
    return check;
  }

  if (typeof value === "string") {
    const v = value.trim().toLowerCase();

    return v === "infinity" || v === "-infinity" || v === "+infinity";
  }

  return false;
}
