[**@pawover/kit-hooks**](../../index.md)

***

[@pawover/kit-hooks](../../index.md) / [react](../index.md) / useTitle

# Function: useTitle()

> **useTitle**(`title`, `options?`): `void`

Defined in: [react/useTitle.ts:19](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/hooks/src/react/useTitle.ts#L19)

设置页面标题
- 轻量级，适用于无路由库时设置页面标题
- 多个 `useTitle` 实例会互相干扰，需在顶层组件使用
- 无法处理 `document.title` 固有的竞态问题

## Parameters

### title

`string`

页面标题

### options?

`TitleHookOptions`

配置选项

## Returns

`void`
