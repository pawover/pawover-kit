import { isObject } from "./isObject";

export function isIterable<T extends Iterable<unknown>>(value: unknown): value is T {
  return isObject(value) && Symbol.iterator in value;
}
