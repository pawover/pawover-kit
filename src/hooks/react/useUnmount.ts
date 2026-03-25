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
export function useUnmount (effect: AnyFunction) {
  const effectRef = useLatest(effect);

  useEffect(
    () => () => {
      if (!isFunction(effectRef.current)) {
        console.error(`useUnmount expected parameter is a function, but got ${typeof effectRef.current}`);

        return;
      }
      effectRef.current?.();
    },
    [effectRef],
  );
}
