import { prototypeStrings, resolvePrototypeString } from "./types";

export function isNull<T extends null>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.null;
}
