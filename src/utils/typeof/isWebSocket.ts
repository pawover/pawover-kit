import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isWebSocket(value: unknown): value is WebSocket {
  return resolvePrototypeString(value) === PROTOTYPE_TAGS.webSocket;
}
