import { isFunction } from "./isFunction";
import { isObject } from "./isObject";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 Promise
 * @param value 待检查值
 * @returns 是否为 Promise
 */
export function isPromise (value: unknown): value is Promise<unknown> {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.promise;
}

/**
 * 检查 value 是否为 PromiseLike (thenable)
 * @param value 待检查值
 * @returns 是否为 PromiseLike
 */
export function isPromiseLike (value: unknown): value is PromiseLike<unknown> {
  return isPromise(value) || (isObject(value) && isFunction(value["then"]));
}
