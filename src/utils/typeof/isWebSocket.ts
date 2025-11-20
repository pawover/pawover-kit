import { prototypeStrings, resolvePrototypeString } from "./types";

export function isWebSocket<T extends WebSocket>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.webSocket;
}
