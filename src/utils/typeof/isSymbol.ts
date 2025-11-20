import { prototypeStrings, resolvePrototypeString } from "./types";

export function isSymbol<T extends symbol>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.symbol;
}
