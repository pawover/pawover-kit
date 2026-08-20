[**@pawover/kit-hooks**](../../index.md)

***

[@pawover/kit-hooks](../../index.md) / [alova](../index.md) / useAlovaWatcher

# Function: useAlovaWatcher()

> **useAlovaWatcher**\<`AG`, `Args`\>(`methodHandler`, `watchingStates`, `hookOptions?`): `UseHookExposure`\<`AG`, `Args`, `unknown`\>

Defined in: [alova/useAlovaWatcher.ts:7](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/hooks/src/alova/useAlovaWatcher.ts#L7)

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
