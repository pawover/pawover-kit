# @pawover/kit-hooks

React Hooks（5 个）+ Alova Hooks（4 个）。根导出为空，必须从子路径导入。

## React Hooks

```ts
import { useLatest, useMount, useUnmount, useTitle, useResponsive } from "@pawover/kit/hooks/react";
```

| Hook | 签名 | 说明 |
| :--- | :--- | :--- |
| `useMount` | `(effect: EffectCallback \| AnyAsyncFunction) => void` | 初始化执行一次；严格模式下也只执行一次；自动使用最新 effect |
| `useUnmount` | `(effect: AnyFunction) => void` | 卸载时执行；自动使用最新 effect |
| `useLatest` | `<T>(value: T) => RefObject<T>` | 返回始终指向最新值的 ref |
| `useTitle` | `(title: string, options?: { isRestoreOnUnmount?: boolean }) => void` | 设置 `document.title`，可选卸载恢复 |
| `useResponsive` | `(options?: { breakPointTokens? }) => { responsive; current; breakPointTokens }` | 断点检测（xs ~ xxxl），多实例共享 resize 监听 |

同时导出 `BREAK_POINT_TOKEN` 常量与 `BreakPointTokens` 类型。

## Alova Hooks

```ts
import {
  useAlovaRequest,
  useAlovaPagination,
  useAlovaWatcher,
  createBeforeRequestMiddleware,
} from "@pawover/kit/hooks/alova";
```

| 导出 | 说明 |
| :--- | :--- |
| `useAlovaRequest` | `useRequest` 封装，默认 `immediate: true` |
| `useAlovaPagination` | `usePagination` 封装，`methodHandler` 接收 `(page, pageSize, ...args)` |
| `useAlovaWatcher` | `useWatcher` 封装，监听状态自动发送（不默认 immediate） |
| `createBeforeRequestMiddleware` | 前置请求中间件，可链式组合既有 middleware |
| `BeforeRequestHandler<AG, Args>` | 前置请求处理函数类型 |

三个 Hooks 均扩展 `onBeforeRequest` / `onSuccess` / `onError` / `onComplete` 四个回调。

> [!WARNING]
> Alova Hooks 需要 `alova` 与 `react` 作为 peer 依赖。

## 完整参考

- [react 子路径全部导出（自动生成）](hooks/react/)
- [alova 子路径全部导出（自动生成）](hooks/alova/)
