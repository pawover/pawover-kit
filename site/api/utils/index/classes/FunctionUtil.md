[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / FunctionUtil

# Class: FunctionUtil

Defined in: [function/functionUtil.ts:7](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/function/functionUtil.ts#L7)

函数工具类

## Constructors

### Constructor

> **new FunctionUtil**(): `FunctionUtil`

#### Returns

`FunctionUtil`

## Methods

### to()

> `static` **to**\<`T`, `U`\>(`promise`, `errorExt?`): `Promise`\<\[`U`, `undefined`\] \| \[`null`, `T`\]\>

Defined in: [function/functionUtil.ts:19](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/function/functionUtil.ts#L19)

将 Promise 转换为 `[err, result]` 格式，方便 async/await 错误处理

#### Type Parameters

##### T

`T`

##### U

`U` = `Error`

#### Parameters

##### promise

`Readonly`\<`Promise`\<`T`\>\>

待处理的 Promise

##### errorExt?

`PlainObject`

附加到 error 对象的扩展信息（注意：如果原 error 是 Error 实例，扩展属性可能会覆盖或无法正确合并非枚举属性）

#### Returns

`Promise`\<\[`U`, `undefined`\] \| \[`null`, `T`\]\>

`[err, null]` 或 `[null, data]`

#### Example

```ts
const [err, data] = await FunctionUtil.to(someAsyncFunc());
```

***

### toArgs()

> `static` **toArgs**\<`T`\>(`args`, `start?`): `T`[]

Defined in: [function/functionUtil.ts:87](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/function/functionUtil.ts#L87)

将 Arguments 对象转换为数组

⚠️ 注意：TypeScript 官方推荐使用 rest parameters (...args) 替代 arguments
本函数仅用于处理遗留代码或特殊场景（如装饰器中需保留 this 绑定）

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### args

`IArguments`

Arguments 对象（必须为类数组对象）

##### start?

`number`

起始索引（可选，默认为 0）

#### Returns

`T`[]

转换后的数组，元素类型为 T

#### Throws

TypeError 如果 args 为 null 或 undefined

#### Example

```ts
// 遗留代码场景
function legacyFn(a: number, b: string) {
  const argsArray = FunctionUtil.toArgs(arguments);
  // argsArray: unknown[]
}

// 现代替代方案（推荐）
function modernFn(a: number, b: string, ...rest: unknown[]) {
  // rest 已经是数组，无需 toArgs
}

// 参数截取
function skipFirst(...args: unknown[]) {
  const rest = FunctionUtil.toArgs(arguments, 1);
  // rest: unknown[]，跳过第一个参数
}
```

***

### toPromise()

> `static` **toPromise**\<`T`\>(`fn`): `Promise`\<`T`\>

Defined in: [function/functionUtil.ts:114](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/function/functionUtil.ts#L114)

将同步或异步函数统一包装为 Promise
- 自动捕获同步异常

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

() => `T` \| `Promise`\<`T`\>

返回值可为同步值或 Promise 的函数

#### Returns

`Promise`\<`T`\>

标准化的 Promise

#### Example

```ts
// 同步函数
FunctionUtil.toPromise(() => 42).then(v => console.log(v)); // 42

// 异步函数
FunctionUtil.toPromise(async () => await fetchData()).then(data => ...);

// 异常处理
FunctionUtil.toPromise(() => { throw new Error('fail'); }).catch(err => console.error(err)); // 捕获同步异常
```
