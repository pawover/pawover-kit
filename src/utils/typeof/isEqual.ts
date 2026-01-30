import { isDate, isRegExp } from ".";

/**
 * 深度比较两个值是否相等
 *
 * @param value 待比较值 A
 * @param other 待比较值 B
 * @returns 是否相等
 * @example
 * ```ts
 * isEqual({ a: 1 }, { a: 1 }); // true
 * ```
 */
export function isEqual(x: unknown, y: unknown): boolean {
  if (Object.is(x, y)) {
    return true;
  }
  if (isDate(x) && isDate(y)) {
    return x.getTime() === y.getTime();
  }
  if (isRegExp(x) && isRegExp(y)) {
    return x.toString() === y.toString();
  }
  if (typeof x !== "object" || x === null || typeof y !== "object" || y === null) {
    return false;
  }

  const keysX = Reflect.ownKeys(x) as (keyof typeof x)[];
  const keysY = Reflect.ownKeys(y);
  if (keysX.length !== keysY.length) {
    return false;
  }

  for (const key of keysX) {
    if (!Reflect.has(y, key)) {
      return false;
    }
    if (!isEqual(x[key], y[key])) {
      return false;
    }
  }

  return true;
}
