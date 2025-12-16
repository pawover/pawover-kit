import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isAbortSignal(value: unknown): value is AbortSignal {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.abortSignal;
}
