import type { AnyObject } from "@pawover/types";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 Map
 * @param value 待检查值
 * @returns 是否为 Map
 */
export function isMap (value: unknown): value is Map<unknown, unknown> {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.map;
}

/**
 * 检查 value 是否为 WeakMap
 * @param value 待检查值
 * @returns 是否为 WeakMap
 */
export function isWeakMap (value: unknown): value is WeakMap<AnyObject, unknown> {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.weakMap;
}
