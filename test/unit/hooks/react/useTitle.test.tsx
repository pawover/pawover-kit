import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTitle } from "@pawover/kit/hooks/react";

describe("useTitle", () => {
  it("should set document.title", () => {
    renderHook(() => useTitle("Test Page"));
    expect(document.title).toBe("Test Page");
  });

  it("should update document.title when title changes", () => {
    const { rerender } = renderHook((t: string) => useTitle(t), { initialProps: "First" });
    expect(document.title).toBe("First");

    rerender("Second");
    expect(document.title).toBe("Second");
  });

  it("should not restore on unmount without option", () => {
    renderHook(() => useTitle("Before"));
    const { unmount } = renderHook(() => useTitle("During"));
    document.title = "Before";
    unmount();
    expect(document.title).toBe("Before");
  });

  it("should restore on unmount with isRestoreOnUnmount", () => {
    document.title = "Original";
    const { unmount } = renderHook(() => useTitle("Temp", { isRestoreOnUnmount: true }));
    unmount();
    expect(document.title).toBe("Original");
  });

  it("should log error when title is not a string", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    renderHook(() => useTitle(null as never));
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
