import type { AnyFunction } from "@pawover/types";
import { useEffect } from "react";
import { isFunction } from "../../utils";
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
        console.error(`[useUnmount] Expected parameter to be a function, but got ${typeof effectRef.current}. This effect will not execute.`);

        return;
      }
      effectRef.current?.();
    },
    [effectRef],
  );
}
