import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAlovaWatcher } from "@pawover/kit/hooks/alova";
import { useWatcher } from "alova/client";

vi.mock("alova/client", () => ({
  useWatcher: vi.fn(() => ({
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

describe("useAlovaWatcher", () => {
  it("should call useWatcher with method handler and states", () => {
    const handler = vi.fn();
    const states: never[] = [];
    const { result } = renderHook(() => useAlovaWatcher(handler as never, states));
    expect(useWatcher).toHaveBeenCalledWith(handler, states, {});
    expect(result.current).toBeDefined();
  });

  it("should pass onBeforeRequest option", () => {
    const handler = vi.fn();
    const states: never[] = [];
    const onBeforeRequest = vi.fn();
    const { result } = renderHook(() => useAlovaWatcher(handler as never, states, { onBeforeRequest }));
    expect(useWatcher).toHaveBeenCalledWith(handler, states, expect.objectContaining({ onBeforeRequest }));
    expect(result.current).toBeDefined();
  });

  it("should pass onSuccess option", () => {
    const handler = vi.fn();
    const states: never[] = [];
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useAlovaWatcher(handler as never, states, { onSuccess }));
    expect(result.current).toBeDefined();
  });

  it("should pass onError option", () => {
    const handler = vi.fn();
    const states: never[] = [];
    const onError = vi.fn();
    const { result } = renderHook(() => useAlovaWatcher(handler as never, states, { onError }));
    expect(result.current).toBeDefined();
  });

  it("should pass onComplete option", () => {
    const handler = vi.fn();
    const states: never[] = [];
    const onComplete = vi.fn();
    const { result } = renderHook(() => useAlovaWatcher(handler as never, states, { onComplete }));
    expect(result.current).toBeDefined();
  });
});
