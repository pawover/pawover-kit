import type { AnyObject } from "@pawover/types";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 Set
 * @param value 待检查值
 * @returns 是否为 Set
 */
export function isSet (value: unknown): value is Set<unknown> {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.set;
}

/**
 * 检查 value 是否为 WeakSet
 * @param value 待检查值
 * @returns 是否为 WeakSet
 */
export function isWeakSet (value: unknown): value is WeakSet<AnyObject> {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.weakSet;
}
