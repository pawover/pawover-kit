import pawover, { GLOB_EXCLUDE } from "@pawover/kit/eslint-rules";
import type { PawoverOptions, RuleConfig, Severity, SeverityLevel, SeverityName } from "@pawover/kit/eslint-rules";
import type { Linter } from "eslint";

// 工厂：合法调用不产生类型错误
pawover();
pawover({ typescript: true, vue: true });
pawover({
  typescript: true,
  stylistic: true,
  antfu: true,
  imports: true,
  importsSort: true,
  react: true,
  parserOptions: { tsconfigRootDir: "/repo" },
});

const options: PawoverOptions = { typescript: true };
pawover(options);

const result: Linter.Config[] = pawover();

// @ts-expect-error — javascript 组常开，不是选项
pawover({ javascript: true });

// @ts-expect-error — 未知选项不受支持
pawover({ unknown: true });

// @ts-expect-error — 开关必须是 boolean，不是字符串
pawover({ typescript: "yes" });

// @ts-expect-error — 开关必须是 boolean，不是数字
pawover({ vue: 1 });

// @ts-expect-error — parserOptions 必须是对象
pawover({ parserOptions: "projectService" });

// @ts-expect-error — 工厂返回 flat config 数组，不是字符串
const badReturn: string = pawover();

// @ts-expect-error — GLOB_EXCLUDE 必须是 string[]，不是 number[]
const badExcludes: number[] = GLOB_EXCLUDE;

// Severity：数字与名称两种形式都必须保留
// @ts-expect-error — Severity 必须包含数字形式（窄化断言会失败）
const badSeverityNameOnly: "off" | "warn" | "error" = 2 as Severity;

// @ts-expect-error — Severity 必须包含名称形式（窄化断言会失败）
const badSeverityNumberOnly: 0 | 1 | 2 = "error" as Severity;

// @ts-expect-error — SeverityLevel 必须保持 0 | 1 | 2，不得窄化为 2
const badLevelNarrow: 2 = 2 as SeverityLevel;

// @ts-expect-error — SeverityName 必须保持 "off" | "warn" | "error"，不得窄化为 "error"
const badNameNarrow: "error" = "error" as SeverityName;

// RuleConfig：元组形式必须保持合法且不得塌缩
// @ts-expect-error — RuleConfig 不得塌缩为 [boolean]
const badRuleConfigTuple: [boolean] = [2, true] as RuleConfig;

// @ts-expect-error — 3 不是合法严重级别
const badSeverity: Severity = 3;

// @ts-expect-error — "strict" 不是合法严重级别名
const badSeverityName: Severity = "strict";

// @ts-expect-error — 元组第二元素必须是 boolean
const badRuleTuple: RuleConfig<[boolean]> = [2, "x"];
