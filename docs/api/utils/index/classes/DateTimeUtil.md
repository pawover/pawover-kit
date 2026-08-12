[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / DateTimeUtil

# Class: DateTimeUtil

Defined in: [dateTime/dateTimeUtil.ts:4](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L4)

日期工具类

## Constructors

### Constructor

> **new DateTimeUtil**(): `DateTimeUtil`

#### Returns

`DateTimeUtil`

## Properties

### DAY\_PER\_MONTH

> `readonly` `static` **DAY\_PER\_MONTH**: `number` = `30`

Defined in: [dateTime/dateTimeUtil.ts:75](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L75)

每月天数

#### Example

```ts
DateTimeUtil.DAY_PER_MONTH; // 30
```

***

### DAY\_PER\_WEEK

> `readonly` `static` **DAY\_PER\_WEEK**: `number` = `7`

Defined in: [dateTime/dateTimeUtil.ts:66](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L66)

每周天数

#### Example

```ts
DateTimeUtil.DAY_PER_WEEK; // 7
```

***

### DAY\_PER\_YEAR

> `readonly` `static` **DAY\_PER\_YEAR**: `number` = `365`

Defined in: [dateTime/dateTimeUtil.ts:84](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L84)

每年天数

#### Example

```ts
DateTimeUtil.DAY_PER_YEAR; // 365
```

***

### FORMAT

> `readonly` `static` **FORMAT**: `object`

Defined in: [dateTime/dateTimeUtil.ts:122](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L122)

常用时间格式模板集合

#### CN\_DATE

> `readonly` **CN\_DATE**: `"yyyy年MM月dd日"` = `"yyyy年MM月dd日"`

#### CN\_DATE\_TIME

> `readonly` **CN\_DATE\_TIME**: `"yyyy年MM月dd日 HH时mm分ss秒"` = `"yyyy年MM月dd日 HH时mm分ss秒"`

#### CN\_DATE\_WEEKDAY

> `readonly` **CN\_DATE\_WEEKDAY**: `"yyyy年MM月dd日 EEE"` = `"yyyy年MM月dd日 EEE"`

#### CN\_WEEKDAY\_FULL

> `readonly` **CN\_WEEKDAY\_FULL**: `"EEEE"` = `"EEEE"`

#### COMPACT\_DATETIME

> `readonly` **COMPACT\_DATETIME**: `"yyyyMMdd_HHmmss"` = `"yyyyMMdd_HHmmss"`

#### DATE\_WITH\_WEEKDAY\_FULL

> `readonly` **DATE\_WITH\_WEEKDAY\_FULL**: `"yyyy-MM-dd (EEEE)"` = `"yyyy-MM-dd (EEEE)"`

#### DATE\_WITH\_WEEKDAY\_SHORT

> `readonly` **DATE\_WITH\_WEEKDAY\_SHORT**: `"yyyy-MM-dd (EEE)"` = `"yyyy-MM-dd (EEE)"`

#### EU\_DATE

> `readonly` **EU\_DATE**: `"dd/MM/yyyy"` = `"dd/MM/yyyy"`

#### EU\_DATE\_TIME

> `readonly` **EU\_DATE\_TIME**: `"dd/MM/yyyy HH:mm:ss"` = `"dd/MM/yyyy HH:mm:ss"`

#### ISO\_DATE

> `readonly` **ISO\_DATE**: `"yyyy-MM-dd"` = `"yyyy-MM-dd"`

#### ISO\_DATE\_TIME

> `readonly` **ISO\_DATE\_TIME**: `"yyyy-MM-dd HH:mm:ss"` = `"yyyy-MM-dd HH:mm:ss"`

#### ISO\_DATE\_TIME\_MS

> `readonly` **ISO\_DATE\_TIME\_MS**: `"yyyy-MM-dd HH:mm:ss.SSS"` = `"yyyy-MM-dd HH:mm:ss.SSS"`

#### ISO\_DATETIME\_TZ

> `readonly` **ISO\_DATETIME\_TZ**: `"yyyy-MM-dd'T'HH:mm:ssXXX"` = `"yyyy-MM-dd'T'HH:mm:ssXXX"`

#### ISO\_DATETIME\_TZ\_MS

> `readonly` **ISO\_DATETIME\_TZ\_MS**: `"yyyy-MM-dd'T'HH:mm:ss.SSSXXX"` = `"yyyy-MM-dd'T'HH:mm:ss.SSSXXX"`

#### ISO\_TIME

> `readonly` **ISO\_TIME**: `"HH:mm:ss"` = `"HH:mm:ss"`

#### MONTH\_DAY

> `readonly` **MONTH\_DAY**: `"MM-dd"` = `"MM-dd"`

#### MONTH\_DAY\_CN

> `readonly` **MONTH\_DAY\_CN**: `"MM月dd日"` = `"MM月dd日"`

#### READABLE\_DATE

> `readonly` **READABLE\_DATE**: `"MMM dd, yyyy"` = `"MMM dd, yyyy"`

#### READABLE\_DATE\_TIME

> `readonly` **READABLE\_DATE\_TIME**: `"MMM dd, yyyy HH:mm"` = `"MMM dd, yyyy HH:mm"`

#### RFC2822

> `readonly` **RFC2822**: `"EEE, dd MMM yyyy HH:mm:ss xxx"` = `"EEE, dd MMM yyyy HH:mm:ss xxx"`

#### SHORT\_DATE

> `readonly` **SHORT\_DATE**: `"yy-MM-dd"` = `"yy-MM-dd"`

#### SHORT\_DATE\_SLASH

> `readonly` **SHORT\_DATE\_SLASH**: `"yy/MM/dd"` = `"yy/MM/dd"`

#### TIME\_12

> `readonly` **TIME\_12**: `"hh:mm:ss a"` = `"hh:mm:ss a"`

#### TIME\_12\_NO\_SEC

> `readonly` **TIME\_12\_NO\_SEC**: `"hh:mm a"` = `"hh:mm a"`

#### TIME\_24

> `readonly` **TIME\_24**: `"HH:mm:ss"` = `"HH:mm:ss"`

#### TIME\_24\_NO\_SEC

> `readonly` **TIME\_24\_NO\_SEC**: `"HH:mm"` = `"HH:mm"`

#### TIMESTAMP

> `readonly` **TIMESTAMP**: `"yyyyMMddHHmmss"` = `"yyyyMMddHHmmss"`

#### TIMESTAMP\_MS

> `readonly` **TIMESTAMP\_MS**: `"yyyyMMddHHmmssSSS"` = `"yyyyMMddHHmmssSSS"`

#### US\_DATE

> `readonly` **US\_DATE**: `"MM/dd/yyyy"` = `"MM/dd/yyyy"`

#### US\_DATE\_SHORT\_YEAR

> `readonly` **US\_DATE\_SHORT\_YEAR**: `"MM/dd/yy"` = `"MM/dd/yy"`

#### US\_DATE\_TIME

> `readonly` **US\_DATE\_TIME**: `"MM/dd/yyyy HH:mm:ss"` = `"MM/dd/yyyy HH:mm:ss"`

#### Example

```ts
DateTimeUtil.FORMAT.ISO_DATE; // "yyyy-MM-dd"
DateTimeUtil.FORMAT.CN_DATE_TIME; // "yyyy年MM月dd日 HH时mm分ss秒"
```

***

### HOUR\_PER\_DAY

> `readonly` `static` **HOUR\_PER\_DAY**: `number` = `24`

Defined in: [dateTime/dateTimeUtil.ts:48](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L48)

每天小时数

#### Example

```ts
DateTimeUtil.HOUR_PER_DAY; // 24
```

***

### MILLISECONDS\_PER\_SECOND

> `readonly` `static` **MILLISECONDS\_PER\_SECOND**: `number` = `1000`

Defined in: [dateTime/dateTimeUtil.ts:12](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L12)

每秒的毫秒数

#### Example

```ts
DateTimeUtil.MILLISECONDS_PER_SECOND; // 1000
```

***

### MINUTE\_PER\_HOUR

> `readonly` `static` **MINUTE\_PER\_HOUR**: `number` = `60`

Defined in: [dateTime/dateTimeUtil.ts:30](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L30)

每小时的分钟数

#### Example

```ts
DateTimeUtil.MINUTE_PER_HOUR; // 60
```

***

### MONTH\_PER\_YEAR

> `readonly` `static` **MONTH\_PER\_YEAR**: `number` = `12`

Defined in: [dateTime/dateTimeUtil.ts:93](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L93)

每年月数

#### Example

```ts
DateTimeUtil.MONTH_PER_YEAR; // 12
```

***

### SECOND\_PER\_DAY

> `readonly` `static` **SECOND\_PER\_DAY**: `number`

Defined in: [dateTime/dateTimeUtil.ts:57](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L57)

每天秒数

#### Example

```ts
DateTimeUtil.SECOND_PER_DAY; // 86400
```

***

### SECOND\_PER\_HOUR

> `readonly` `static` **SECOND\_PER\_HOUR**: `number`

Defined in: [dateTime/dateTimeUtil.ts:39](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L39)

每小时的秒数

#### Example

```ts
DateTimeUtil.SECOND_PER_HOUR; // 3600
```

***

### SECOND\_PER\_MINUTE

> `readonly` `static` **SECOND\_PER\_MINUTE**: `number` = `60`

Defined in: [dateTime/dateTimeUtil.ts:21](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L21)

每分钟的秒数

#### Example

```ts
DateTimeUtil.SECOND_PER_MINUTE; // 60
```

***

### WEEK\_PER\_MONTH

> `readonly` `static` **WEEK\_PER\_MONTH**: `number` = `4`

Defined in: [dateTime/dateTimeUtil.ts:111](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L111)

每月平均周

#### Example

```ts
DateTimeUtil.WEEK_PER_MONTH; // 4
```

***

### WEEK\_PER\_YEAR

> `readonly` `static` **WEEK\_PER\_YEAR**: `number` = `52`

Defined in: [dateTime/dateTimeUtil.ts:102](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L102)

每年平均周

#### Example

```ts
DateTimeUtil.WEEK_PER_YEAR; // 52
```

## Methods

### getTimeZone()

> `static` **getTimeZone**(): `object`

Defined in: [dateTime/dateTimeUtil.ts:184](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/dateTime/dateTimeUtil.ts#L184)

获取当前时区信息

#### Returns

`object`

时区信息对象 (UTC偏移和时区名称)

##### timeZone

> **timeZone**: `string`

##### UTC

> **UTC**: `string`

#### Example

```ts
DateTimeUtil.getTimeZone(); // { UTC: "UTC+8", timeZone: "Asia/Shanghai" }
```
