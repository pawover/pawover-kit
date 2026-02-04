/* eslint-disable ts/no-explicit-any */

import type { AlovaGenerics, Method } from "alova";
import {
  type AlovaMethodHandler,
  type CompleteHandler,
  type ErrorHandler,
  type SuccessHandler,
  type WatcherHookConfig,
  useWatcher,
} from "alova/client";

interface HookConfig<AG extends AlovaGenerics, Args extends any[]> extends WatcherHookConfig<AG, Args> {
  onSuccess?: SuccessHandler<AG, Args>;
  onError?: ErrorHandler<AG, Args>;
  onComplete?: CompleteHandler<AG, Args>;
}

export function useAlovaWatcher<AG extends AlovaGenerics, Args extends any[] = any[]> (
  methodHandler: Method<AG> | AlovaMethodHandler<AG, Args>,
  watchingStates: AG["StatesExport"]["Watched"][],
  hookConfig: HookConfig<AG, Args> = {},
) {
  const config = hookConfig || {};
  const exposure = useWatcher(methodHandler, watchingStates, config);

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
