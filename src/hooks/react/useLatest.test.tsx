// useLatest.test.tsx
import { renderHook } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import React from "react"; // ✅ StrictMode 必需
import { useLatest } from "./useLatest";

describe("useLatest", () => {
  it("should return ref object with initial value", async () => {
    const { result } = await renderHook(
      (props?: { value: number }) => useLatest(props?.value),
      { initialProps: { value: 42 } },
    );
    expect(result.current).toEqual({ current: 42 });
  });

  it("should update ref.current when value changes via props", async () => {
    const { result, rerender } = await renderHook(
      (props?: { value: number }) => useLatest(props?.value),
      { initialProps: { value: 10 } },
    );

    expect(result.current.current).toBe(10);
    await rerender({ value: 20 }); // ✅ 通过 props 触发更新
    expect(result.current.current).toBe(20);
  });

  it("should preserve ref identity across renders", async () => {
    const { result, rerender } = await renderHook(
      (props?: { value: string }) => useLatest(props?.value),
      { initialProps: { value: "initial" } },
    );
    const firstRef = result.current;

    await rerender({ value: "updated" });
    expect(result.current).toBe(firstRef); // ✅ 同一 ref 对象
    expect(result.current.current).toBe("updated");
  });

  it("should capture latest value in async callbacks (microtask)", async () => {
    const { result, rerender } = await renderHook(
      (props?: { count: number }) => useLatest(props?.count),
      { initialProps: { count: 0 } },
    );

    // 1. 先触发更新
    await rerender({ count: 1 });

    // 2. 创建宏任务（确保在 React 更新完成后执行）
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 3. 验证：此时 ref.current 已更新
    expect(result.current.current).toBe(1);

    // 4. 额外验证：在宏任务中访问也是最新值
    const macroValue = await new Promise<number | undefined>((resolve) => setTimeout(() => resolve(result.current.current), 0));
    expect(macroValue).toBe(1);
  });

  it("should always return latest value in event handlers (avoid stale closures)", async () => {
    const { result, rerender } = await renderHook(
      (props?: { count: number }) => {
        const latest = useLatest(props?.count);

        return { handleClick: () => latest.current };
      },
      { initialProps: { count: 0 } },
    );

    const firstHandler = result.current.handleClick;
    await rerender({ count: 5 });
    const secondHandler = result.current.handleClick;

    // ✅ 关键验证：useLatest 的核心价值
    // 旧闭包的 handler 也能获取最新值（避免 stale closure）
    expect(firstHandler()).toBe(5);
    expect(secondHandler()).toBe(5);
  });

  it("should handle null/undefined values correctly", async () => {
    const { result, rerender } = await renderHook(
      (props?: { value: null | undefined }) => useLatest(props?.value),
      { initialProps: { value: null } },
    );

    expect(result.current.current).toBeNull();
    await rerender({ value: undefined! });
    expect(result.current.current).toBeUndefined();
  });

  it("should work with reference types (objects/arrays)", async () => {
    const { result, rerender } = await renderHook(
      (props?: { obj: { count: number } }) => useLatest(props?.obj),
      { initialProps: { obj: { count: 1 } } },
    );

    const initialRef = result.current;
    expect(initialRef.current).toEqual({ count: 1 });

    await rerender({ obj: { count: 2 } });
    expect(result.current).toBe(initialRef); // ✅ ref 引用不变
    expect(result.current.current).toEqual({ count: 2 }); // ✅ 值更新
  });

  it("should be compatible with React.StrictMode", async () => {
    const { result, rerender } = await renderHook(
      (props?: { value: number }) => useLatest(props?.value),
      {
        initialProps: { value: 100 },
        wrapper: ({ children }) => <React.StrictMode>{children}</React.StrictMode>,
      },
    );

    // StrictMode 双渲染后，值仍正确
    expect(result.current.current).toBe(100);

    await rerender({ value: 200 });
    expect(result.current.current).toBe(200); // ✅ 更新后仍正确
  });
});
