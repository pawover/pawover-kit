import { prototypeStrings, resolvePrototypeString } from "./types";

export function isBigInt<T extends bigint>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.bigInt;
}
