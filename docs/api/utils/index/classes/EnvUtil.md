[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / EnvUtil

# Class: EnvUtil

Defined in: [env/envUtil.ts:8](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/env/envUtil.ts#L8)

环境检查工具类
- ⚠️ `isBrowser` / `isWebWorker` / `isReactNative` 基于静态字段判定，在**模块加载时**求值一次。
  SSR 场景下若在 Node 端 import（此时 `window` 未定义），结果会永久为 `false`，不会随运行时环境变化重算。

## Constructors

### Constructor

> **new EnvUtil**(): `EnvUtil`

#### Returns

`EnvUtil`

## Methods

### isBrowser()

> `static` **isBrowser**(): `boolean`

Defined in: [env/envUtil.ts:22](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/env/envUtil.ts#L22)

检测是否处于浏览器环境

#### Returns

`boolean`

是否为浏览器环境

#### Example

```ts
EnvUtil.isBrowser(); // true: 浏览器, false: Node.js
```

***

### isDesktop()

> `static` **isDesktop**(`minWidth?`, `minScreenSize?`, `dpi?`): `boolean`

Defined in: [env/envUtil.ts:94](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/env/envUtil.ts#L94)

检测当前设备是否为桌面设备

#### Parameters

##### minWidth?

`number` = `1200`

桌面设备最小宽度（默认 1200px）

##### minScreenSize?

`number` = `10`

桌面设备最小屏幕尺寸（默认 10英寸）

##### dpi?

`number` = `160`

标准 DPI 基准（默认 160）

#### Returns

`boolean`

是否为桌面设备

#### Example

```ts
// 假设 window.innerWidth = 1920
EnvUtil.isDesktop(); // true

// 自定义阈值
EnvUtil.isDesktop(1440, 13); // 更严格的桌面检测
```

***

### isIframe()

> `static` **isIframe**(): `boolean`

Defined in: [env/envUtil.ts:61](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/env/envUtil.ts#L61)

检查是否在 iframe 环境中

#### Returns

`boolean`

是否在 iframe 中

#### Example

```ts
EnvUtil.isIframe(); // true: 当前页面在 iframe 中
```

***

### isIOSMobile()

> `static` **isIOSMobile**(`maxWidth?`, `dpi?`): `boolean`

Defined in: [env/envUtil.ts:223](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/env/envUtil.ts#L223)

检测当前设备是否为IOS移动设备

#### Parameters

##### maxWidth?

`number` = `768`

移动设备最大宽度（默认 768px）

##### dpi?

`number` = `160`

标准 DPI 基准（默认 160）

#### Returns

`boolean`

是否为 iOS 移动设备 (iPhone/iPod)

#### Example

```ts
// UA contains iPhone
EnvUtil.isIOSMobile(); // true
```

***

### isMacOSDesktop()

> `static` **isMacOSDesktop**(`minWidth?`, `minScreenSize?`, `dpi?`): `boolean`

Defined in: [env/envUtil.ts:160](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/env/envUtil.ts#L160)

检测当前设备是否为 macOS 桌面设备

#### Parameters

##### minWidth?

`number` = `1200`

桌面设备最小宽度（默认 1200px）

##### minScreenSize?

`number` = `10`

桌面设备最小屏幕尺寸（默认 10英寸）

##### dpi?

`number` = `160`

标准 DPI 基准（默认 160）

#### Returns

`boolean`

是否为 macOS 桌面设备

#### Example

```ts
// UA contains Macintosh
EnvUtil.isMacOSDesktop(); // true
```

***

### isMobile()

> `static` **isMobile**(`maxWidth?`, `dpi?`): `boolean`

Defined in: [env/envUtil.ts:182](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/env/envUtil.ts#L182)

检测当前设备是否为移动设备

#### Parameters

##### maxWidth?

`number` = `768`

移动设备最大宽度（默认 768px）

##### dpi?

`number` = `160`

标准 DPI 基准（默认 160）

#### Returns

`boolean`

是否为移动设备

#### Example

```ts
// 假设 window.innerWidth = 500
EnvUtil.isMobile(); // true
```

***

### isReactNative()

> `static` **isReactNative**(): `boolean`

Defined in: [env/envUtil.ts:48](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/env/envUtil.ts#L48)

检测是否处于 React Native 环境

#### Returns

`boolean`

是否为 React Native 环境

#### Example

```ts
EnvUtil.isReactNative(); // true: React Native, false: Web/Node.js
```

***

### isTablet()

> `static` **isTablet**(`minWidth?`, `maxWidth?`, `dpi?`): `boolean`

Defined in: [env/envUtil.ts:247](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/env/envUtil.ts#L247)

检测当前设备是否为平板

#### Parameters

##### minWidth?

`number` = `768`

平板最小宽度（默认 768px）

##### maxWidth?

`number` = `1200`

平板最大宽度（默认 1200px）

##### dpi?

`number` = `160`

标准 DPI 基准（默认 160）

#### Returns

`boolean`

是否为平板设备
- 宽度命中 `[minWidth, maxWidth]` 区间，或 CSS/DPI 折算尺寸落在 `[7, 13)` 英寸（排除 DPR=1 的 1920×1080 桌面）

#### Example

```ts
// 假设 window.innerWidth = 1000
EnvUtil.isTablet(); // true
```

***

### isWebWorker()

> `static` **isWebWorker**(): `boolean`

Defined in: [env/envUtil.ts:35](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/env/envUtil.ts#L35)

检测是否处于 Web Worker 环境

#### Returns

`boolean`

是否为 Web Worker 环境

#### Example

```ts
EnvUtil.isWebWorker(); // true: Worker, false: 主线程/Node.js
```

***

### isWindowsDesktop()

> `static` **isWindowsDesktop**(`minWidth?`, `minScreenSize?`, `dpi?`): `boolean`

Defined in: [env/envUtil.ts:137](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/env/envUtil.ts#L137)

检测当前设备是否为 Windows 桌面设备

#### Parameters

##### minWidth?

`number` = `1200`

桌面设备最小宽度（默认 1200px）

##### minScreenSize?

`number` = `10`

桌面设备最小屏幕尺寸（默认 10英寸）

##### dpi?

`number` = `160`

标准 DPI 基准（默认 160）

#### Returns

`boolean`

是否为 Windows 桌面设备

#### Example

```ts
// UA contains Windows
EnvUtil.isWindowsDesktop(); // true
```
