import type { Linter } from "eslint";
import type { RuleMap } from "./config.ts";
import { plugins } from "./plugins.ts";

/**
 * React Compiler 规则预设
 *
 * - `"recommended"`：eslint-plugin-react-hooks 官方稳定预设
 * - `"latest"`：官方实验预设，额外包含 `react-hooks/void-use-memo`
 *
 * @example
 * ```ts
 * const preset: ReactCompilerPreset = "latest";
 * ```
 */
export type ReactCompilerPreset = "recommended" | "latest";

/**
 * `react-hooks` 与 `@eslint-react` 共享的 Compiler 规则映射
 *
 * 键为 `eslint-plugin-react-hooks` 的规则名，值为 `@eslint-react` 的等价规则名；
 * 切换时关闭后者、启用前者，避免同一问题重复报告。
 */
const REACT_COMPILER_RULE_MAP = {
  "error-boundaries": "error-boundaries",
  "globals": "globals",
  "immutability": "immutability",
  "purity": "purity",
  "refs": "refs",
  "set-state-in-effect": "set-state-in-effect",
  "set-state-in-render": "set-state-in-render",
  "static-components": "static-components",
  "unsupported-syntax": "unsupported-syntax",
  "use-memo": "use-memo",
} as const;

/** `react-hooks` 核心规则：不属于 React Compiler 检查，不参与切换。 */
const REACT_HOOKS_CORE_RULES = ["rules-of-hooks", "exhaustive-deps"] as const;

/**
 * React Compiler 开启时需要额外关闭的 `@eslint-react` 规则
 *
 * React Compiler 会自动记忆化 Context value，`no-unstable-context-value` 的告警不再适用。
 */
const REACT_COMPILER_DISABLED_REACT_RULES = ["no-unstable-context-value"] as const;

/** 仅官方 `recommended-latest` 预设包含的实验性 Compiler 规则。 */
const REACT_COMPILER_LATEST_ONLY_RULES = ["void-use-memo"] as const;

/** 官方 flat config 预设名。 */
const REACT_HOOKS_FLAT_CONFIG_NAMES: Record<ReactCompilerPreset, string> = {
  recommended: "recommended",
  latest: "recommended-latest",
};

/** 将官方严重级别归一化为 preset 使用的数字形式。 */
function normalizeRuleLevel (level: Linter.RuleEntry): Linter.RuleEntry {
  if (level === "error") {
    return 2;
  }
  if (level === "warn") {
    return 1;
  }
  if (level === "off") {
    return 0;
  }

  return level;
}

/** 读取官方 `eslint-plugin-react-hooks` 预设的规则表。 */
function getReactHooksPresetRules (preset: ReactCompilerPreset): RuleMap {
  const configs = (plugins.reactHooks as unknown as {
    configs: { flat: Record<string, { rules?: RuleMap }> };
  }).configs.flat;
  const configName = REACT_HOOKS_FLAT_CONFIG_NAMES[preset];
  const rules = configs[configName]?.rules;

  if (!rules) {
    throw new Error(`[pawover] 无法读取 eslint-plugin-react-hooks 的 "${configName}" 预设规则。`);
  }

  return rules;
}

/**
 * 生成 React Compiler 切换规则
 *
 * 返回 `off`（需关闭的 `@eslint-react` 等价规则）与 `on`（需开启的 `react-hooks` 规则）：
 * 严重级别直接取官方预设，避免与上游版本漂移。
 */
function getReactCompilerRuleMap (preset: ReactCompilerPreset): { off: RuleMap; on: RuleMap } {
  const presetRules = getReactHooksPresetRules(preset);
  const off: RuleMap = {};
  const on: RuleMap = {};

  for (const [hooksRule, eslintReactRule] of Object.entries(REACT_COMPILER_RULE_MAP)) {
    const ruleId = `react-hooks/${hooksRule}`;
    const level = presetRules[ruleId];

    if (level === undefined) {
      throw new Error(`[pawover] eslint-plugin-react-hooks 的 "${preset}" 预设缺少规则 ${ruleId}。`);
    }

    off[`react/${eslintReactRule}`] = 0;
    on[ruleId] = normalizeRuleLevel(level);
  }

  for (const rule of REACT_COMPILER_DISABLED_REACT_RULES) {
    off[`react/${rule}`] = 0;
  }

  if (preset === "latest") {
    for (const rule of REACT_COMPILER_LATEST_ONLY_RULES) {
      const ruleId = `react-hooks/${rule}`;
      const level = presetRules[ruleId];

      if (level === undefined) {
        throw new Error(`[pawover] eslint-plugin-react-hooks 的 "latest" 预设缺少规则 ${ruleId}。`);
      }

      on[ruleId] = normalizeRuleLevel(level);
    }
  }

  return { off, on };
}

/** 关闭全部 10 条重叠规则（`compiler: false` 回退到 `@eslint-react` 时使用）。 */
function getReactCompilerDisabledRuleMap (): RuleMap {
  return Object.fromEntries(
    Object.keys(REACT_COMPILER_RULE_MAP).map((rule) => [`react-hooks/${rule}`, 0] as const),
  );
}

export {
  getReactCompilerDisabledRuleMap,
  getReactCompilerRuleMap,
  getReactHooksPresetRules,
  normalizeRuleLevel,
  REACT_COMPILER_DISABLED_REACT_RULES,
  REACT_COMPILER_LATEST_ONLY_RULES,
  REACT_COMPILER_RULE_MAP,
  REACT_HOOKS_CORE_RULES,
};
