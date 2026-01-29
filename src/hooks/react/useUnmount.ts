import type { AnyFunction } from "@pawover/types";
import { useEffect } from "react";
import { isFunction } from "src/utils";
import { useLatest } from "./useLatest";

/**
 * 在组件卸载时执行的 Hook
 * @reference https://ahooks.js.org/zh-CN/hooks/use-unmount
 *
 * @param effect 副作用函数
 */
export function useUnmount(effect: AnyFunction) {
  if (!isFunction(effect)) {
    console.error(`useUnmount expected parameter is a function, got ${typeof effect}`);
  }

  const effectRef = useLatest(effect);

  useEffect(
    () => () => {
      effectRef.current?.();
    },
    [],
  );
}
