import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isURLSearchParams(value: unknown): value is URLSearchParams {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.URLSearchParams;
}
