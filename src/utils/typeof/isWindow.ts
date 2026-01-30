import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 Window
 * @param value 待检查值
 * @returns 是否为 Window
 */
export function isWindow(value: unknown): value is Window {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.window;
}
