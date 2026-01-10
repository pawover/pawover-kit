import type { AnyObject } from "@pawover/types";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isSet(value: unknown): value is Set<unknown> {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.set;
}

export function isWeakSet(value: unknown): value is WeakSet<AnyObject> {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.weakSet;
}
