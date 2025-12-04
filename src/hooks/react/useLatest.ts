import { useRef, type RefObject } from "react";

/**
 * 返回当前最新值的 Hook
 * @reference https://ahooks.js.org/zh-CN/hooks/use-latest
 *
 * @template T
 * @param {T} value
 */
export function useLatest<T>(value: T): RefObject<T> {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

