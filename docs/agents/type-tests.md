# 类型测试约定（全反向断言）

`test/types/**` 类型测试的经验与陷阱。参考实现：`test/types/utils/utilsApi.test.type.ts`、`test/types/types/typesApi.test.type.ts`。

## 规则

类型断言**禁止正向写法**（`const x: T = api(...)`）。所有断言必须为 `@ts-expect-error` 反向断言——将 API 结果赋给**错误的目标类型**（比正确类型更窄或字面量不同，如 `const bad: number = CurrencyUtil.toRealValue(math, "0.1")`，正确返回应为 `string`）。

## 为什么（经验）

决策与理由见 ADR-0003（`docs/adr/0003-type-tests-reverse-assertion.md`）：反向断言双向兜底，API 放宽或收窄都会触发「Unused '@ts-expect-error' directive」错误，测试无法「假装通过」。

## 写法要点

- 双向语义靠「cast 合法性 + 赋值报错」组合覆盖：如 `"abc" as IdType` 校验 `IdType` 包含 `string`，再赋给 `number` 校验未收窄。
- 允许保留非断言脚手架：`const math = create(all)`、`interface TreeNode`、供重赋值断言使用的 fixture 声明。

## 已知陷阱

- lib.dom 中 `HTMLDivElement` 与 `HTMLSpanElement` 结构相同（均为空接口 extends HTMLElement）互为可赋值，区分元素类型须用 `HTMLInputElement` 等。
- `(a: number) => void` 可赋给 `(...arg: any[]) => any`（rest-any 不校验元数），反例断言可改用 `null`。