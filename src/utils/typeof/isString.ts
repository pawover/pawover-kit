import { prototypeStrings, resolvePrototypeString } from "./types";

export function isString<T extends string>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.string;
}
