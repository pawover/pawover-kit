import { describe, expect, it, vi } from "vitest";
import { attachExposureHandlers, composeBeforeRequestMiddleware } from "../../../../packages/hooks/src/alova/hookOptions";

type TestOptions = {
  onBeforeRequest?: (context: unknown) => void;
  middleware?: (context: unknown, next: unknown) => Promise<unknown>;
};

describe("composeBeforeRequestMiddleware", () => {
  it("should compose onBeforeRequest into middleware and call next", async () => {
    const onBeforeRequest = vi.fn();
    const options: TestOptions = { onBeforeRequest };

    composeBeforeRequestMiddleware(options);

    expect(options.middleware).toBeDefined();

    const next = vi.fn();
    await options.middleware?.({} as never, next as never);

    expect(onBeforeRequest).toHaveBeenCalledWith({});
    expect(next).toHaveBeenCalled();
  });

  it("should chain existing middleware after onBeforeRequest", async () => {
    const onBeforeRequest = vi.fn();
    const middleware = vi.fn();
    const options: TestOptions = { onBeforeRequest, middleware };

    composeBeforeRequestMiddleware(options);

    const next = vi.fn();
    await options.middleware?.({} as never, next as never);

    expect(onBeforeRequest).toHaveBeenCalled();
    expect(middleware).toHaveBeenCalledWith({}, next);
  });

  it("should leave middleware untouched without onBeforeRequest", () => {
    const middleware = vi.fn();
    const options: TestOptions = { middleware };

    composeBeforeRequestMiddleware(options);

    expect(options.middleware).toBe(middleware);
  });
});

describe("attachExposureHandlers", () => {
  it("should attach all provided handlers and return the exposure", () => {
    const exposure = { onSuccess: vi.fn(), onError: vi.fn(), onComplete: vi.fn() };
    const onSuccess = vi.fn();
    const onError = vi.fn();
    const onComplete = vi.fn();

    const result = attachExposureHandlers(exposure, { onSuccess, onError, onComplete });

    expect(result).toBe(exposure);
    expect(exposure.onSuccess).toHaveBeenCalledWith(onSuccess);
    expect(exposure.onError).toHaveBeenCalledWith(onError);
    expect(exposure.onComplete).toHaveBeenCalledWith(onComplete);
  });

  it("should skip missing handlers", () => {
    const exposure = { onSuccess: vi.fn(), onError: vi.fn(), onComplete: vi.fn() };

    attachExposureHandlers(exposure, {});

    expect(exposure.onSuccess).not.toHaveBeenCalled();
    expect(exposure.onError).not.toHaveBeenCalled();
    expect(exposure.onComplete).not.toHaveBeenCalled();
  });
});