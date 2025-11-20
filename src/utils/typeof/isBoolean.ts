import { prototypeStrings, resolvePrototypeString } from "./types";

export function isBoolean<T extends boolean>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.boolean;
}
