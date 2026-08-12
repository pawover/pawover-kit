import eslintRules from "@pawover/kit/eslint-rules";
import type { RuleConfig, Severity, SeverityLevel, SeverityName } from "@pawover/kit/eslint-rules";

// Severity must keep accepting both numeric and name forms
// @ts-expect-error — Severity must include numeric members (cast would fail) and stay wider than names
const badSeverityNameOnly: "off" | "warn" | "error" = 2 as Severity;

// @ts-expect-error — Severity must include name members (cast would fail) and stay wider than numbers
const badSeverityNumberOnly: 0 | 1 | 2 = "error" as Severity;

// @ts-expect-error — SeverityLevel must stay 0 | 1 | 2, not narrow to 2
const badLevelNarrow: 2 = 2 as SeverityLevel;

// @ts-expect-error — SeverityName must stay "off" | "warn" | "error", not narrow to "error"
const badNameNarrow: "error" = "error" as SeverityName;

// RuleConfig — tuple form must stay legal without collapsing the type
// @ts-expect-error — RuleConfig must not collapse to a [boolean] tuple
const badRuleConfigTuple: [boolean] = [2, true] as RuleConfig;

// @ts-expect-error — 3 is not a valid severity
const badSeverity: Severity = 3;

// @ts-expect-error — "strict" is not a valid severity name
const badSeverityName: Severity = "strict";

// @ts-expect-error — second element must be boolean
const badRuleTuple: RuleConfig<[boolean]> = [2, "x"];

// Default export must keep exposing rule groups, GLOB_EXCLUDE and createRules
// @ts-expect-error — javascript must be Record<string, RuleConfig>, not string[]
const badJsRules: string[] = eslintRules.javascript;

// @ts-expect-error — typescript must be Record<string, RuleConfig>, not string[]
const badTsRules: string[] = eslintRules.typescript;

// @ts-expect-error — GLOB_EXCLUDE must be string[], not number[]
const badExcludes: number[] = eslintRules.GLOB_EXCLUDE;

// @ts-expect-error — createRules must return Record<string, RuleConfig>, not plain string
const badCreated: string = eslintRules.createRules("react", "react-hooks");

// @ts-expect-error — "unknown" is not a rule group
eslintRules.createRules("unknown");
