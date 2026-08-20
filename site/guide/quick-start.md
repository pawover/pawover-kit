# 快速开始

五个包各取一个典型用法，一分钟看完全部能力。

```ts
import { TypeUtil } from "@pawover/kit/utils";
import { useMount } from "@pawover/kit/hooks/react";
import { useAlovaRequest } from "@pawover/kit/hooks/alova";
import type { AnyObject } from "@pawover/kit/types";
import eslintRules from "@pawover/kit/eslint-rules";
import { id } from "@pawover/kit/zod";
```

## 类型工具

```ts
const obj: AnyObject = { a: 1, b: "2" }; // 任意键值对对象
```

## 静态工具类

```ts
TypeUtil.isString("hello"); // true
TypeUtil.isPlainObject({}); // true

import { ArrayUtil } from "@pawover/kit/utils";
ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
```

## React Hook

```tsx
useMount(() => {
  console.log("mounted");
});
```

## ESLint 规则集（flat config）

```ts
// eslint.config.js
export default [
  { ignores: eslintRules.GLOB_EXCLUDE },
  { files: ["**/*.ts"], rules: { ...eslintRules.javascript, ...eslintRules.typescript } },
];
```

## Zod Schema

```ts
id.parse("abc"); // "abc"
id.parse(42); // 42
```

## 树操作

```ts
import { TreeUtil } from "@pawover/kit/utils";

const rows = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
];

const tree = TreeUtil.rowsToTree(rows);
// [{ id: 1, parentId: null, children: [{ id: 2, parentId: 1, children: [] }] }]
```

更多组合用法见[实战示例](/examples/tree)。
