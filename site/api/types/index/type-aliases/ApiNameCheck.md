[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / ApiNameCheck

# Type Alias: ApiNameCheck\<N, P\>

> **ApiNameCheck**\<`N`, `P`\> = `N` *extends* `` `${infer L extends ValidChar}${infer R}` `` ? `ApiNameCheck`\<`R`, `` `${P}${L}` ``\> : `P` *extends* `` `${infer S}_` `` ? `S` : `P`

Defined in: [api.ts:27](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/types/src/api.ts#L27)

API 命名检查

递归校验命名仅包含大写字母与下划线，并剥离尾随下划线；遇到非法字符时返回空字符串。

## Type Parameters

### N

`N` *extends* `string`

待检查的命名

### P

`P` *extends* `string` = `""`

内部递归累计结果（由编译器推导，无需传入）

## Returns

剥离尾随下划线后的合法命名；包含非法字符时为 `""`

## Example

```ts
type A = ApiNameCheck<"GET_USER">; // "GET_USER"
type B = ApiNameCheck<"GET_USER_">; // "GET_USER"（尾随下划线被剥离）
type C = ApiNameCheck<"getUser">; // ""（小写字符非法）
```
