import type { AnyAsyncFunction } from "@pawover/types";
import { useEffect, type EffectCallback } from "react";
import { isFunction, isPromiseLike } from "src/utils";
import { useLatest } from "./useLatest";

type MountCallback = EffectCallback | AnyAsyncFunction;

/**
 * 在组件初始化时执行的 Hook
 * - 即使在严格模式下也只执行一次
 * @reference https://ahooks.js.org/hooks/use-mount
 *
 * @param effect 副作用函数
 */
export function useMount (effect: MountCallback) {
  if (!isFunction(effect)) {
    console.error(`useMount expected parameter is a function, but got ${typeof effect}`);
  }

  let isMounted = false;
  const effectRef = useLatest(effect);

  useEffect(() => {
    if (isMounted) {
      return;
    }

    isMounted = true;
    const result = effectRef.current?.();
    // If fn returns a Promise, don't return it as cleanup function
    if (isPromiseLike(result)) {
      return;
    }

    return result as ReturnType<EffectCallback>;
  }, []);
}
