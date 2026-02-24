/* eslint-disable ts/no-explicit-any */

import type { AlovaGenerics, Method } from "alova";
import {
  usePagination,
  type AlovaFrontMiddlewareContext,
  type CompleteHandler,
  type ErrorHandler,
  type PaginationHookConfig,
  type SuccessHandler,
} from "alova/client";

interface HookConfig<AG extends AlovaGenerics, L extends any[], Args extends any[]> extends PaginationHookConfig<AG, L> {
  onBeforeRequest?: ((context: AlovaFrontMiddlewareContext<AG, any[]>) => void) | undefined;
  onSuccess?: SuccessHandler<AG, Args> | undefined;
  onError?: ErrorHandler<AG, Args> | undefined;
  onComplete?: CompleteHandler<AG, Args> | undefined;
}

export function useAlovaPagination<AG extends AlovaGenerics, L extends any[], Args extends any[]> (
  methodHandler: (page: number, pageSize: number, ...args: Args) => Method<AG>,
  hookConfig?: HookConfig<AG, L, Args> | undefined,
) {
  const config = { ...hookConfig, immediate: hookConfig?.immediate ?? true };
  let isBeforeExecuted = false;
  let isMiddlewareExecuted = false;

  if (config.onBeforeRequest) {
    const middleware = config.middleware;
    config.middleware = async (context, next) => {
      !isBeforeExecuted && config.onBeforeRequest?.(context);
      isBeforeExecuted = true;

      if (middleware && !isMiddlewareExecuted) {
        isMiddlewareExecuted = true;
        await middleware?.(context, next);
      } else {
        await next();
      }
    };
  }

  const exposure = usePagination(methodHandler, config);

  if (config.onSuccess) {
    exposure.onSuccess(config.onSuccess);
  }
  if (config.onError) {
    exposure.onError(config.onError);
  }
  if (config.onComplete) {
    exposure.onComplete(config.onComplete);
  }

  return exposure;
}
