import type { AlovaGenerics, Method } from "alova";
import { type PaginationHookConfig, usePagination } from "alova/client";
import { attachExposureHandlers, composeBeforeRequestMiddleware, type HookOptionsBase } from "./hookOptions";

interface HookOptions<AG extends AlovaGenerics, L extends any[], Args extends any[]> extends PaginationHookConfig<AG, L>, HookOptionsBase<AG, Args> {}

export function useAlovaPagination<AG extends AlovaGenerics, L extends any[], Args extends any[]> (
  methodHandler: (page: number, pageSize: number, ...args: Args) => Method<AG>,
  hookOptions?: HookOptions<AG, L, Args> | undefined,
) {
  const options = { ...hookOptions, immediate: hookOptions?.immediate ?? true };

  composeBeforeRequestMiddleware(options);

  const exposure = usePagination(methodHandler, options);

  return attachExposureHandlers(exposure, options);
}