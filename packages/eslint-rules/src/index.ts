import antfuRules from "./core.antfu.js";
import importsRules from "./core.imports.js";
import simpleImportSortRules from "./core.importsSort.js";
import javascriptRules from "./core.javascript.js";
import reactRules from "./core.react.js";
import reactHooksRules from "./core.reactHooks.js";
import stylisticRules from "./core.stylistic.js";
import typescriptRules from "./core.typescript.js";
import vueRules from "./core.vue.js";

/**
 * 全局忽略目录列表
 *
 * 在 ESLint 配置中直接忽略的目录与文件 glob 集合，包含依赖、构建产物、锁文件、编辑器目录、缓存等。
 *
 * @example
 * ```ts
 * import eslintRules from "@pawover/kit-eslint-rules";
 *
 * export default [
 *   { ignores: eslintRules.GLOB_EXCLUDE },
 *   // ...其余配置
 * ];
 * ```
 */
const GLOB_EXCLUDE = [
  "**/node_modules",
  "**/dist",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/pnpm-lock.yaml",
  "**/bun.lockb",
  "**/output",
  "**/coverage",
  "**/temp",
  "**/.temp",
  "**/tmp",
  "**/.tmp",
  "**/.history",
  "**/.vitepress/cache",
  "**/.nuxt",
  "**/.next",
  "**/.svelte-kit",
  "**/.vercel",
  "**/.changeset",
  "**/.idea",
  "**/.cache",
  "**/.output",
  "**/.vite-inspect",
  "**/.yarn",
  "**/vite.config.*.timestamp-*",
  "**/CHANGELOG*.md",
  "**/*.min.*",
  "**/LICENSE*",
  "**/__snapshots__",
  "**/auto-import?(s).d.ts",
  "**/auto-component?(s).d.ts",
  "**/auto-router?(s).d.ts",
];

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

const javascript = javascriptRules as unknown as Record<keyof typeof javascriptRules, RuleConfig>;
const typescript = typescriptRules as unknown as Record<keyof typeof typescriptRules, RuleConfig>;
const react = reactRules as unknown as Record<keyof typeof reactRules, RuleConfig>;
const reactHooks = reactHooksRules as unknown as Record<keyof typeof reactHooksRules, RuleConfig>;
const vue = vueRules as unknown as Record<keyof typeof vueRules, RuleConfig>;
const stylistic = stylisticRules as unknown as Record<keyof typeof stylisticRules, RuleConfig>;
const antfu = antfuRules as unknown as Record<keyof typeof antfuRules, RuleConfig>;
const imports = importsRules as unknown as Record<keyof typeof importsRules, RuleConfig>;
const importsSort = simpleImportSortRules as unknown as Record<keyof typeof simpleImportSortRules, RuleConfig>;

const rules = {
  javascript,
  typescript,
  react,
  reactHooks,
  vue,
  stylistic,
  antfu,
  imports,
  importsSort,
};

/**
 * 创建规则集合
 *
 * 从已有规则组中取出全部规则；传入 `prefix` 时会将规则名的命名空间前缀改写为目标前缀（如 `react/*` → `react-hooks/*`）。
 *
 * @param rule 规则组名称（`"javascript"` | `"typescript"` | `"react"` | `"reactHooks"` | `"vue"` | `"stylistic"` | `"antfu"` | `"imports"` | `"importsSort"`）
 * @param prefix 目标命名空间前缀（可选，格式为 `name/`，如 `"react-hooks"`）
 * @returns 规则名到规则配置的映射；规则组不存在时返回空对象
 *
 * @example
 * ```ts
 * // 不传 prefix：返回原规则组
 * const tsRules = createRules("typescript");
 *
 * // 传 prefix：改写命名空间前缀
 * const reactHooksRules = createRules("react", "react-hooks");
 * // { "react-hooks/display-name": 2, ... }
 *
 * // 非法规则组：返回空对象
 * const empty = createRules("unknown");
 * ```
 */
function createRules (rule: keyof typeof rules, prefix?: string) {
  const result: Record<string, RuleConfig<unknown[]>> = {};

  if (typeof rule === "string" && rule in rules) {
    if (prefix) {
      return Object.entries(rules[rule]).reduce((acc, [key, value]) => {
        const oldPrefix = key.split("/")[0]!;
        const newPrefix = prefix.split("/")[0]!;
        const newKey = key.replace(`${oldPrefix}/`, `${newPrefix}/`);
        acc[newKey] = value;

        return acc;
      }, result);
    } else {
      return rules[rule];
    }
  }

  return result;
}

/**
 * 默认导出
 *
 * 聚合全部规则组与工具：`javascript`、`typescript`、`react`、`reactHooks`、`vue`、`stylistic`、`antfu`、`imports`、`importsSort`、`GLOB_EXCLUDE`、`createRules`。
 *
 * @example
 * ```ts
 * import eslintRules from "@pawover/kit-eslint-rules";
 *
 * export default [
 *   { ignores: eslintRules.GLOB_EXCLUDE },
 *   { files: ["*.ts", "*.tsx"], rules: { ...eslintRules.javascript, ...eslintRules.typescript } },
 * ];
 * ```
 */
export default {
  ...rules,
  GLOB_EXCLUDE,
  createRules,
};
