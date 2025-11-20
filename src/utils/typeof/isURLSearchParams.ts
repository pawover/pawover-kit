import { prototypeStrings, resolvePrototypeString } from "./types";

export function isURLSearchParams<T extends Window>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.URLSearchParams;
}
