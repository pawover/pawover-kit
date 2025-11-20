import { prototypeStrings, resolvePrototypeString } from "./types";

export function isWeakMap<T extends WeakMap<AnyObject, unknown>>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.weakMap;
}
