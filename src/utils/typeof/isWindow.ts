import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isWindow(value: unknown): value is Window {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.window;
}
