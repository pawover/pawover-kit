import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 AbortSignal
 * @param value 待检查值
 * @returns 是否为 AbortSignal
 */
export function isAbortSignal (value: unknown): value is AbortSignal {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.abortSignal;
}
