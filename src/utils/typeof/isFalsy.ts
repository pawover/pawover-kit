import { isNaN, isNull, isUndefined } from ".";

export function isFalsy(value: unknown): boolean {
  if (isNaN(value) || isNull(value) || isUndefined(value)) {
    return true;
  }

  return value === false || value === 0 || value === 0n || value === "";
}

export function isFalsyLike(value: unknown): boolean {
  if (isFalsy(value)) {
    return true;
  }

  return typeof value === "string" && (value === "null" || value === "undefined" || value === "NaN" || value === "false" || value === "0" || value === "0n");
}
