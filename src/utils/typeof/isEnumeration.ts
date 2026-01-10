import { isObject } from ".";

/**
 * 判断一个值是否为有效的枚举对象
 * - 枚举不能为空
 * - 枚举所有的值必须是 string 或 number
 *
 * @param obj
 * @returns
 */
export function isEnumeration(obj: unknown): [boolean, boolean] {
  if (!isObject(obj)) {
    return [false, false];
  }

  const keys = Object.keys(obj);
  if (!keys.length) {
    return [false, false];
  }

  const values = Object.values(obj);
  if (!values.every((v) => typeof v === "string" || typeof v === "number")) {
    return [false, false];
  }

  const isTwoWayEnum = keys.every((k) => values.some((v) => v.toString() === k));

  return [true, isTwoWayEnum];
}
