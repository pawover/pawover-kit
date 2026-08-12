[**@pawover/kit-hooks**](../../index.md)

***

[@pawover/kit-hooks](../../index.md) / [alova](../index.md) / useAlovaWatcher

# Function: useAlovaWatcher()

> **useAlovaWatcher**\<`AG`, `Args`\>(`methodHandler`, `watchingStates`, `hookOptions?`): `UseHookExposure`\<`AG`, `Args`, `unknown`\>

Defined in: [alova/useAlovaWatcher.ts:13](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/hooks/src/alova/useAlovaWatcher.ts#L13)

## Type Parameters

### AG

`AG` *extends* `AlovaGenerics`\<`any`, `any`, `any`, `any`, `any`, `any`, `any`, `any`\>

### Args

`Args` *extends* `any`[] = `any`[]

## Parameters

### methodHandler

`Method`\<`AG`\> \| `AlovaMethodHandler`\<`AG`, `Args`\>

### watchingStates

`AG`\[`"StatesExport"`\]\[`"Watched"`\][]

### hookOptions?

`HookOptions`\<`AG`, `Args`\> = `{}`

## Returns

`UseHookExposure`\<`AG`, `Args`, `unknown`\>
