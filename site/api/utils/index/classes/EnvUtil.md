[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / EnvUtil

# Class: EnvUtil

Defined in: [env/envUtil.ts:8](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/env/envUtil.ts#L8)

环境检查工具类
- ⚠️ `isBrowser` / `isWebWorker` / `isReactNative` 基于静态字段判定，在**模块加载时**求值一次。
  SSR 场景下若在 Node 端 import（此时 `window` 未定义），结果会永久为 `false`，不会随运行时环境变化重算。

## Constructors

### Constructor

> **new EnvUtil**(): `EnvUtil`

#### Returns

`EnvUtil`

## Properties

### BREAK\_POINT

> `readonly` `static` **BREAK\_POINT**: `object`

Defined in: [env/envUtil.ts:22](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/env/envUtil.ts#L22)

断点阈值常量表 —— 设备分类默认参数（768 / 1200）的唯一来源

#### MD

> `readonly` **MD**: `768` = `768`

#### XL

> `readonly` **XL**: `1200` = `1200`

#### Example

```ts
EnvUtil.BREAK_POINT.MD; // 768
EnvUtil.BREAK_POINT.XL; // 1200
```

## Methods

### isBrowser()

> `static` **isBrowser**(): `boolean`

Defined in: [env/envUtil.ts:36](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/env/envUtil.ts#L36)

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

Defined in: [env/envUtil.ts:108](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/env/envUtil.ts#L108)

检测当前设备是否为桌面设备

#### Parameters

##### minWidth?

`1200` = `EnvUtil.BREAK_POINT.XL`

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

Defined in: [env/envUtil.ts:75](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/env/envUtil.ts#L75)

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

Defined in: [env/envUtil.ts:237](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/env/envUtil.ts#L237)

检测当前设备是否为IOS移动设备

#### Parameters

##### maxWidth?

`768` = `EnvUtil.BREAK_POINT.MD`

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

Defined in: [env/envUtil.ts:174](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/env/envUtil.ts#L174)

检测当前设备是否为 macOS 桌面设备

#### Parameters

##### minWidth?

`1200` = `EnvUtil.BREAK_POINT.XL`

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

Defined in: [env/envUtil.ts:196](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/env/envUtil.ts#L196)

检测当前设备是否为移动设备

#### Parameters

##### maxWidth?

`768` = `EnvUtil.BREAK_POINT.MD`

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

Defined in: [env/envUtil.ts:62](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/env/envUtil.ts#L62)

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

Defined in: [env/envUtil.ts:261](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/env/envUtil.ts#L261)

检测当前设备是否为平板

#### Parameters

##### minWidth?

`768` = `EnvUtil.BREAK_POINT.MD`

平板最小宽度（默认 768px）

##### maxWidth?

`1200` = `EnvUtil.BREAK_POINT.XL`

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

Defined in: [env/envUtil.ts:49](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/env/envUtil.ts#L49)

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

Defined in: [env/envUtil.ts:151](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/env/envUtil.ts#L151)

检测当前设备是否为 Windows 桌面设备

#### Parameters

##### minWidth?

`1200` = `EnvUtil.BREAK_POINT.XL`

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
