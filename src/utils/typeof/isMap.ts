import type { AnyObject } from "@pawover/types";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isMap(value: unknown): value is Map<unknown, unknown> {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.map;
}

export function isWeakMap(value: unknown): value is WeakMap<AnyObject, unknown> {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.weakMap;
}
