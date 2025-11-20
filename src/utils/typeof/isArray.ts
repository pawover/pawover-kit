import { prototypeStrings, resolvePrototypeString } from "./types";

export function isArray<T extends unknown[]>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.array;
}
