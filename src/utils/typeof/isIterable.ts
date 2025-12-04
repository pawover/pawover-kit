import { isObject } from "./isObject";

export function isIterable(value: unknown): value is { [Symbol.iterator]: () => Iterator<unknown> } {
  return isObject(value) && Symbol.iterator in value;
}
