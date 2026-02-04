import { isBoolean } from "./isBoolean";
import { isFunction } from "./isFunction";
import { isString } from "./isString";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 RegExp
 * @param value 待检查值
 * @returns 是否为 RegExp
 */
export function isRegExp (value: unknown): value is RegExp {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  try {
    const regex = value as unknown as RegExp;

    return (
      resolvePrototypeString(value) === PROTOTYPE_TAGS.regExp
      && isString(regex.source)
      && isString(regex.flags)
      && isBoolean(regex.global)
      && isFunction(regex.test)
    );
  } catch (error) {
    return false;
  }
}
