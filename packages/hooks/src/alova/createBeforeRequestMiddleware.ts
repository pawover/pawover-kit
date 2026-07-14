import type { AlovaGenerics } from "alova";
import type { AlovaFrontMiddleware } from "alova/client";
import type { BeforeRequestHandler } from ".";

export function createBeforeRequestMiddleware<AG extends AlovaGenerics, Args extends any[]> (
  middleware: AlovaFrontMiddleware<AG, Args> | undefined,
  onBeforeRequest: BeforeRequestHandler<AG, Args>,
): AlovaFrontMiddleware<AG, Args> {
  return async (context, next) => {
    onBeforeRequest?.(context);
    if (middleware) {
      return middleware(context, next);
    }

    return next();
  };
}
