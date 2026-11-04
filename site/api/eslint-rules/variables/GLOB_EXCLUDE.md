[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / GLOB\_EXCLUDE

# Variable: GLOB\_EXCLUDE

> `const` **GLOB\_EXCLUDE**: `string`[]

Defined in: [globExclude.ts:17](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/globExclude.ts#L17)

全局忽略目录列表

在 ESLint 配置中直接忽略的目录与文件 glob 集合，包含依赖、构建产物、锁文件、编辑器目录、缓存等。
预设工厂（`src/config.ts`）将其作为 `pawover/ignores` 配置层的 `ignores` 值。

## Example

```ts
import { GLOB_EXCLUDE } from "@pawover/kit-eslint-rules";

export default [
  { ignores: GLOB_EXCLUDE },
  // ...其余配置
];
```
