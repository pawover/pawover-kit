import { prototypeStrings, resolvePrototypeString } from "./types";

export function isWindow<T extends Window>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.window;
}
