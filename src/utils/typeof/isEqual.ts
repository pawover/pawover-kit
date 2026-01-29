import { isDate, isRegExp } from ".";

/**
 * 检查给定的值是否相等
 * @reference https://github.com/radashi-org/radashi/blob/main/src/typed/isEqual.ts
 *
 * @param x
 * @param y
 */
export function isEqual<T>(x: T, y: T): boolean {
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
