import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isBlob(value: unknown): value is Blob {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.blob;
}
