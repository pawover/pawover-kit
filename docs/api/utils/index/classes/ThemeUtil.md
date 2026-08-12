[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / ThemeUtil

# Class: ThemeUtil

Defined in: [theme/themeUtil.ts:4](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/theme/themeUtil.ts#L4)

主题工具类

## Constructors

### Constructor

> **new ThemeUtil**(): `ThemeUtil`

#### Returns

`ThemeUtil`

## Properties

### THEME

> `readonly` `static` **THEME**: `object`

Defined in: [theme/themeUtil.ts:14](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/theme/themeUtil.ts#L14)

固定主题类型（仅亮色/暗色）

#### DARK

> `readonly` **DARK**: `"dark"` = `"dark"`

#### LIGHT

> `readonly` **LIGHT**: `"light"` = `"light"`

#### Example

```ts
ThemeUtil.THEME.LIGHT; // "light"
ThemeUtil.THEME.DARK; // "dark"
```

***

### THEME\_MODE

> `readonly` `static` **THEME\_MODE**: `object`

Defined in: [theme/themeUtil.ts:28](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/theme/themeUtil.ts#L28)

主题模式（支持跟随系统）

#### DARK

> `readonly` **DARK**: `"dark"` = `"dark"`

#### LIGHT

> `readonly` **LIGHT**: `"light"` = `"light"`

#### SYSTEM

> `readonly` **SYSTEM**: `"system"` = `"system"`

#### Example

```ts
ThemeUtil.THEME_MODE.SYSTEM; // "system"
ThemeUtil.THEME_MODE.DARK; // "dark"
```
