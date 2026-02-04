import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 Error 对象
 * @param value 待检查值
 * @returns 是否为 Error
 */
export function isError (value: unknown): value is Error {
  return value instanceof Error || resolvePrototypeString(value) === PROTOTYPE_TAGS.error;
}
