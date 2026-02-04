import type { AnyObject } from "@pawover/types";

/**
 * 检查 value 是否为可迭代对象 (Iterable)
 * @param value 待检查值
 * @returns 是否为 Iterable
 */
export function isIterable (value: unknown): value is { [Symbol.iterator]: () => Iterator<unknown> } {
  return !!value && typeof (value as AnyObject)[Symbol.iterator] === "function";
}
