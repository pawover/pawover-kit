[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [vite](../index.md) / ViteUtil

# Class: ViteUtil

Defined in: [vite/viteUtil.ts:6](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/vite/viteUtil.ts#L6)

Vite 工具类

## Constructors

### Constructor

> **new ViteUtil**(): `ViteUtil`

#### Returns

`ViteUtil`

## Methods

### toProxy()

> `static` **toProxy**\<`L`\>(`proxyList`, `options?`): `Record`\<`string`, `ProxyOptions`\>

Defined in: [vite/viteUtil.ts:25](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/vite/viteUtil.ts#L25)

开发服务器反向代理配置

#### Type Parameters

##### L

`L` *extends* \[`string`, `string`\][]

#### Parameters

##### proxyList

`L`

代理配置项

##### options?

`ProxyOptions`

追加到每个代理项的 Vite `ProxyOptions`

#### Returns

`Record`\<`string`, `ProxyOptions`\>

Vite `server.proxy` 可直接使用的配置对象

#### Example

```ts
ViteUtil.toProxy([
  ["/api", "http://localhost:3000"],
  ["/mock", "https://example.com"],
]);
// {
//   "/api": { target: "http://localhost:3000", changeOrigin: true, ws: true, rewrite: [Function] },
//   "/mock": { target: "https://example.com", changeOrigin: true, ws: true, secure: false, rewrite: [Function] }
// }
```
