import { prototypeStrings, resolvePrototypeString } from "./types";

export function isDate<T extends Date>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.date;
}
