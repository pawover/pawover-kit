import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 Date 对象
 *
 * @param value 待检查值
 * @param invalidCheck 是否要求日期有效（非 Invalid Date）。默认 true
 *   - true: 仅当是有效 Date 对象时返回 true（排除 new Date('invalid')）
 *   - false: 只要 [[Prototype]] 是 Date 即返回 true（包含 Invalid Date）
 * @returns 是否为 Date 对象，根据 invalidCheck 返回不同语义的 Date 判定
 *
 * @example
 * ```ts
 * isDate(new Date()); // true
 * isDate(new Date('invalid')); // false
 * isDate(new Date('invalid'), false); // true
 * isDate(null); // false
 * isDate({}); // false
 * ```
 */
export function isDate (value: unknown, invalidCheck = true): value is Date {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (resolvePrototypeString(value) !== PROTOTYPE_TAGS.date) {
    return false;
  }

  if (!invalidCheck) {
    return true;
  }

  // 验证是否为有效日期（排除 Invalid Date）
  try {
    const time = (value as Date).getTime();

    return typeof time === "number" && !Number.isNaN(time);
  } catch {
    return false;
  }
}
