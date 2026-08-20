# ADR-0003: 类型测试采用全反向断言（@ts-expect-error）

`test/types/**` 的类型断言**禁止正向写法**（`const x: T = api(...)`），所有断言必须为 `@ts-expect-error` 反向断言——将 API 结果赋给**错误的目标类型**（比正确类型更窄或字面量不同，如 `const bad: number = CurrencyUtil.toRealValue(math, "0.1")`，正确返回应为 `string`）。

选择反向断言而非正向断言：正向断言在 API 一旦放宽为 `any` / 超类型时会静默通过，测试失去意义；反向断言则双向兜底——API 放宽为 `any` / 超类型时赋值不再报错，触发「Unused '@ts-expect-error' directive」错误；API 收窄为目标类型时赋值报错消失，同样触发 Unused 错误。两类退化都让 IDE 直接提示，测试无法「假装通过」。备选方案「正向断言」因此被否。

Status: accepted