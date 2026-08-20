[**@pawover/kit-hooks**](../../index.md)

***

[@pawover/kit-hooks](../../index.md) / [react](../index.md) / useMount

# Function: useMount()

> **useMount**(`effect`): `void`

Defined in: [react/useMount.ts:24](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/hooks/src/react/useMount.ts#L24)

在组件初始化时执行的 Hook
- 即使在严格模式（React StrictMode）也只执行一次
- 自动使用最新版 effect 函数

## Parameters

### effect

`EffectCallback` \| `AnyAsyncFunction`

副作用函数（必须为同步函数；若为异步函数，清理逻辑需自行处理）

## Returns

`void`

## Example

```ts
useMount(() => {
  console.log('组件挂载');
  return () => console.log('组件卸载');
});

useMount(async () => {
  const data = await fetchData();
  // 清理逻辑需通过 ref/AbortController 自行管理
  // ❌ 不要 return cleanupFn（async 函数返回 Promise，无法作为清理函数）
});
```
