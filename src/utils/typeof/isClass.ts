import type { AnyFunction, AnyObject } from "@pawover/types";
import type { Class } from "type-fest";
import { isAsyncFunction, isFunction } from ".";

function isConstructable(fn: unknown): boolean {
  try {
    // 尝试用 new 调用（但不执行 constructor）
    Reflect.construct(fn as AnyFunction, []);

    return true;
  } catch {
    return false;
  }
}

export function isClass(value: unknown): value is Class<AnyObject> {
  return (
    isFunction(value) &&
    !isAsyncFunction(value) &&
    Function.prototype.toString.call(value).startsWith("class ") &&
    isConstructable(value) &&
    value.prototype !== undefined
  );
}
