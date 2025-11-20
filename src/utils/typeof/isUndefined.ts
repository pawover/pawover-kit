import { prototypeStrings, resolvePrototypeString } from "./types";

export function isUndefined<T extends undefined>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.undefined;
}
