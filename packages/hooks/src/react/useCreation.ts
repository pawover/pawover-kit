import { isEqual } from "lodash-es";
import { type DependencyList, useRef } from "react";

/**
 * 确保实例不会被重复创建
 *
 * @param factory
 * @param deps
 */
export function useCreation<T> (factory: () => T, deps: DependencyList) {
  const { current } = useRef({ deps, result: undefined as T, isInitialized: false });

  if (current.isInitialized === false || !isEqual(current.deps, deps)) {
    current.deps = deps;
    current.result = factory();
    current.isInitialized = true;
  }

  return current.result;
}
