import type { AlovaGenerics } from "alova";
import type { AlovaFrontMiddlewareContext } from "alova/client";

export type BeforeRequestHandler<AG extends AlovaGenerics, Args extends any[] = any[]> = (context: AlovaFrontMiddlewareContext<AG, Args>) => void;
export * from "./useAlovaPagination";
export * from "./useAlovaRequest";
export * from "./useAlovaWatcher";
