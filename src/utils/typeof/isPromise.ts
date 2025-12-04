import { isFunction } from "./isFunction";
import { isObject } from "./isObject";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isPromise(value: unknown): value is Promise<unknown> {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.promise;
}

export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return isPromise(value) || (isObject(value) && isFunction(value["then"]));
}
