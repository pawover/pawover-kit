import { isNaN, isNull, isUndefined } from ".";

/**
 * 检查 value 是否为 Falsy 值 (false, 0, "", null, undefined, NaN)
 * @param value 待检查值
 * @returns 是否为 Falsy
 */
export function isFalsy (value: unknown): value is false | 0 | "" | null | undefined {
  if (isNaN(value) || isNull(value) || isUndefined(value)) {
    return true;
  }

  return value === false || value === 0 || value === 0n || value === "";
}

export function isFalsyLike (value: unknown): boolean {
  if (isFalsy(value)) {
    return true;
  }

  return typeof value === "string" && (value === "null" || value === "undefined" || value === "NaN" || value === "false" || value === "0" || value === "0n");
}
