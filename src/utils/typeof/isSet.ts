import { prototypeStrings, resolvePrototypeString } from "./types";

export function isSet<T extends Set<unknown>>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.set;
}
