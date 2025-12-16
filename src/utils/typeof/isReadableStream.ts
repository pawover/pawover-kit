import { isFunction, isObject } from "../index";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * Checks if a value is a WHATWG ReadableStream instance.
 *
 * - Uses `Object.prototype.toString` where supported (modern browsers, Node.js ≥18).
 * - Falls back to duck-typing in older environments.
 * - Resistant to basic forgery, but not 100% secure in all polyfill scenarios.
 *
 * ⚠️ Note: In older Node.js (<18) or with non-compliant polyfills, this may return false positives or negatives.
 */
export function isReadableStream(value: unknown): value is ReadableStream {
  // Modern environments (Chrome 52+, Firefox 57+, Safari 10.1+, Node.js 18+)
  if (resolvePrototypeString(value) === PROTOTYPE_TAGS.readableStream) {
    return true;
  }

  // Fallback for older browsers / polyfills (e.g., web-streams-polyfill)
  return isObject(value) && isFunction(value["getReader"]) && isFunction(value["pipeThrough"]);
}
