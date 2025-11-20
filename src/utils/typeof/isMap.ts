import { prototypeStrings, resolvePrototypeString } from "./types";

export function isMap<T extends Map<unknown, unknown>>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.map;
}
