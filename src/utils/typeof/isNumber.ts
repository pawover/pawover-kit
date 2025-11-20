import { prototypeStrings, resolvePrototypeString } from "./types";

export function isNumber<T extends number>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.number;
}
