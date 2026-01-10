import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isBlob(value: unknown): value is Blob {
  if (typeof window === "undefined") {
    return false;
  }

  return resolvePrototypeString(value) === PROTOTYPE_TAGS.blob;
}

export function isFile(value: unknown): value is File {
  if (typeof window === "undefined") {
    return false;
  }

  return resolvePrototypeString(value) === PROTOTYPE_TAGS.file;
}
