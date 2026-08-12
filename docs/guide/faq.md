# 常见问题

## `@pawover/kit/hooks` 导入为空？

`@pawover/kit-hooks` 根导出刻意保持为空（`export {}`）。请始终从子路径导入：

```ts
import { useMount } from "@pawover/kit/hooks/react";
import { useAlovaRequest } from "@pawover/kit/hooks/alova";
```

## 使用 Alova Hooks 报依赖错误？

`alova` 与 `react` 是可选 peer 依赖，需要自行安装：

```bash
npm install alova react
```

同样地，`MathUtil` / `CurrencyUtil.toRealValue` 需要 `mathjs`，`ViteUtil` 需要 `vite`，Zod Schema 需要 `zod`。

## `toRealValue` 的返回类型是 string？

`CurrencyUtil.toRealValue` 默认返回精确十进制字符串（避免浮点误差）：

```ts
import { create, all } from "mathjs";
import { CurrencyUtil } from "@pawover/kit/utils";

const math = create(all, { number: "BigNumber" });
CurrencyUtil.toRealValue(math, "0.1"); // "0.1"（string）
```

需要数值时传 `stringMode: false`。

## `isChineseID` 校验身份证校验位吗？

不校验。`ValidateUtil.isChineseID` 校验 18 位格式与生日合法性，**不含**末位校验位计算。

## `MimeUtil.fromExtension` 传参要不要带点？

都支持，且不区分大小写：

```ts
MimeUtil.fromExtension("html"); // [".html"...] 的同义词
MimeUtil.fromExtension(".HTML"); // 同上
```

## `TreeUtil.filter` 会修改原树吗？

不会。转换类方法（`rowsToTree` / `treeToRows` / `filter` / `map`）输出新对象引用；查询类方法（`find` / `forEach`）使用原引用、不产出新树。

## 如何只引入某个工具类？

`@pawover/kit-utils` 是单包多类结构，按需 tree-shaking 即可（产物为 ESM，支持摇树）。若想进一步瘦身，可直接从子路径引入 `math` / `vite` 专属工具类。

## Node 版本要求？

Node.js >= 22.20.0（仓库开发与发布要求 pnpm >= 11）。作为依赖使用时无 Node 版本约束——它只是普通 ESM/CJS 包。
