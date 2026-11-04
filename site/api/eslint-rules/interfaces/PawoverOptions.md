[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / PawoverOptions

# Interface: PawoverOptions

Defined in: config.ts:48

预设工厂选项

除 `javascript` 规则组常开外，其余规则组均通过对应布尔字段显式开启；`typescript` 开启时自动接入 TypeScript parser 与 type-aware 解析。

## Example

```ts
const options: PawoverOptions = {
  typescript: true,
  react: true,
  parserOptions: { tsconfigRootDir: import.meta.dirname },
};
```

## Properties

### antfu?

> `optional` **antfu?**: `boolean`

Defined in: config.ts:54

启用 `antfu` 规则组

***

### imports?

> `optional` **imports?**: `boolean`

Defined in: config.ts:56

启用 `imports` 规则组（eslint-plugin-import-lite）

***

### importsSort?

> `optional` **importsSort?**: `boolean`

Defined in: config.ts:58

启用 `importsSort` 规则组（eslint-plugin-simple-import-sort）

***

### parserOptions?

> `optional` **parserOptions?**: `Record`\<`string`, `unknown`\>

Defined in: config.ts:64

透传给 TypeScript parser 的解析选项；与默认值浅合并，同名键以本参数为准（默认 `{ projectService: true }`）

***

### react?

> `optional` **react?**: `boolean`

Defined in: config.ts:60

启用 `react` 规则组（同时注册 `@eslint-react` 与 `eslint-plugin-react-hooks` 两个插件；未开启 `typescript` 时自动关闭 `@eslint-react` 依赖类型信息的规则，并将其注册为无操作实现——后置覆盖也无法强制开启）

***

### stylistic?

> `optional` **stylistic?**: `boolean`

Defined in: config.ts:52

启用 `stylistic` 规则组

***

### typescript?

> `optional` **typescript?**: `boolean`

Defined in: config.ts:50

启用 `typescript` 规则组（ts / tsx 文件；同时注册 TypeScript parser，默认启用 type-aware 解析）

***

### vue?

> `optional` **vue?**: `boolean`

Defined in: config.ts:62

启用 `vue` 规则组（vue / vue+ts 单文件组件；同时接入 vue-eslint-parser）
