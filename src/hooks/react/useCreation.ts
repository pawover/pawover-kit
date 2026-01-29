import { useRef, type DependencyList } from "react";
import { isEqual } from "src/utils";

interface RefObject<T> {
  deps: DependencyList;
  result: T;
  isInitialized: boolean;
}

/**
 * useCreation
 * @reference https://ahooks.js.org/zh-CN/hooks/use-creation
 *
 * @param factory
 * @param deps
 */
export function useCreation<T>(factory: () => T, deps: DependencyList) {
  const { current } = useRef<RefObject<T>>({ deps, result: undefined!, isInitialized: false });

  if (current.isInitialized === false || !isEqual(current.deps, deps)) {
    current.deps = deps;
    current.result = factory();
    current.isInitialized = true;
  }

  return current.result;
}

