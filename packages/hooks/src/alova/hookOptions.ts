import type { AlovaGenerics } from "alova";
import type { AlovaFrontMiddleware, CompleteHandler, ErrorHandler, SuccessHandler } from "alova/client";
import type { BeforeRequestHandler } from ".";
import { createBeforeRequestMiddleware } from "./createBeforeRequestMiddleware";

/**
 * 三个 Alova hook 共享的 handler 选项（包内部使用，不导出）
 */
export interface HookOptionsBase<AG extends AlovaGenerics, Args extends any[] = any[]> {
  /** 请求前中间件处理 */
  onBeforeRequest?: BeforeRequestHandler<AG, Args> | undefined;
  /** 请求成功回调 */
  onSuccess?: SuccessHandler<AG, Args> | undefined;
  /** 请求失败回调 */
  onError?: ErrorHandler<AG, Args> | undefined;
  /** 请求完成回调 */
  onComplete?: CompleteHandler<AG, Args> | undefined;
}

type ComposableOptions<AG extends AlovaGenerics, Args extends any[]> = HookOptionsBase<AG, Args> & {
  middleware?: AlovaFrontMiddleware<AG, Args> | undefined;
};

/**
 * 将 onBeforeRequest 组合进 options.middleware（就地修改，须在调用 alova hook 之前执行）
 */
export function composeBeforeRequestMiddleware<AG extends AlovaGenerics = AlovaGenerics, Args extends any[] = any[]> (
  options: ComposableOptions<AG, Args>,
): void {
  if (options.onBeforeRequest) {
    options.middleware = createBeforeRequestMiddleware(options.middleware, options.onBeforeRequest);
  }
}

interface AttachableExposure<AG extends AlovaGenerics, Args extends any[]> {
  onSuccess: (handler: SuccessHandler<AG, Args>) => unknown;
  onError: (handler: ErrorHandler<AG, Args>) => unknown;
  onComplete: (handler: CompleteHandler<AG, Args>) => unknown;
}

/**
 * 将 onSuccess / onError / onComplete 挂载到 alova exposure 上，返回原 exposure
 */
export function attachExposureHandlers<
  AG extends AlovaGenerics = AlovaGenerics,
  Args extends any[] = any[],
  TExposure extends AttachableExposure<AG, Args> = AttachableExposure<AG, Args>,
> (
  exposure: TExposure,
  options: HookOptionsBase<AG, Args>,
): TExposure {
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