import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isFile(value: unknown): value is File {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.file;
}
