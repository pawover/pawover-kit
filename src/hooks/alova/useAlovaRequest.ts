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
  onBeforeRequest?: (context: AlovaFrontMiddlewareContext<AG, Args>) => void;
  onSuccess?: SuccessHandler<AG, Args>;
  onError?: ErrorHandler<AG, Args>;
  onComplete?: CompleteHandler<AG, Args>;
}

export function useAlovaRequest<AG extends AlovaGenerics, Args extends any[] = any[]> (
  methodHandler: Method<AG> | AlovaMethodHandler<AG, Args>,
  hookConfig?: HookConfig<AG, Args> | undefined,
) {
  const config = hookConfig || {};
  config.immediate ??= true;

  if (config.onBeforeRequest) {
    const middleware = config.middleware;
    config.middleware = async (context, next) => {
      config.onBeforeRequest?.(context);

      if (middleware) {
        async function run () {
          await next();
        }
        await middleware?.(context, run);
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
