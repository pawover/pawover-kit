import { type RefObject, useRef } from "react";

/**
 * 返回当前最新值的 Hook
 *
 * @param value
 */
export function useLatest<T> (value: T): RefObject<T> {
  const ref = useRef(value);
  // eslint-disable-next-line react/refs
  ref.current = value;

  return ref;
}
