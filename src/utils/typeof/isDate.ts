import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为有效 Date 对象
 * @param value 待检查值
 * @returns 是否为有效 Date
 */
export function isDate(value: unknown): value is Date {
  if (!value || typeof value !== "object") {
    return false;
  }

  try {
    const isDateObject = resolvePrototypeString(value) === PROTOTYPE_TAGS.date;
    if (!isDateObject) {
      return false;
    }

    const time = (value as Date).getTime();

    // 检查是否为有效日期 (非 Invalid Date)
    return typeof time === "number" && !Number.isNaN(time);
  } catch (error) {
    return false;
  }
}
