import { isObject } from ".";

/**
 * 判断一个值是否为有效的枚举
 * - 枚举不能为空
 * - 枚举所有的值必须是 string 或 number
 *
 * @param enumeration 待检查值
 * @returns 是否为有效的枚举
 */
export function isEnumeration (enumeration: unknown): [boolean, boolean] {
  if (!isObject(enumeration)) {
    return [false, false];
  }

  const keys = Object.keys(enumeration);
  if (!keys.length) {
    return [false, false];
  }

  const values = Object.values(enumeration);
  if (!values.every((v) => typeof v === "string" || typeof v === "number")) {
    return [false, false];
  }

  const isTwoWayEnum = keys.every((k) => values.some((v) => v.toString() === k));

  return [true, isTwoWayEnum];
}
