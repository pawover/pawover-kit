import { useEffect, useRef, type EffectCallback } from "react";
import { isFunction, isPromise } from "src/utils";
import { useLatest } from "./useLatest";
import type { AnyAsyncFunction } from "@pawover/types";

/**
 * 在组件初始化时执行的 Hook
 * - 即使在严格模式（React StrictMode）也只执行一次
 * - 自动使用最新版 effect 函数
 *
 * @param effect 副作用函数（必须为同步函数；若为异步函数，清理逻辑需自行处理）
 * @example
 * useMount(() => {
 *   console.log('组件挂载');
 *   return () => console.log('组件卸载');
 * });
 *
 * useMount(async () => {
 *   const data = await fetchData();
 *   // 清理逻辑需通过 ref/AbortController 自行管理
 *   // ❌ 不要 return cleanupFn（async 函数返回 Promise，无法作为清理函数）
 * });
 */
export function useMount (effect: EffectCallback | AnyAsyncFunction) {
  const isMountedRef = useRef(false);
  const effectRef = useLatest(effect);

  useEffect(() => {
    if (!isFunction(effectRef.current)) {
      console.error(`[useMount] Expected parameter to be a function, but got ${typeof effectRef.current}. This effect will not execute.`);

      return;
    }
    if (isMountedRef.current) {
      return;
    }

    isMountedRef.current = true;
    const cleanup = effectRef.current?.();

    return isFunction(cleanup) && !isPromise(cleanup) ? cleanup : undefined;
  }, [effectRef]);
}
