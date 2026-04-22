/* eslint-disable ts/no-explicit-any */

import type { AlovaGenerics, Method } from "alova";
import { type AlovaFrontMiddlewareContext, type AlovaMethodHandler, type CompleteHandler, type ErrorHandler, type RequestHookConfig, type SuccessHandler, useRequest } from "alova/client";

interface HookOptions<AG extends AlovaGenerics, Args extends any[]> extends RequestHookConfig<AG, Args> {
  onBeforeRequest?: ((context: AlovaFrontMiddlewareContext<AG, Args>) => void) | undefined;
  onSuccess?: SuccessHandler<AG, Args> | undefined;
  onError?: ErrorHandler<AG, Args> | undefined;
  onComplete?: CompleteHandler<AG, Args> | undefined;
}

export function useAlovaRequest<AG extends AlovaGenerics, Args extends any[] = any[]> (
  methodHandler: Method<AG> | AlovaMethodHandler<AG, Args>,
  hookOptions?: HookOptions<AG, Args> | undefined,
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

  const exposure = useRequest(methodHandler, options);

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
