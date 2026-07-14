import type { AlovaGenerics, Method } from "alova";
import { type CompleteHandler, type ErrorHandler, type PaginationHookConfig, type SuccessHandler, usePagination } from "alova/client";
import type { BeforeRequestHandler } from ".";
import { createBeforeRequestMiddleware } from "./createBeforeRequestMiddleware";

interface HookOptions<AG extends AlovaGenerics, L extends any[], Args extends any[]> extends PaginationHookConfig<AG, L> {
  onBeforeRequest?: BeforeRequestHandler<AG, any[]> | undefined;
  onSuccess?: SuccessHandler<AG, Args> | undefined;
  onError?: ErrorHandler<AG, Args> | undefined;
  onComplete?: CompleteHandler<AG, Args> | undefined;
}

export function useAlovaPagination<AG extends AlovaGenerics, L extends any[], Args extends any[]> (
  methodHandler: (page: number, pageSize: number, ...args: Args) => Method<AG>,
  hookOptions?: HookOptions<AG, L, Args> | undefined,
) {
  const options = { ...hookOptions, immediate: hookOptions?.immediate ?? true };

  if (options.onBeforeRequest) {
    options.middleware = createBeforeRequestMiddleware(options.middleware, options.onBeforeRequest);
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
