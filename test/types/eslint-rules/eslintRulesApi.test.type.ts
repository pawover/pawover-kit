import eslintRules from "@pawover/kit/eslint-rules";
import type { RuleConfig, Severity, SeverityLevel, SeverityName } from "@pawover/kit/eslint-rules";

// Severity accepts both numeric and name forms
const severityNumber: Severity = 0;
const severityWarn: Severity = 1;
const severityError: Severity = 2;
const severityName: Severity = "off";
const severityWarnName: Severity = "warn";
const severityErrorName: Severity = "error";
const level: SeverityLevel = 2;
const name: SeverityName = "error";

// RuleConfig accepts severity or tuple with rule options
const ruleSeverity: RuleConfig = "error";
const ruleTuple: RuleConfig<[boolean]> = [2, true];

// Default export exposes rule groups, GLOB_EXCLUDE and createRules
const jsRules: Record<string, RuleConfig> = eslintRules.javascript;
const tsRules: Record<string, RuleConfig> = eslintRules.typescript;
const excludes: string[] = eslintRules.GLOB_EXCLUDE;
const created: Record<string, RuleConfig> = eslintRules.createRules("react", "react-hooks");

// @ts-expect-error — 3 is not a valid severity
const badSeverity: Severity = 3;

// @ts-expect-error — "strict" is not a valid severity name
const badSeverityName: Severity = "strict";

// @ts-expect-error — second element must be boolean
const badRuleTuple: RuleConfig<[boolean]> = [2, "x"];

// @ts-expect-error — "unknown" is not a rule group
eslintRules.createRules("unknown");
