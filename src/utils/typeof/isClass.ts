import type { Class } from "type-fest";
import { resolvePrototypeString } from "./types";

export function isClass<T extends Class<AnyObject>>(value: unknown): value is T {
  return resolvePrototypeString(value).startsWith("class ");
}
