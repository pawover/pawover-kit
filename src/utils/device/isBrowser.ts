import { isFunction } from "../typeof";

const _isBrowser = typeof window !== "undefined" && isFunction(window?.document?.createElement);
export function isBrowser (): boolean {
  return _isBrowser;
}
