import { isFunction } from "./isFunction";
import { isObject } from "./isObject";
import { isPromise } from "./isPromise";

export function isPromiseLike<T extends PromiseLike<unknown>>(value: unknown): value is T {
  return isPromise(value) || (isObject(value) && isFunction(value["then"]));
}
