import pawover from "./config.ts";
import { GLOB_EXCLUDE } from "./globExclude.ts";

export type { PawoverOptions } from "./config.ts";

/**
 * 规则严重级别（数字形式）
 *
 * ESLint 规则严重级别的数字表示：`0` 关闭、`1` 警告、`2` 错误。
 *
 * @example
 * ```ts
 * const level: SeverityLevel = 2; // error
 * ```
 */
export type SeverityLevel = 0 | 1 | 2;

/**
 * 规则严重级别（名称形式）
 *
 * ESLint 规则严重级别的名称表示：`"off"` 关闭、`"warn"` 警告、`"error"` 错误。
 *
 * @example
 * ```ts
 * const name: SeverityName = "error";
 * ```
 */
export type SeverityName = "off" | "warn" | "error";

/**
 * 规则严重级别
 *
 * 数字与名称两种形式均可，等价于 ESLint 原生 `Linter.RuleLevel`。
 *
 * @example
 * ```ts
 * const a: Severity = 1;
 * const b: Severity = "off";
 * ```
 */
export type Severity = SeverityName | SeverityLevel;

/**
 * 规则配置
 *
 * 支持纯严重级别，或 `[严重级别, ...规则选项]` 的元组形式，规则选项按 ESLint 规则声明顺序传入。
 *
 * @template RuleOptions 规则选项参数元组
 *
 * @example
 * ```ts
 * const a: RuleConfig = "error";
 * const b: RuleConfig<[boolean]> = [2, { allowProperties: true }];
 * ```
 */
export type RuleConfig<RuleOptions extends unknown[] = unknown[]> = Severity | [Severity, ...Partial<RuleOptions>];

export default pawover;

export { GLOB_EXCLUDE };
