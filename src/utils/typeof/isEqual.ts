/**
 * 判断给定的值是否相等
 * @reference https://github.com/radashi-org/radashi/blob/main/src/typed/isEqual.ts
 *
 * @param {T} x
 * @param {T} y
 */
export function isEqual<T>(x: T, y: T): boolean {
  if (Object.is(x, y)) {
    return true;
  }
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime();
  }
  if (x instanceof RegExp && y instanceof RegExp) {
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
