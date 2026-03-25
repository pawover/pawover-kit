import { useRef, type RefObject } from "react";

/**
 * 返回当前最新值的 Hook
 * @reference https://ahooks.js.org/zh-CN/hooks/use-latest
 *
 * @param value
 */
export function useLatest<T> (value: T): RefObject<T> {
  const ref = useRef(value);
  // eslint-disable-next-line react-x/refs
  ref.current = value;

  return ref;
}
