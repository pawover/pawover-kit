import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 URLSearchParams
 * @param value 待检查值
 * @returns 是否为 URLSearchParams
 */
export function isURLSearchParams (value: unknown): value is URLSearchParams {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.URLSearchParams;
}
