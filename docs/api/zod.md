# @pawover/kit-zod

Zod v4 Schema：30 个常用校验器，均为可直接引用的 schema 常量，无参数。

## 服务端语义

| Schema | 说明 |
| :--- | :--- |
| `id` | 主键：非空字符串或数字的联合 |
| `idAllowEmpty` | `id` 的可空版本 |

## 基础类型

| Schema | 说明 |
| :--- | :--- |
| `empty` | `null \| undefined` 联合 |
| `string` / `stringNoEmpty` / `stringAllowEmpty` / `stringEmpty` | 任意字符串 / 非空 / 可空 / 仅空串 |
| `number` / `numberAllowEmpty` | 任意数字 / 可空 |
| `integer` / `integerAllowEmpty` | 整数 / 可空 |
| `integerPositive` / `integerPositiveAllowEmpty` | 非负整数（含 0）/ 可空 |
| `integerNegative` / `integerNegativeAllowEmpty` | 非正整数（含 0）/ 可空 |
| `boolean` / `booleanAllowEmpty` | 布尔 / 可空 |
| `bigint` 系列 | `bigint` / `bigintAllowEmpty` / `bigintPositive` / `bigintPositiveAllowEmpty` / `bigintNegative` / `bigintNegativeAllowEmpty` |
| `symbol` | Symbol |
| `any` / `unknown` / `never` | 对应 `z.any()` / `z.unknown()` / `z.never()` |
| `propertyKey` | `string \| number \| symbol` |
| `anyObject` | `z.record(propertyKey, any)`，对应 `AnyObject` |
| `plainObject` | `z.record(propertyKey, unknown)`，对应 `PlainObject` |

## 用法

```ts
import { id, stringNoEmpty, integerPositive } from "@pawover/kit/zod";

id.parse("abc"); // "abc"
id.parse(42); // 42
```

> [!WARNING]
> 需要 `zod`（可选 peer 依赖，要求 v4）。

## 完整参考

- [全部导出（自动生成）](zod/) —— 每个 schema 的完整类型签名
