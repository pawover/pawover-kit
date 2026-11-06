# Specialized utilities

The core classes cover most data-shape work. This reference covers the classes
that exist for a specific domain. Import them from the same entry unless noted.

## `CurrencyUtil`

`currencyFormatter` uses `Intl.NumberFormat` and works without `mathjs`.
`toRealValue` requires a `mathjs` instance and is intended for precise decimal
arithmetic.

```ts
import { create, all } from "mathjs";
import { CurrencyUtil } from "@pawover/kit-utils";

const math = create(all);

CurrencyUtil.currencyFormatter(1234.56, {
  locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
  currencySign: "¥",
  currencySignPosition: "start",
  currencyFormatOptions: { style: "currency", currency: "CNY" },
}); // "¥ 1,234.56"

CurrencyUtil.currencyFormatter(1234.56, {
  locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
  currencySign: null,
  currencySignPosition: "start",
  currencyFormatOptions: { style: "currency", currency: "CNY" },
}); // "1,234.56"

CurrencyUtil.toRealValue(math, 0.1 + 0.2, 2); // "0.30"
CurrencyUtil.toRealValue(math, "0.1", undefined, false); // 0.1
```

`currencySign` has three states: a non-empty string replaces the symbol, `null`
removes it, and `undefined` keeps the native `Intl` symbol. `toRealValue`
returns `null` for `null` / `undefined` input.

## `DateTimeUtil`

`DateTimeUtil` exposes duration constants, format templates, and local time-zone
information. It does not parse or format dates by itself; use `Intl.DateTimeFormat`
or a date library for that.

```ts
import { DateTimeUtil } from "@pawover/kit-utils";

DateTimeUtil.MILLISECONDS_PER_SECOND; // 1000
DateTimeUtil.SECOND_PER_DAY; // 86400
DateTimeUtil.FORMAT.ISO_DATE; // "yyyy-MM-dd"
DateTimeUtil.FORMAT.CN_DATE_TIME; // "yyyy年MM月dd日 HH时mm分ss秒"
DateTimeUtil.getTimeZone(); // { UTC: "UTC+8", timeZone: "Asia/Shanghai" }
```

## `EnvUtil`

`EnvUtil` classifies the runtime and physical device. The browser / worker /
React Native flags are static fields evaluated when the module loads, so an SSR
server that imports the package in Node gets permanent `false` values for that
module instance.

```ts
import { EnvUtil } from "@pawover/kit-utils";

EnvUtil.isBrowser();
EnvUtil.isWebWorker();
EnvUtil.isReactNative();
EnvUtil.isIframe();
EnvUtil.isMobile(); // width < 768 and screen diagonal < 7 inches
EnvUtil.isTablet(); // 768 <= width <= 1200, or 7 <= diagonal < 13 inches
EnvUtil.isDesktop(); // width >= 1200 and diagonal >= 10 inches
EnvUtil.isIOSMobile();
EnvUtil.isWindowsDesktop();
EnvUtil.isMacOSDesktop();
```

The device helpers return `false` when `window` is unavailable. `isTablet`
intentionally keeps the 1366×768 laptop classification documented in the
repository domain notes; do not replace it with a pure width check.

## `FunctionUtil`

`to` converts a promise to a tuple and optionally attaches context to the error.
`toPromise` normalizes a sync or async function and captures synchronous throws.
`toArgs` is for legacy `arguments` objects; prefer rest parameters in new code.

```ts
import { FunctionUtil } from "@pawover/kit-utils";

const [error, data] = await FunctionUtil.to(Promise.resolve(42));
if (error) {
  // handle error
} else {
  console.log(data);
}

FunctionUtil.toPromise(() => 42).then((value) => value);
FunctionUtil.toPromise(() => {
  throw new Error("sync failure");
}).catch((error) => error);
```

`to` returns `[null, data]` on success and `[error, undefined]` on failure. Check
the first element before using the second.

## `I18nUtil`

