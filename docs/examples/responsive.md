# 响应式与标题实战

`useResponsive` 按窗口宽度计算各断点命中状态；`useTitle` 管理 `document.title`。两者都适合放在顶层组件，多实例会共享监听。

## 断点判定

```tsx
import { useResponsive } from "@pawover/kit/hooks/react";

function Layout() {
  const { responsive, current } = useResponsive();

  return (
    <div>
      <p>当前断点：{current}</p>
      {responsive.md && <aside>≥ 768px 时显示侧栏</aside>}
      {responsive.xs && <p>超小屏提示</p>}
    </div>
  );
}
```

断点命中关系为"向下兼容"：窗口 1400px 时 `xxxl` 为 `false`，`xxl`/`xl`/`lg`/`md`/`sm`/`xs` 为 `true`，`current` 为命中的最大档（`xxl`）。

## 自定义断点 token

```tsx
import { useResponsive, BREAK_POINT_TOKEN } from "@pawover/kit/hooks/react";

const customTokens = { ...BREAK_POINT_TOKEN, MD: 800 };

function Layout() {
  const { responsive, breakPointTokens } = useResponsive({ breakPointTokens: customTokens });
  // responsive 与返回的 breakPointTokens 均按新阈值计算
}
```

断点常量（默认值）：`XS: 480`、`SM: 576`、`MD: 768`、`LG: 992`、`XL: 1200`、`XXL: 1600`、`XXXL: 1920`。

## 页面标题

```tsx
import { useTitle } from "@pawover/kit/hooks/react";

function Dashboard() {
  useTitle("仪表盘", { isRestoreOnUnmount: true }); // 卸载时恢复原标题
  return <div>…</div>;
}
```

> [!WARNING]
> `useTitle` 是轻量实现：多个实例同时设置会互相覆盖，建议在路由级（每个页面一个实例）使用；卸载恢复需要显式开启 `isRestoreOnUnmount`。

## 与 EnvUtil 组合判断设备

```tsx
import { EnvUtil } from "@pawover/kit/utils";
import { useMount } from "@pawover/kit/hooks/react";

useMount(() => {
  if (EnvUtil.isMobile()) {
    console.log("移动端（宽度 ≤ 768px 且英寸 < 7）");
  }
  if (EnvUtil.isDesktop()) {
    console.log("桌面端（宽度 ≥ 1200px）");
  }
});
```
