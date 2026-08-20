# Alova 请求实战

Alova Hooks 对官方 `useRequest` / `usePagination` / `useWatcher` 做封装：默认 `immediate: true`，扩展 4 个回调（`onBeforeRequest` / `onSuccess` / `onError` / `onComplete`）。

## 基础请求

```tsx
import { useAlovaRequest } from "@pawover/kit/hooks/alova";
import { createAlova } from "alova";

const alova = createAlova({ baseURL: "https://api.example.com" });

function UserProfile({ userId }: { userId: string }) {
  const { loading, data, send } = useAlovaRequest(
    () => alova.Get(`/users/${userId}`),
    {
      onBeforeRequest: () => console.log("请求前"),
      onSuccess: (message) => console.log("成功:", message.data),
      onError: (error) => console.error("失败:", error),
      onComplete: () => console.log("完成（无论成败）"),
    },
  );

  if (loading) return <div>加载中…</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

## 前置中间件（token 注入）

`createBeforeRequestMiddleware` 在请求发出前注入逻辑，并可链式组合既有中间件：

```tsx
import { useAlovaRequest, createBeforeRequestMiddleware } from "@pawover/kit/hooks/alova";

const authMiddleware = createBeforeRequestMiddleware(undefined, (context) => {
  context.config.headers = { Authorization: `Bearer ${getToken()}` };
});

function ProtectedData() {
  const { data } = useAlovaRequest(
    () => alova.Get("/me"),
    { middleware: authMiddleware },
  );
}
```

## 分页

`methodHandler` 接收 `(page, pageSize)` 与附加参数，配合 `useAlovaPagination` 管理分页状态：

```tsx
import { useAlovaPagination } from "@pawover/kit/hooks/alova";

function UserList() {
  const { page, pageSize, data, total, loading, onPageChange } = useAlovaPagination(
    (page, pageSize) => alova.Get("/users", { params: { page, pageSize } }),
    { initialPage: 1, initialPageSize: 20 },
  );

  return (
    <div>
      <ul>{data?.list.map((user) => <li key={user.id}>{user.name}</li>)}</ul>
      <button onClick={() => onPageChange(page + 1)}>下一页（共 {total} 条）</button>
    </div>
  );
}
```

## 状态监听请求

`useAlovaWatcher` 监听状态变化自动发送（**不默认** `immediate`）：

```tsx
import { useAlovaWatcher } from "@pawover/kit/hooks/alova";

function Search() {
  const [keyword, setKeyword] = useState("");
  const { data, loading } = useAlovaWatcher(
    () => alova.Get("/search", { params: { q: keyword } }),
    [keyword], // 监听 keyword 变化
    { immediate: true },
  );
}
```

> [!NOTE]
> 三个 Hooks 的选项类型继承 alova 官方对应 config，`HookOptions` 为内部类型；自定义选项对象在 TS 下会得到完整推导。
