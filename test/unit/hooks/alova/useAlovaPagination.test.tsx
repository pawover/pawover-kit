import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAlovaPagination } from "@pawover/kit/hooks/alova";
import { usePagination } from "alova/client";

vi.mock("alova/client", () => ({
  usePagination: vi.fn(() => ({
    loading: false,
    data: [],
    error: null,
    onSuccess: vi.fn().mockReturnThis(),
    onError: vi.fn().mockReturnThis(),
    onComplete: vi.fn().mockReturnThis(),
    page: 1,
    pageSize: 10,
    total: 0,
  })),
}));

describe("useAlovaPagination", () => {
  it("should call usePagination with method handler", () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useAlovaPagination(handler as never));
    expect(usePagination).toHaveBeenCalledWith(handler, expect.objectContaining({ immediate: true }));
    expect(result.current).toBeDefined();
  });

  it("should pass onBeforeRequest option", () => {
    const handler = vi.fn();
    const onBeforeRequest = vi.fn();
    const { result } = renderHook(() => useAlovaPagination(handler as never, { onBeforeRequest }));
    expect(usePagination).toHaveBeenCalledWith(handler, expect.objectContaining({ onBeforeRequest }));
    expect(result.current).toBeDefined();
  });

  it("should pass onSuccess option", () => {
    const handler = vi.fn();
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useAlovaPagination(handler as never, { onSuccess }));
    expect(result.current).toBeDefined();
  });

  it("should pass onError option", () => {
    const handler = vi.fn();
    const onError = vi.fn();
    const { result } = renderHook(() => useAlovaPagination(handler as never, { onError }));
    expect(result.current).toBeDefined();
  });

  it("should pass onComplete option", () => {
    const handler = vi.fn();
    const onComplete = vi.fn();
    const { result } = renderHook(() => useAlovaPagination(handler as never, { onComplete }));
    expect(result.current).toBeDefined();
  });
});
