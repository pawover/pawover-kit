import { prototypeStrings, resolvePrototypeString } from "./types";

export function isPromise<T extends Promise<unknown>>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.promise;
}