`toFullLocale` maps a base language to its primary locale; `toBaseLanguage`
strips the region; `toLocaleDisplayName` uses `Intl.DisplayNames`. A returned
value is not guaranteed to be a valid BCP 47 tag when normalization fails.

```ts
import { I18nUtil } from "@pawover/kit-utils";

I18nUtil.toFullLocale("en"); // "en-US"
I18nUtil.toFullLocale("en-US"); // "en-US"
I18nUtil.toFullLocale("xx"); // "xx" (unchanged)

I18nUtil.toBaseLanguage("en-US"); // "en"
I18nUtil.toBaseLanguage("EN-US"); // "EN" (case preserved)

I18nUtil.toLocaleDisplayName("US", { language: "zh" }); // "美国"
I18nUtil.toLocaleDisplayName("en", { language: "zh" }); // "英语"
I18nUtil.toLocaleDisplayName("xx", { fallback: "未知" }); // "未知"
```

`LOCALE_ENUM` is a country/region code map, and `PRIMARY_LANGUAGE_ENUM` maps a
base language to one representative locale. Use these maps instead of
hand-maintaining locale strings.

## `MimeUtil`

`MimeUtil` maps extensions to MIME types and back. The maps are static; use the
methods for lookup.

```ts
import { MimeUtil } from "@pawover/kit-utils";

MimeUtil.fromExtension(".png"); // ["image/png"]
MimeUtil.fromExtension("png"); // ["image/png"] — a leading dot is optional
MimeUtil.fromExtension(".PNG"); // ["image/png"]
MimeUtil.toExtension("IMAGE/PNG"); // [".png"]
MimeUtil.FILE_MIME.PDF; // "application/pdf"
```

Both lookups lowercase their input, and `fromExtension` accepts the extension
with or without a leading dot.

## `ThemeUtil`

`ThemeUtil` provides the fixed theme values and the theme mode that can follow
the system.

```ts
import { ThemeUtil } from "@pawover/kit-utils";

ThemeUtil.THEME.LIGHT; // "light"
ThemeUtil.THEME.DARK; // "dark"
ThemeUtil.THEME_MODE.SYSTEM; // "system"
ThemeUtil.THEME_MODE.LIGHT; // "light"
ThemeUtil.THEME_MODE.DARK; // "dark"
```

## `MathUtil` (subpath)

`MathUtil` is exposed from `@pawover/kit-utils/math` because `mathjs` is an
optional peer. It wraps `mathjs` `bignumber` conversion, decimal formatting, and
expression evaluation. `evaluate` accepts trusted expressions only; do not pass
untrusted user input to it.

```ts
import { create, all } from "mathjs";
import { MathUtil } from "@pawover/kit-utils/math";

const math = create(all);

MathUtil.toBignumber(math, "0.1");
MathUtil.toDecimal(math, 0.12345, 2); // "0.12"
MathUtil.toDecimal(math, 0.12345, 2, false); // BigNumber(0.12345)
MathUtil.toEvaluate(math, "a + b", { a: math.bignumber(1), b: math.bignumber(2) }); // "3"
```

## `ViteUtil` (subpath)

`ViteUtil.toProxy` builds a Vite `server.proxy` object from `[prefix, target]`
pairs. It escapes the prefix for the rewrite regex and disables TLS verification
for HTTPS targets. The latter is a development-only convenience.

```ts
import { ViteUtil } from "@pawover/kit-utils/vite";

const proxyList: [string, string][] = [
  ["/api", "http://localhost:3000"],
  ["/mock", "https://example.com"],
];

const proxy = ViteUtil.toProxy(proxyList, { timeout: 5000 });
// {
//   "/api": { target: "http://localhost:3000", changeOrigin: true, ws: true, rewrite: [Function] },
//   "/mock": { target: "https://example.com", changeOrigin: true, ws: true, secure: false, rewrite: [Function] }
// }
```

`options` is spread into every proxy entry after the defaults, so it can override
`changeOrigin`, `ws`, `secure`, or `rewrite`. Do not enable `secure: false` in a
production proxy.
