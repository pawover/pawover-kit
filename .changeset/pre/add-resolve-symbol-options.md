---
"@pawover/kit-utils": minor
---

**破坏性变更（按 minor 发布）**：`CurrencyUtil.resolveSymbol` 移除位置参数 `locale`，只接受对象选项 `{ locale }`，调用方需从 `resolveSymbol(currency, "en-US")` 改为 `resolveSymbol(currency, { locale: "en-US" })`；旧的位置参数（`string` / `string[]` / `Intl.Locale`）在运行期抛错。符号解析行为与 `moneyFormat` 的符号推导不变，`moneyFormat` 的 `locale` 仍只影响数字分组与小数位。
