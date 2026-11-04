import type { Linter } from "eslint";
import antfuRules from "./core.antfu.ts";
import importsRules from "./core.imports.ts";
import importsSortRules from "./core.importsSort.ts";
import javascriptRules from "./core.javascript.ts";
import reactRules from "./core.react.ts";
import reactHooksRules from "./core.reactHooks.ts";
import stylisticRules from "./core.stylistic.ts";
import typescriptRules from "./core.typescript.ts";
import vueRules from "./core.vue.ts";
import { GLOB_EXCLUDE } from "./globExclude.ts";
import { plugins, reactTypeCheckedNames, reactTypeCheckedOff, reactWithoutTypeChecked } from "./plugins.ts";

/** flat config 规则表类型（规则映射统一转换的目标类型） */
type RulesRecord = NonNullable<Linter.Config["rules"]>;

const javascript = javascriptRules as unknown as RulesRecord;
const typescript = typescriptRules as unknown as RulesRecord;
const stylistic = stylisticRules as unknown as RulesRecord;
const antfu = antfuRules as unknown as RulesRecord;
const imports = importsRules as unknown as RulesRecord;
const importsSort = importsSortRules as unknown as RulesRecord;
const react = reactRules as unknown as RulesRecord;
const reactHooks = reactHooksRules as unknown as RulesRecord;
const vue = vueRules as unknown as RulesRecord;

/** react 映射中依赖类型信息的规则 id（`react/` 前缀） */
const reactTypeCheckedRuleIds = new Set(reactTypeCheckedNames.map((name) => `react/${name}`));
/** react 映射中的 type-aware 规则子集（仅在 ts/tsx 层启用） */
const reactTypeCheckedRules = Object.fromEntries(
  [...reactTypeCheckedRuleIds].flatMap((ruleId) => {
    const rule = react[ruleId];

    return rule === undefined ? [] : [[ruleId, rule] as const];
  }),
);
/** react 映射中剔除 type-aware 规则后的基础规则表（作用于全部源文件） */
const reactBase = Object.fromEntries(
  Object.entries(react).filter(([ruleId]) => !reactTypeCheckedRuleIds.has(ruleId)),
);

/** 全部源文件（js / cjs / mjs / jsx / ts / tsx） */
const GLOB_SOURCE = ["**/*.{js,cjs,mjs,jsx,ts,tsx}"];
/** TypeScript 源文件（ts / tsx） */
const GLOB_TYPESCRIPT = ["**/*.{ts,tsx}"];
/** Vue 单文件组件 */
const GLOB_VUE = "**/*.vue";
/** JSX 组件文件（react type-aware 规则的检查对象；类型可用性由项目 tsconfig 的 include/allowJs 决定） */
const GLOB_JSX = "**/*.jsx";

/**
 * 预设工厂选项
 *
 * 除 `javascript` 规则组常开外，其余规则组均通过对应布尔字段显式开启；`typescript` 开启时自动接入 TypeScript parser 与 type-aware 解析。
 *
 * @example
 * ```ts
 * const options: PawoverOptions = {
 *   typescript: true,
 *   react: true,
 *   parserOptions: { tsconfigRootDir: import.meta.dirname },
 * };
 * ```
 */
export interface PawoverOptions {
  /** 启用 `typescript` 规则组（ts / tsx 文件；同时注册 TypeScript parser，默认启用 type-aware 解析） */
  typescript?: boolean;
  /** 启用 `stylistic` 规则组 */
  stylistic?: boolean;
  /** 启用 `antfu` 规则组 */
  antfu?: boolean;
  /** 启用 `imports` 规则组（eslint-plugin-import-lite） */
  imports?: boolean;
  /** 启用 `importsSort` 规则组（eslint-plugin-simple-import-sort） */
  importsSort?: boolean;
  /** 启用 `react` 规则组（注册 `@eslint-react` 与 `eslint-plugin-react-hooks` 两个插件）；与 `typescript` 同开时，依赖类型信息的规则作用于 ts/tsx/jsx（jsx 的类型可用性由项目 tsconfig 的 include/allowJs 决定，不在项目内会报错）；未开启 `typescript` 时自动关闭这些规则并注册为无操作实现（后置覆盖也无法强制开启） */
  react?: boolean;
  /** 启用 `vue` 规则组（vue / vue+ts 单文件组件；同时接入 vue-eslint-parser） */
  vue?: boolean;
  /** 透传给 TypeScript parser 的解析选项；与默认值浅合并，同名键以本参数为准（默认 `{ projectService: true }`） */
  parserOptions?: Record<string, unknown>;
}

