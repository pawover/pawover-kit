/* eslint-disable ts/no-explicit-any */

import type { AlovaGenerics, Method } from "alova";
import { type AlovaFrontMiddlewareContext, type CompleteHandler, type ErrorHandler, type PaginationHookConfig, type SuccessHandler, usePagination } from "alova/client";

interface HookOptions<AG extends AlovaGenerics, L extends any[], Args extends any[]> extends PaginationHookConfig<AG, L> {
  onBeforeRequest?: ((context: AlovaFrontMiddlewareContext<AG, any[]>) => void) | undefined;
  onSuccess?: SuccessHandler<AG, Args> | undefined;
  onError?: ErrorHandler<AG, Args> | undefined;
  onComplete?: CompleteHandler<AG, Args> | undefined;
}

export function useAlovaPagination<AG extends AlovaGenerics, L extends any[], Args extends any[]> (
  methodHandler: (page: number, pageSize: number, ...args: Args) => Method<AG>,
  hookOptions?: HookOptions<AG, L, Args> | undefined,
) {
  const options = { ...hookOptions, immediate: hookOptions?.immediate ?? true };
  let isBeforeExecuted = false;
  let isMiddlewareExecuted = false;

  if (options.onBeforeRequest) {
    const middleware = options.middleware;
    options.middleware = async (context, next) => {
      !isBeforeExecuted && options.onBeforeRequest?.(context);
      isBeforeExecuted = true;

      if (middleware && !isMiddlewareExecuted) {
        isMiddlewareExecuted = true;
        await middleware?.(context, next);
      } else {
        await next();
      }
    };
  }

  const exposure = usePagination(methodHandler, options);

  if (options.onSuccess) {
    exposure.onSuccess(options.onSuccess);
  }
  if (options.onError) {
    exposure.onError(options.onError);
  }
  if (options.onComplete) {
    exposure.onComplete(options.onComplete);
  }

  return exposure;
}
