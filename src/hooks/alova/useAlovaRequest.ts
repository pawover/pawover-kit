/* eslint-disable ts/no-explicit-any */

import type { AlovaGenerics, Method } from "alova";
import {
  type AlovaFrontMiddlewareContext,
  type AlovaMethodHandler,
  type CompleteHandler,
  type ErrorHandler,
  type RequestHookConfig,
  type SuccessHandler,
  useRequest,
} from "alova/client";

interface HookConfig<AG extends AlovaGenerics, Args extends any[]> extends RequestHookConfig<AG, Args> {
  onBeforeRequest?: ((context: AlovaFrontMiddlewareContext<AG, Args>) => void) | undefined;
  onSuccess?: SuccessHandler<AG, Args> | undefined;
  onError?: ErrorHandler<AG, Args> | undefined;
  onComplete?: CompleteHandler<AG, Args> | undefined;
}

export function useAlovaRequest<AG extends AlovaGenerics, Args extends any[] = any[]> (
  methodHandler: Method<AG> | AlovaMethodHandler<AG, Args>,
  hookConfig?: HookConfig<AG, Args> | undefined,
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

  const exposure = useRequest(methodHandler, config);

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
