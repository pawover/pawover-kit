import type { AnyFunction, AnyObject } from "@pawover/types";
import type { Class } from "type-fest";
import { isAsyncFunction, isFunction } from "./isFunction";

function isConstructable(fn: unknown): boolean {
  try {
    // 尝试用 new 调用（但不执行 constructor）
    Reflect.construct(fn as AnyFunction, []);

    return true;
  } catch {
    return false;
  }
}

/**
 * 检查 value 是否为 Class
 *
 * @param value 待检查值
 * @returns 是否为 Class
 * @example
 * ```ts
 * class A {}
 * isClass(A); // true
 * isClass(() => {}); // false
 * ```
 */
export function isClass(value: unknown): value is Class<AnyObject> {
  return (
    isFunction(value) &&
    !isAsyncFunction(value) &&
    Function.prototype.toString.call(value).startsWith("class ") &&
    isConstructable(value) &&
    value.prototype !== undefined
  );
}
