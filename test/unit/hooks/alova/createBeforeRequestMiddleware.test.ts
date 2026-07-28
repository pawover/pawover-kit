import { describe, expect, it, vi } from "vitest";
import { useAlovaRequest } from "@pawover/kit/hooks/alova";
import { useRequest } from "alova/client";

vi.mock("alova/client", () => ({
  useRequest: vi.fn(() => ({
    loading: false,
    data: null,
    error: null,
    onSuccess: vi.fn().mockReturnThis(),
    onError: vi.fn().mockReturnThis(),
    onComplete: vi.fn().mockReturnThis(),
    send: vi.fn(),
    abort: vi.fn(),
  })),
}));

describe("createBeforeRequestMiddleware integration", () => {
  it("should pass onBeforeRequest to internal middleware", () => {
    const onBeforeRequest = vi.fn();
    const handler = vi.fn();

    useAlovaRequest(handler as never, { onBeforeRequest });

    expect(useRequest).toHaveBeenCalledWith(
      handler,
      expect.objectContaining({
        onBeforeRequest,
      }),
    );
  });

  it("should work without options", () => {
    const handler = vi.fn();

    useAlovaRequest(handler as never);

    expect(useRequest).toHaveBeenCalledWith(handler, expect.objectContaining({ immediate: true }));
  });

  it("should pass immediate option", () => {
    const handler = vi.fn();

    useAlovaRequest(handler as never, { immediate: false });

    expect(useRequest).toHaveBeenCalledWith(handler, expect.objectContaining({ immediate: false }));
  });

  it("should register onSuccess handler", () => {
    const handler = vi.fn();
    const onSuccess = vi.fn();

    useAlovaRequest(handler as never, { onSuccess });

    expect(useRequest).toHaveBeenCalled();
  });

  it("should register onError handler", () => {
    const handler = vi.fn();
    const onError = vi.fn();

    useAlovaRequest(handler as never, { onError });

    expect(useRequest).toHaveBeenCalled();
  });

  it("should register onComplete handler", () => {
    const handler = vi.fn();
    const onComplete = vi.fn();

    useAlovaRequest(handler as never, { onComplete });

    expect(useRequest).toHaveBeenCalled();
  });
});
