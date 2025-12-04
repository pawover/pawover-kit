import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isError(value: unknown): value is Error {
  return value instanceof Error || resolvePrototypeString(value) === PROTOTYPE_TAGS.error;
}
