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
export function isEqual (x: unknown, y: unknown): boolean {
  // 使用 WeakMap 记录已比较过的对象对，以防止循环引用导致的无限递归
  const seen = new WeakMap<object, Set<object>>();

  function _isEqual (a: unknown, b: unknown): boolean {
    if (Object.is(a, b)) {
      return true;
    }
    if (isDate(a) && isDate(b)) {
      return a.getTime() === b.getTime();
    }
    if (isRegExp(a) && isRegExp(b)) {
      return a.toString() === b.toString();
    }
    // 如果任一值不是对象或为 null，则它们不相等
    if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
      return false;
    }

    // 检查是否已访问过这对对象，防止循环引用
    if (seen.has(a)) {
      const matchedPairs = seen.get(a)!;
      if (matchedPairs.has(b)) {
        return true; // 如果之前已经确定这对对象相等，则直接返回 true
      }
    } else {
      seen.set(a, new Set());
    }
    // 将当前对象对添加到已访问集合中
    seen.get(a)!.add(b);

    const keysA = Reflect.ownKeys(a) as (keyof typeof a)[];
    const keysB = Reflect.ownKeys(b);
    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!Reflect.has(b, key)) {
        return false;
      }
      if (!_isEqual(a[key], b[key])) {
        // 递归调用内部函数
        return false;
      }
    }

    return true;
  }

  return _isEqual(x, y);
}
