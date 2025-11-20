import { prototypeStrings, resolvePrototypeString } from "./types";

export function isWeakSet<T extends WeakSet<AnyObject>>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.weakSet;
}