/**
 * 创建 ESLint flat config 预设
 *
 * 返回可直接用于 `eslint.config.js` 的 flat config 数组：首项为全局忽略（`GLOB_EXCLUDE`），随后为常开的 `javascript` 基础层与按选项启用的各规则组层。
 * 全部上游插件已作为本包依赖精确锁定并自动注册，无需用户另行安装或注册插件。
 *
 * @param options 预设选项；缺省时仅返回忽略层与 `javascript` 基础层
 * @returns flat config 配置数组
 *
 * @example
 * ```ts
 * // TypeScript + React 项目
 * import pawover from "@pawover/kit-eslint-rules";
 *
 * export default pawover({
 *   typescript: true,
 *   react: true,
 *   parserOptions: { tsconfigRootDir: import.meta.dirname },
 * });
 * ```
 *
 * @example
 * ```ts
 * // Vue 项目（Vue SFC + TypeScript）
 * import pawover from "@pawover/kit-eslint-rules";
 *
 * export default pawover({ typescript: true, vue: true });
 * ```
 *
 * @example
 * ```ts
 * // 后置覆盖：在预设之后追加自定义配置层
 * import pawover from "@pawover/kit-eslint-rules";
 *
 * export default [
 *   ...pawover({ typescript: true }),
 *   { rules: { "ts/no-explicit-any": 0 } },
 * ];
 * ```
 */
function pawover (options: PawoverOptions = {}): Linter.Config[] {
  const {
    typescript: enableTypescript = false,
    stylistic: enableStylistic = false,
    antfu: enableAntfu = false,
    imports: enableImports = false,
    importsSort: enableImportsSort = false,
    react: enableReact = false,
    vue: enableVue = false,
    parserOptions,
  } = options;

  const sourceFiles = enableVue ? [...GLOB_SOURCE, GLOB_VUE] : [...GLOB_SOURCE];
  const typescriptParserOptions = { projectService: true, ...parserOptions };

  const configs: Linter.Config[] = [
    {
      ignores: [...GLOB_EXCLUDE],
    },
    {
      files: [...sourceFiles],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {
          ecmaFeatures: { jsx: true },
        },
      },
      rules: javascript,
    },
  ];

  if (enableTypescript) {
    const typescriptRuleFiles = enableVue ? [...GLOB_TYPESCRIPT, GLOB_VUE] : [...GLOB_TYPESCRIPT];
    const typescriptParserFiles = enableReact ? [...typescriptRuleFiles, GLOB_JSX] : [...typescriptRuleFiles];

    configs.push({
      files: [...typescriptParserFiles],
      languageOptions: {
        parser: plugins.typescriptParser,
        parserOptions: { ...typescriptParserOptions },
      },
    });

    configs.push({
      files: [...typescriptRuleFiles],
      plugins: { ts: plugins.typescript },
      rules: typescript,
    });
  }

  if (enableStylistic) {
    configs.push({
      files: [...sourceFiles],
      plugins: { stylistic: plugins.stylistic },
      rules: stylistic,
    });
  }

  if (enableAntfu) {
    configs.push({
      files: [...sourceFiles],
      plugins: { antfu: plugins.antfu },
      rules: antfu,
    });
  }

  if (enableImports) {
    configs.push({
      files: [...sourceFiles],
      plugins: { imports: plugins.imports },
      rules: imports,
    });
  }

  if (enableImportsSort) {
    configs.push({
      files: [...sourceFiles],
      plugins: { importsSort: plugins.importsSort },
      rules: importsSort,
    });
  }

  if (enableReact) {
    configs.push({
      files: [...GLOB_SOURCE],
      plugins: {
        "react": enableTypescript ? plugins.react : reactWithoutTypeChecked,
        "react-hooks": plugins.reactHooks,
      },
      rules: enableTypescript
        ? { ...reactBase, ...reactHooks }
        : { ...reactBase, ...reactHooks, ...reactTypeCheckedOff },
    });

    if (enableTypescript) {
      configs.push({
        files: [...GLOB_TYPESCRIPT, GLOB_JSX],
        plugins: { react: plugins.react },
        rules: { ...reactTypeCheckedRules },
      });
    }
  }

  if (enableVue) {
    configs.push({
      files: [GLOB_VUE],
      languageOptions: {
        parser: plugins.vueParser,
        parserOptions: enableTypescript
          ? { parser: plugins.typescriptParser, ...typescriptParserOptions }
          : {},
      },
      plugins: { vue: plugins.vue },
      rules: vue,
    });
  }

  return configs;
}

export default pawover;
