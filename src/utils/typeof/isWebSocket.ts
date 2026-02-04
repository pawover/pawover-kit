import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 WebSocket
 * @param value 待检查值
 * @returns 是否为 WebSocket
 */
export function isWebSocket (value: unknown): value is WebSocket {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.webSocket;
}
