[**@pawover/kit-hooks**](../../index.md)

***

[@pawover/kit-hooks](../../index.md) / [react](../index.md) / useResponsive

# Function: useResponsive()

> **useResponsive**(`options?`): `object`

Defined in: [react/useResponsive.ts:72](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/hooks/src/react/useResponsive.ts#L72)

屏幕响应式 Hook，监听窗口尺寸变化并返回各断点命中状态
- 全局仅注册一个 resize 监听器，按「断点 token 签名」共享计算结果：token 相同的实例共享一次计算与状态
- 实例通过 options 覆盖断点 token，覆盖仅作用于该实例，不会改写默认表
- 断点 token 变化时自动重新订阅

## Parameters

### options?

[`ResponsiveHookOptions`](../interfaces/ResponsiveHookOptions.md)

配置项

## Returns

`object`

响应式状态（各断点是否命中）、当前断点、合并后的断点 token

### breakPointTokens

> **breakPointTokens**: [`BreakPointTokens`](../type-aliases/BreakPointTokens.md) = `tokens`

### current

> **current**: `"xxxl"` \| `"xxl"` \| `"xl"` \| `"lg"` \| `"md"` \| `"sm"` \| `"xs"`

### responsive

> **responsive**: `ResponsiveValues`

## Example

```ts
// 默认断点表
const { responsive, current } = useResponsive();

// 覆盖部分断点（仅当前实例生效）
const { responsive } = useResponsive({ breakPointTokens: { XS: 100, XL: 99999 } });
```
