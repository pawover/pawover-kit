import eslintReact from "@eslint-react/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import antfu from "eslint-plugin-antfu";
import importLite from "eslint-plugin-import-lite";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import vue from "eslint-plugin-vue";
import vueEslintParser from "vue-eslint-parser";
import typescriptEslint from "typescript-eslint";
import type { ESLint, Linter } from "eslint";

/**
 * 内嵌插件注册表
 *
 * 集中导入全部上游 ESLint 插件（作为本包 `dependencies` 精确锁定）并转换为 ESLint flat config 兼容形态，
 * 供 `src/config.ts` 装配规则组时注册。各键与规则映射中的命名空间前缀一一对应。
 */
const plugins = {
  /** @eslint-react 插件（注册名 `react`） */
  react: eslintReact as unknown as ESLint.Plugin,
  /** eslint-plugin-react-hooks 插件（注册名 `react-hooks`） */
  reactHooks: reactHooks as unknown as ESLint.Plugin,
  /** eslint-plugin-vue 插件（注册名 `vue`） */
  vue: vue as unknown as ESLint.Plugin,
  /** @stylistic 插件（注册名 `stylistic`） */
  stylistic: stylistic as unknown as ESLint.Plugin,
  /** eslint-plugin-antfu 插件（注册名 `antfu`） */
  antfu: antfu as unknown as ESLint.Plugin,
  /** eslint-plugin-import-lite 插件（注册名 `imports`） */
  imports: importLite.configs.all.plugins?.["import-lite"] as unknown as ESLint.Plugin,
  /** eslint-plugin-simple-import-sort 插件（注册名 `importsSort`） */
  importsSort: simpleImportSort as unknown as ESLint.Plugin,
  /** typescript-eslint 插件（注册名 `ts`） */
  typescript: typescriptEslint.plugin as unknown as ESLint.Plugin,
  /** typescript-eslint 的 TypeScript parser */
  typescriptParser: typescriptEslint.parser as unknown as Linter.Parser,
  /** vue-eslint-parser（解析 `.vue` 单文件组件） */
  vueParser: vueEslintParser as unknown as Linter.Parser,
};

/** @eslint-react 中依赖类型信息的规则名（不含命名空间前缀） */
const reactTypeCheckedNames = Object.keys(
  (eslintReact.configs["disable-type-checked"] as { rules?: Record<string, unknown> }).rules ?? {},
)
  .filter((ruleId) => ruleId.startsWith("@eslint-react/"))
  .map((ruleId) => ruleId.slice("@eslint-react/".length));

/**
 * @eslint-react 依赖类型信息的规则关闭表（`react/` 前缀 → 0）
 *
 * 自插件 `disable-type-checked` 配置动态派生；react 组未与 `typescript` 同开时，
 * 工厂据此在配置上显式关闭这些规则。
 */
const reactTypeCheckedOff = Object.fromEntries(reactTypeCheckedNames.map((name) => [`react/${name}`, 0] as const));

/**
 * `@eslint-react` 的「无类型信息」版本
 *
 * 与 `plugins.react` 相同，唯将 type-aware 规则替换为保留原 `meta`（含 schema）的 no-op 实现：
 * 未开启 `typescript` 时注册此版本，即使用户后置覆盖强制开启这些规则，
 * 执行也不会报「requires type information」，实现强制关闭。
 */
const reactRules = plugins.react.rules ?? {};
const reactWithoutTypeChecked = {
  ...plugins.react,
  rules: {
    ...reactRules,
    ...Object.fromEntries(
      reactTypeCheckedNames.flatMap((name) => {
        const rule = reactRules[name];

        return rule ? [[name, { ...rule, create: () => ({}) }] as const] : [];
      }),
    ),
  },
} as ESLint.Plugin;

export { plugins, reactTypeCheckedNames, reactTypeCheckedOff, reactWithoutTypeChecked };
