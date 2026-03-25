import { isFunction, isObject } from "..";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 ReadableStream
 * - Uses `Object.prototype.toString` where supported (modern browsers, Node.js ≥18).
 * - Falls back to duck-typing in older environments.
 * - Resistant to basic forgery, but not 100% secure in all polyfill scenarios.
 * - ⚠️ Note: In older Node.js (<18) or with non-compliant polyfills, this may return false positives or negatives.
 *
 * @param value 待检查值
 * @returns 是否为 ReadableStream
 */
export function isReadableStream (value: unknown): value is ReadableStream {
  if (resolvePrototypeString(value) === PROTOTYPE_TAGS.readableStream) {
    return true;
  }

  return isObject(value) && isFunction(value["getReader"]) && isFunction(value["pipeThrough"]);
}
