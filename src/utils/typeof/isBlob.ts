import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 Blob
 * @param value 待检查值
 * @returns 是否为 Blob
 */
export function isBlob (value: unknown): value is Blob {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.blob;
}

export function isFile (value: unknown): value is File {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.file;
}
