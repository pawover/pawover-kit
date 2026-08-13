import type { AlovaGenerics, Method } from "alova";
import { type AlovaMethodHandler, type RequestHookConfig, useRequest } from "alova/client";
import { attachExposureHandlers, composeBeforeRequestMiddleware, type HookOptionsBase } from "./hookOptions";

interface HookOptions<AG extends AlovaGenerics, Args extends any[]> extends RequestHookConfig<AG, Args>, HookOptionsBase<AG, Args> {}

export function useAlovaRequest<AG extends AlovaGenerics, Args extends any[] = any[]> (
  methodHandler: Method<AG> | AlovaMethodHandler<AG, Args>,
  hookOptions?: HookOptions<AG, Args> | undefined,
) {
  const options = { ...hookOptions, immediate: hookOptions?.immediate ?? true };

  composeBeforeRequestMiddleware(options);

  const exposure = useRequest(methodHandler, options);

  return attachExposureHandlers(exposure, options);
}