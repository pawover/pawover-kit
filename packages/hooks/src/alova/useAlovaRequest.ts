import type { AlovaGenerics, Method } from "alova";
import { type AlovaMethodHandler, type CompleteHandler, type ErrorHandler, type RequestHookConfig, type SuccessHandler, useRequest } from "alova/client";
import type { BeforeRequestHandler } from ".";
import { createBeforeRequestMiddleware } from "./createBeforeRequestMiddleware";

interface HookOptions<AG extends AlovaGenerics, Args extends any[]> extends RequestHookConfig<AG, Args> {
  onBeforeRequest?: BeforeRequestHandler<AG, Args> | undefined;
  onSuccess?: SuccessHandler<AG, Args> | undefined;
  onError?: ErrorHandler<AG, Args> | undefined;
  onComplete?: CompleteHandler<AG, Args> | undefined;
}

export function useAlovaRequest<AG extends AlovaGenerics, Args extends any[] = any[]> (
  methodHandler: Method<AG> | AlovaMethodHandler<AG, Args>,
  hookOptions?: HookOptions<AG, Args> | undefined,
) {
  const options = { ...hookOptions, immediate: hookOptions?.immediate ?? true };

  if (options.onBeforeRequest) {
    options.middleware = createBeforeRequestMiddleware(options.middleware, options.onBeforeRequest);
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
