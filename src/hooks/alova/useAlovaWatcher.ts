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

interface HookOptions<AG extends AlovaGenerics, Args extends any[]> extends WatcherHookConfig<AG, Args> {
  onSuccess?: SuccessHandler<AG, Args> | undefined;
  onError?: ErrorHandler<AG, Args> | undefined;
  onComplete?: CompleteHandler<AG, Args> | undefined;
}

export function useAlovaWatcher<AG extends AlovaGenerics, Args extends any[] = any[]> (
  methodHandler: Method<AG> | AlovaMethodHandler<AG, Args>,
  watchingStates: AG["StatesExport"]["Watched"][],
  hookOptions: HookOptions<AG, Args> = {},
) {
  const options = hookOptions || {};
  const exposure = useWatcher(methodHandler, watchingStates, options);

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
