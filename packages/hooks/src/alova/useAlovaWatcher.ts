import type { AlovaGenerics, Method } from "alova";
import { type AlovaMethodHandler, useWatcher, type WatcherHookConfig } from "alova/client";
import { attachExposureHandlers, composeBeforeRequestMiddleware, type HookOptionsBase } from "./hookOptions";

interface HookOptions<AG extends AlovaGenerics, Args extends any[]> extends WatcherHookConfig<AG, Args>, HookOptionsBase<AG, Args> {}

export function useAlovaWatcher<AG extends AlovaGenerics, Args extends any[] = any[]> (
  methodHandler: Method<AG> | AlovaMethodHandler<AG, Args>,
  watchingStates: AG["StatesExport"]["Watched"][],
  hookOptions: HookOptions<AG, Args> = {},
) {
  const options = { ...hookOptions };

  composeBeforeRequestMiddleware(options);

  const exposure = useWatcher(methodHandler, watchingStates, options);

  return attachExposureHandlers(exposure, options);
}