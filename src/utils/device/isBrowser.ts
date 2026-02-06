import { isFunction } from "../typeof";

export function isBrowser (): boolean {
  return typeof window !== "undefined" && isFunction(window?.document?.createElement);
}

export function isWebWorker () {
  return typeof window === "undefined" && typeof self !== "undefined" && "importScripts" in self;
}
