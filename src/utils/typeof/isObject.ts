import { prototypeStrings, resolvePrototypeString } from "./types";

export function isObject<T extends Record<PropertyKey, unknown>>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.object;
}
