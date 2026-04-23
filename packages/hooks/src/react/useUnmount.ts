import { TypeUtil } from "@pawover/kit-utils";
import type { AnyFunction } from "@pawover/types";
import { useEffect } from "react";

import { useLatest } from "./useLatest";

/**
 * 在组件卸载时执行的 Hook
 *
 * @param effect 副作用函数
 */
export function useUnmount (effect: AnyFunction) {
  const effectRef = useLatest(effect);

  useEffect(
    () => () => {
      if (!TypeUtil.isFunction(effectRef.current)) {
        console.error(`hook [useUnmount] Expected parameter to be a function, but got ${typeof effectRef.current}. This effect will not execute.`);

        return;
      }
      effectRef.current?.();
    },
    [effectRef],
  );
}
