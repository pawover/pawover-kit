const _isWebWorker = typeof window === "undefined" && typeof self !== "undefined" && "importScripts" in self;
export function isWebWorker (): boolean {
  return _isWebWorker;
}
