import { prototypeStrings, resolvePrototypeString } from "./types";

export function isRegExp<T extends RegExp>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.regExp;
}
