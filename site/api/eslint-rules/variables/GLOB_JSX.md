[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / GLOB\_JSX

# Variable: GLOB\_JSX

> `const` **GLOB\_JSX**: `"**/*.jsx"` = `"**/*.jsx"`

Defined in: globs.ts:53

JSX 组件文件

react 的 type-aware 规则在启用 `typescript` 时作用于 jsx；类型是否可用由项目 tsconfig 的 include / allowJs 决定。

## Example

```ts
import { GLOB_JSX } from "@pawover/kit-eslint-rules";

const files = [GLOB_JSX];
```
