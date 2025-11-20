import { prototypeStrings, resolvePrototypeString } from "./types";

export function isAsyncFunction<T extends AsyncFunc>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.asyncFunction;
}
