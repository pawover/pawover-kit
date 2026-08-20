[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / CurrencyUtil

# Class: CurrencyUtil

Defined in: [currency/currencyUtil.ts:17](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/currency/currencyUtil.ts#L17)

货币工具类
- 基于 [`Intl.NumberFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) 进行本地化格式化
- 支持精确小数位处理（依赖 `mathjs`）

## Constructors

### Constructor

> **new CurrencyUtil**(): `CurrencyUtil`

#### Returns

`CurrencyUtil`

## Properties

### CURRENCY\_ENUM

> `readonly` `static` **CURRENCY\_ENUM**: `object`

Defined in: [currency/currencyUtil.ts:37](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/currency/currencyUtil.ts#L37)

货币代码到 Locale 的映射枚举
- 键为 ISO 4217 货币代码，值为 BCP 47 语言标签
- 用于 `Intl.NumberFormat` 的本地化数字格式化
- 格式示例基于 `Intl.NumberFormat` 对 `1,234,567.89` 的输出

#### AED

> `readonly` **AED**: `"ar-AE"` = `"ar-AE"`

阿联酋迪拉姆（阿联酋，Locale: 阿拉伯语+阿联酋） → 1,234,567.89

#### ARS

> `readonly` **ARS**: `"es-AR"` = `"es-AR"`

阿根廷比索（阿根廷，Locale: 阿根廷西班牙语） → 1.234.567,89

#### AUD

> `readonly` **AUD**: `"en-AU"` = `"en-AU"`

澳大利亚元（澳大利亚，Locale: 澳大利亚英语） → 1,234,567.89

#### BRL

> `readonly` **BRL**: `"pt-BR"` = `"pt-BR"`

巴西雷亚尔（巴西，Locale: 巴西葡萄牙语） → 1.234.567,89

#### CAD

> `readonly` **CAD**: `"en-CA"` = `"en-CA"`

加拿大元（加拿大，Locale: 加拿大英语） → 1,234,567.89

#### CHF

> `readonly` **CHF**: `"de-CH"` = `"de-CH"`

瑞士法郎（瑞士，Locale: 德语+瑞士） → 1'234'567.89

#### CLP

> `readonly` **CLP**: `"es-CL"` = `"es-CL"`

智利比索（智利，Locale: 智利西班牙语） → 1.234.567,89

#### CNY

> `readonly` **CNY**: `"zh-CN"` = `"zh-CN"`

人民币（中国，Locale: 简体中文） → 1,234,567.89

#### COP

> `readonly` **COP**: `"es-CO"` = `"es-CO"`

哥伦比亚比索（哥伦比亚，Locale: 哥伦比亚西班牙语） → 1.234.567,89

#### CRC

> `readonly` **CRC**: `"es-CR"` = `"es-CR"`

哥斯达黎加科朗（哥斯达黎加，Locale: 哥斯达黎加西班牙语） → 1 234 567,89（空格千分位）

#### CZK

> `readonly` **CZK**: `"cs-CZ"` = `"cs-CZ"`

捷克克朗（捷克，Locale: 捷克语） → 1 234 567,89（空格千分位）

#### DKK

> `readonly` **DKK**: `"da-DK"` = `"da-DK"`

丹麦克朗（丹麦，Locale: 丹麦语） → 1.234.567,89

#### EGP

> `readonly` **EGP**: `"ar-EG"` = `"ar-EG"`

埃及镑（埃及，Locale: 阿拉伯语+埃及） → ١٬٢٣٤٬٥٦٧٫٨٩（阿拉伯数字）

#### EUR

> `readonly` **EUR**: `"de-DE"` = `"de-DE"`

欧元（德国，Locale: 德语+德国，代表欧元区） → 1.234.567,89

#### GBP

> `readonly` **GBP**: `"en-GB"` = `"en-GB"`

英镑（英国，Locale: 英式英语） → 1,234,567.89

#### HKD

> `readonly` **HKD**: `"zh-HK"` = `"zh-HK"`

港元（中国香港，Locale: 繁体中文+香港） → 1,234,567.89

#### HUF

> `readonly` **HUF**: `"hu-HU"` = `"hu-HU"`

匈牙利福林（匈牙利，Locale: 匈牙利语） → 1 234 567,89（空格千分位）

#### IDR

> `readonly` **IDR**: `"id-ID"` = `"id-ID"`

印尼盾（印尼，Locale: 印尼语） → 1.234.567,89

#### ILS

> `readonly` **ILS**: `"he-IL"` = `"he-IL"`

以色列新谢克尔（以色列，Locale: 希伯来语） → 1,234,567.89

#### INR

> `readonly` **INR**: `"en-IN"` = `"en-IN"`

印度卢比（印度，Locale: 英语+印度） → 12,34,567.89（2,2,3 分组）

#### JPY

> `readonly` **JPY**: `"ja-JP"` = `"ja-JP"`

日元（日本，Locale: 日语） → 1,234,567.89

#### KRW

> `readonly` **KRW**: `"ko-KR"` = `"ko-KR"`

韩元（韩国，Locale: 韩语） → 1,234,567.89

#### KWD

> `readonly` **KWD**: `"ar-KW"` = `"ar-KW"`

科威特第纳尔（科威特，Locale: 阿拉伯语+科威特） → ١٬٢٣٤٬٥٦٧٫٨٩（阿拉伯数字）

#### MAD

> `readonly` **MAD**: `"ar-MA"` = `"ar-MA"`

摩洛哥迪拉姆（摩洛哥，Locale: 阿拉伯语+摩洛哥） → 1.234.567,89

#### MOP

> `readonly` **MOP**: `"zh-MO"` = `"zh-MO"`

澳门元（中国澳门，Locale: 繁体中文+澳门） → 1,234,567.89

#### MXN

> `readonly` **MXN**: `"es-MX"` = `"es-MX"`

墨西哥比索（墨西哥，Locale: 墨西哥西班牙语） → 1,234,567.89

#### MYR

> `readonly` **MYR**: `"ms-MY"` = `"ms-MY"`

马来西亚林吉特（马来西亚，Locale: 马来语） → 1,234,567.89

#### NGN

> `readonly` **NGN**: `"en-NG"` = `"en-NG"`

尼日利亚奈拉（尼日利亚，Locale: 英语+尼日利亚） → 1,234,567.89

#### NOK

> `readonly` **NOK**: `"no-NO"` = `"no-NO"`

挪威克朗（挪威，Locale: 挪威语） → 1 234 567,89（空格千分位）

#### NZD

> `readonly` **NZD**: `"en-NZ"` = `"en-NZ"`

新西兰元（新西兰，Locale: 新西兰英语） → 1,234,567.89

#### PEN

> `readonly` **PEN**: `"es-PE"` = `"es-PE"`

秘鲁新索尔（秘鲁，Locale: 秘鲁西班牙语） → 1,234,567.89

#### PHP

> `readonly` **PHP**: `"en-PH"` = `"en-PH"`

菲律宾比索（菲律宾，Locale: 英语+菲律宾） → 1,234,567.89

#### PKR

> `readonly` **PKR**: `"en-PK"` = `"en-PK"`

巴基斯坦卢比（巴基斯坦，Locale: 英语+巴基斯坦） → 1,234,567.89

#### PLN

> `readonly` **PLN**: `"pl-PL"` = `"pl-PL"`

波兰兹罗提（波兰，Locale: 波兰语） → 1 234 567,89（空格千分位）

#### QAR

> `readonly` **QAR**: `"ar-QA"` = `"ar-QA"`

卡塔尔里亚尔（卡塔尔，Locale: 阿拉伯语+卡塔尔） → ١٬٢٣٤٬٥٦٧٫٨٩（阿拉伯数字）

#### RON

> `readonly` **RON**: `"ro-RO"` = `"ro-RO"`

罗马尼亚列伊（罗马尼亚，Locale: 罗马尼亚语） → 1.234.567,89

#### RUB

> `readonly` **RUB**: `"ru-RU"` = `"ru-RU"`

俄罗斯卢布（俄罗斯，Locale: 俄语） → 1 234 567,89（空格千分位）

#### SAR

> `readonly` **SAR**: `"ar-SA"` = `"ar-SA"`

沙特里亚尔（沙特，Locale: 阿拉伯语+沙特） → ١٬٢٣٤٬٥٦٧٫٨٩（阿拉伯数字）

#### SEK

> `readonly` **SEK**: `"sv-SE"` = `"sv-SE"`

瑞典克朗（瑞典，Locale: 瑞典语） → 1 234 567,89（空格千分位）

#### SGD

> `readonly` **SGD**: `"en-SG"` = `"en-SG"`

新加坡元（新加坡，Locale: 英语+新加坡） → 1,234,567.89

#### THB

> `readonly` **THB**: `"th-TH"` = `"th-TH"`

泰铢（泰国，Locale: 泰语） → 1,234,567.89

#### TRY

> `readonly` **TRY**: `"tr-TR"` = `"tr-TR"`

土耳其里拉（土耳其，Locale: 土耳其语） → 1.234.567,89

#### TWD

> `readonly` **TWD**: `"zh-TW"` = `"zh-TW"`

新台币（中国台湾地区，Locale: 繁体中文+台湾） → 1,234,567.89

#### UAH

> `readonly` **UAH**: `"uk-UA"` = `"uk-UA"`

乌克兰格里夫纳（乌克兰，Locale: 乌克兰语） → 1 234 567,89（空格千分位）

#### USD

> `readonly` **USD**: `"en-US"` = `"en-US"`

美元（美国及美元化国家，Locale: 美式英语） → 1,234,567.89

#### VND

> `readonly` **VND**: `"vi-VN"` = `"vi-VN"`

越南盾（越南，Locale: 越南语） → 1.234.567,89

#### XPF

> `readonly` **XPF**: `"fr-PF"` = `"fr-PF"`

太平洋法郎（法属波利尼西亚，Locale: 法语+太平洋） → 1[U+202F]234[U+202F]567,89（窄空格千分位）

#### ZAR

> `readonly` **ZAR**: `"en-ZA"` = `"en-ZA"`

南非兰特（南非，Locale: 英语+南非） → 1 234 567,89（空格千分位）

#### Example

```ts
import { CurrencyUtil } from "@pawover/kit/utils";
// 获取人民币的格式化 locale
const locale = CurrencyUtil.CURRENCY_ENUM.CNY; // "zh-CN"

// 结合 Intl.NumberFormat 使用
new Intl.NumberFormat(CurrencyUtil.CURRENCY_ENUM.USD, {
  style: "currency",
  currency: "USD",
}).format(1234.56); // "$1,234.56"
```

## Methods

### currencyFormatter()

#### Call Signature

> `static` **currencyFormatter**(`value`, `options`): `string` \| `null`

Defined in: [currency/currencyUtil.ts:194](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/currency/currencyUtil.ts#L194)

货币格式化
- 使用 `Intl.NumberFormat` 进行本地化数字格式化
- 支持自定义货币符号及位置（首/尾）
- 自动剥离 Intl 注入的不可见 Bidi 控制字符（RTL locale）
- 当值为 `null` 或 `undefined` 时返回 `null`

##### Parameters

###### value

`string` \| `number`

待格式化的数值

###### options

[`FormatterOptions`](../interfaces/FormatterOptions.md)

格式化选项

##### Returns

`string` \| `null`

格式化后的货币字符串，无效输入返回 `null`

##### Example

```ts
import { CurrencyUtil } from "@pawover/kit/utils";

// 重载 1: 有效数值
// 变体 A: 自定义符号
CurrencyUtil.currencyFormatter(1234.56, {
  locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
  currencySign: "¥",
  currencySignPosition: "start",
  currencyFormatOptions: { style: "currency", currency: "CNY" },
}); // "¥ 1,234.56"

// 变体 B: currencySign 为 null → 纯数字
CurrencyUtil.currencyFormatter(1234.56, {
  locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
  currencySign: null,
  currencySignPosition: "start",
  currencyFormatOptions: { style: "currency", currency: "CNY" },
}); // "1,234.56"

// 变体 C: currencySign 省略或为 undefined → 保留 Intl 原生符号
CurrencyUtil.currencyFormatter(1234.56, {
  locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
  currencyFormatOptions: { style: "currency", currency: "CNY" },
}); // "¥ 1,234.56"

// 重载 2: null / undefined
CurrencyUtil.currencyFormatter(null, options); // null
CurrencyUtil.currencyFormatter(undefined, options); // null
```

#### Call Signature

> `static` **currencyFormatter**(`value`, `options`): `string` \| `null`

Defined in: [currency/currencyUtil.ts:195](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/currency/currencyUtil.ts#L195)

货币格式化
- 使用 `Intl.NumberFormat` 进行本地化数字格式化
- 支持自定义货币符号及位置（首/尾）
- 自动剥离 Intl 注入的不可见 Bidi 控制字符（RTL locale）
- 当值为 `null` 或 `undefined` 时返回 `null`

##### Parameters

###### value

`string` \| `number` \| `null` \| `undefined`

待格式化的数值

###### options

[`FormatterOptions`](../interfaces/FormatterOptions.md)

格式化选项

##### Returns

`string` \| `null`

格式化后的货币字符串，无效输入返回 `null`

##### Example

```ts
import { CurrencyUtil } from "@pawover/kit/utils";

// 重载 1: 有效数值
// 变体 A: 自定义符号
CurrencyUtil.currencyFormatter(1234.56, {
  locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
  currencySign: "¥",
  currencySignPosition: "start",
  currencyFormatOptions: { style: "currency", currency: "CNY" },
}); // "¥ 1,234.56"

// 变体 B: currencySign 为 null → 纯数字
CurrencyUtil.currencyFormatter(1234.56, {
  locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
  currencySign: null,
  currencySignPosition: "start",
  currencyFormatOptions: { style: "currency", currency: "CNY" },
}); // "1,234.56"

// 变体 C: currencySign 省略或为 undefined → 保留 Intl 原生符号
CurrencyUtil.currencyFormatter(1234.56, {
  locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
  currencyFormatOptions: { style: "currency", currency: "CNY" },
}); // "¥ 1,234.56"

// 重载 2: null / undefined
CurrencyUtil.currencyFormatter(null, options); // null
CurrencyUtil.currencyFormatter(undefined, options); // null
```

***

### toRealValue()

#### Call Signature

> `static` **toRealValue**\<`T`\>(`mathJsInstance`, `value`, `precision?`, `stringMode?`): `ToRealValueResult`\<`T`, `string`\>

Defined in: [currency/currencyUtil.ts:269](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/currency/currencyUtil.ts#L269)

将任意数值转换为精确的十进制值
- 基于 `mathjs` 的 `bignumber` 处理，避免浮点数精度问题
- 当值为 `null` 或 `undefined` 时返回 `null`

##### Type Parameters

###### T

`T` *extends* `string` \| `number` \| `null` \| `undefined`

##### Parameters

###### mathJsInstance

`MathJsInstance`

`mathjs` 实例

###### value

`T`

待转换的数值

###### precision?

`number`

小数精度位数

###### stringMode?

`true`

是否返回字符串类型，默认 `true`

##### Returns

`ToRealValueResult`\<`T`, `string`\>

精确的十进制值，无效输入返回 `null`

##### Example

```ts
import { create, all } from "mathjs";
import { CurrencyUtil } from "@pawover/kit/utils";

const math = create(all);

// 重载 1: stringMode 省略 / undefined / true → string
CurrencyUtil.toRealValue(math, "0.1"); // "0.1"
CurrencyUtil.toRealValue(math, 0.1 + 0.2, 2); // "0.30"
CurrencyUtil.toRealValue(math, "0.1", undefined, true); // "0.1"

// 重载 2: stringMode = false → number
CurrencyUtil.toRealValue(math, "0.1", undefined, false); // 0.1

// 重载 3: stringMode 为 boolean（未收窄）→ number | string
const getMode = (): boolean => false;
CurrencyUtil.toRealValue(math, "0.1", undefined, getMode()); // 0.1 | "0.1"

// 变体: null / undefined 与可空联合值 → 返回追加 null
CurrencyUtil.toRealValue(math, null); // null
CurrencyUtil.toRealValue(math, undefined); // null
CurrencyUtil.toRealValue(math, null, 2, false); // null
const value: string | number | null = null;
CurrencyUtil.toRealValue(math, value, 2, getMode()); // null | 0.1 | "0.1"
```

#### Call Signature

> `static` **toRealValue**\<`T`\>(`mathJsInstance`, `value`, `precision`, `stringMode`): `ToRealValueResult`\<`T`, `number`\>

Defined in: [currency/currencyUtil.ts:270](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/currency/currencyUtil.ts#L270)

将任意数值转换为精确的十进制值
- 基于 `mathjs` 的 `bignumber` 处理，避免浮点数精度问题
- 当值为 `null` 或 `undefined` 时返回 `null`

##### Type Parameters

###### T

`T` *extends* `string` \| `number` \| `null` \| `undefined`

##### Parameters

###### mathJsInstance

`MathJsInstance`

`mathjs` 实例

###### value

`T`

待转换的数值

###### precision

`number` \| `undefined`

小数精度位数

###### stringMode

`false`

是否返回字符串类型，默认 `true`

##### Returns

`ToRealValueResult`\<`T`, `number`\>

精确的十进制值，无效输入返回 `null`

##### Example

```ts
import { create, all } from "mathjs";
import { CurrencyUtil } from "@pawover/kit/utils";

const math = create(all);

// 重载 1: stringMode 省略 / undefined / true → string
CurrencyUtil.toRealValue(math, "0.1"); // "0.1"
CurrencyUtil.toRealValue(math, 0.1 + 0.2, 2); // "0.30"
CurrencyUtil.toRealValue(math, "0.1", undefined, true); // "0.1"

// 重载 2: stringMode = false → number
CurrencyUtil.toRealValue(math, "0.1", undefined, false); // 0.1

// 重载 3: stringMode 为 boolean（未收窄）→ number | string
const getMode = (): boolean => false;
CurrencyUtil.toRealValue(math, "0.1", undefined, getMode()); // 0.1 | "0.1"

// 变体: null / undefined 与可空联合值 → 返回追加 null
CurrencyUtil.toRealValue(math, null); // null
CurrencyUtil.toRealValue(math, undefined); // null
CurrencyUtil.toRealValue(math, null, 2, false); // null
const value: string | number | null = null;
CurrencyUtil.toRealValue(math, value, 2, getMode()); // null | 0.1 | "0.1"
```

#### Call Signature

> `static` **toRealValue**\<`T`\>(`mathJsInstance`, `value`, `precision`, `stringMode`): `ToRealValueResult`\<`T`, `string` \| `number`\>

Defined in: [currency/currencyUtil.ts:271](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/currency/currencyUtil.ts#L271)

将任意数值转换为精确的十进制值
- 基于 `mathjs` 的 `bignumber` 处理，避免浮点数精度问题
- 当值为 `null` 或 `undefined` 时返回 `null`

##### Type Parameters

###### T

`T` *extends* `string` \| `number` \| `null` \| `undefined`

##### Parameters

###### mathJsInstance

`MathJsInstance`

`mathjs` 实例

###### value

`T`

待转换的数值

###### precision

`number` \| `undefined`

小数精度位数

###### stringMode

`boolean` \| `undefined`

是否返回字符串类型，默认 `true`

##### Returns

`ToRealValueResult`\<`T`, `string` \| `number`\>

精确的十进制值，无效输入返回 `null`

##### Example

```ts
import { create, all } from "mathjs";
import { CurrencyUtil } from "@pawover/kit/utils";

const math = create(all);

// 重载 1: stringMode 省略 / undefined / true → string
CurrencyUtil.toRealValue(math, "0.1"); // "0.1"
CurrencyUtil.toRealValue(math, 0.1 + 0.2, 2); // "0.30"
CurrencyUtil.toRealValue(math, "0.1", undefined, true); // "0.1"

// 重载 2: stringMode = false → number
CurrencyUtil.toRealValue(math, "0.1", undefined, false); // 0.1

// 重载 3: stringMode 为 boolean（未收窄）→ number | string
const getMode = (): boolean => false;
CurrencyUtil.toRealValue(math, "0.1", undefined, getMode()); // 0.1 | "0.1"

// 变体: null / undefined 与可空联合值 → 返回追加 null
CurrencyUtil.toRealValue(math, null); // null
CurrencyUtil.toRealValue(math, undefined); // null
CurrencyUtil.toRealValue(math, null, 2, false); // null
const value: string | number | null = null;
CurrencyUtil.toRealValue(math, value, 2, getMode()); // null | 0.1 | "0.1"
```
