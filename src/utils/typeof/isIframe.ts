import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 HTMLIFrameElement
 * @param value 待检查值
 * @returns 是否为 HTMLIFrameElement
 */
export function isIframe(value: unknown): value is HTMLIFrameElement {
  if (typeof window === "undefined") {
    return false;
  }

  return resolvePrototypeString(value) === PROTOTYPE_TAGS.iframe;
}

export function isInIframe() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.top !== window.self;
  } catch (error) {
    // 仅当 SecurityError（跨域 iframe）时返回 true
    if ((error as Error).name === "SecurityError") {
      return true;
    }

    return false;
  }
}
