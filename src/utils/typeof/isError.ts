import { prototypeStrings, resolvePrototypeString } from "./types";

export function isError<T extends Error>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.error;
}
