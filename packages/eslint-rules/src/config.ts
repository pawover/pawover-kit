import type { Linter } from "eslint";
import { composer, type FlatConfigComposer } from "eslint-flat-config-utils";
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
import { GLOB_JSX, GLOB_SOURCE, GLOB_TYPESCRIPT, GLOB_VUE } from "./globs.ts";
import { plugins, reactTypeCheckedNames, reactTypeCheckedOff, reactWithoutTypeChecked } from "./plugins.ts";
import { getReactCompilerDisabledRuleMap, getReactCompilerRuleMap, type ReactCompilerPreset } from "./reactCompiler.ts";

/**
 * flat config 规则表类型（规则映射统一转换的目标类型）
 *
 * @example
 * ```ts
 * import type { RuleMap } from "@pawover/kit-eslint-rules";
 *
 * const rules: RuleMap = { "no-console": "error" };
 * ```
 */
export type RuleMap = NonNullable<Linter.Config["rules"]>;

/**
 * 单个 flat config 配置层
 *
 * 每个配置层都带唯一 `name`，可配合 composer 的 `override(name, config)` 精确定位并覆盖。
 *
 * @example
 * ```ts
 * import type { ConfigLayer } from "@pawover/kit-eslint-rules";
 *
 * const layer: ConfigLayer = {
 *   name: "custom/rules",
 *   rules: { "no-console": "error" },
 * };
 * ```
 */
export type ConfigLayer = Linter.Config;

/** 层名字典：预设产出的全部唯一配置层名称。 */
const LAYER_NAMES = {
  ignores: "pawover/ignores",
  javascript: {
    parser: "pawover/javascript/parser",
    rules: "pawover/javascript/rules",
  },
  typescript: {
    setup: "pawover/typescript/setup",
    parser: "pawover/typescript/parser",
    rules: "pawover/typescript/rules",
    typeAware: "pawover/typescript/type-aware",
  },
  stylistic: {
    setup: "pawover/stylistic/setup",
    rules: "pawover/stylistic/rules",
  },
  antfu: {
    setup: "pawover/antfu/setup",
    rules: "pawover/antfu/rules",
  },
  imports: {
    setup: "pawover/imports/setup",
    rules: "pawover/imports/rules",
  },
  importsSort: {
    setup: "pawover/imports-sort/setup",
    rules: "pawover/imports-sort/rules",
  },
  react: {
    setup: "pawover/react/setup",
    rules: "pawover/react/rules",
    typeAware: "pawover/react/type-aware",
  },
  vue: {
    setup: "pawover/vue/setup",
    parser: "pawover/vue/parser",
    rules: "pawover/vue/rules",
  },
} as const;

/** 递归提取对象字面量的全部值类型。 */
type DeepValue<T> = T extends object
  ? { [K in keyof T]: DeepValue<T[K]> }[keyof T]
  : T;

/**
 * 各配置层名称
 *
 * 每层配置都带唯一 `name`，可配合 composer 的 `override(name, config)` 精确定位并覆盖。
 *
 * @example
 * ```ts
 * import type { ConfigNames } from "@pawover/kit-eslint-rules";
 *
 * const name: ConfigNames = "pawover/typescript/rules";
 * ```
 */
export type ConfigNames = DeepValue<typeof LAYER_NAMES>;

/**
 * 用户追加的 flat config
 *
 * 可以是单个配置对象、配置数组、composer，或配置数组的 Promise。
 *
 * @example
 * ```ts
 * import type { PawoverUserConfig } from "@pawover/kit-eslint-rules";
 *
 * const config: PawoverUserConfig = { rules: { "no-console": "error" } };
 * ```
 */
export type PawoverUserConfig =
  | ConfigLayer
  | ConfigLayer[]
  | FlatConfigComposer<any>
  | Promise<ConfigLayer[]>;

const javascript = javascriptRules as unknown as RuleMap;
const typescript = typescriptRules as unknown as RuleMap;
const stylistic = stylisticRules as unknown as RuleMap;
const antfu = antfuRules as unknown as RuleMap;
const imports = importsRules as unknown as RuleMap;
const importsSort = importsSortRules as unknown as RuleMap;
const react = reactRules as unknown as RuleMap;
const reactHooks = reactHooksRules as unknown as RuleMap;
const vue = vueRules as unknown as RuleMap;

/** react 映射中依赖类型信息的规则 id（`react/` 前缀） */
const reactTypeCheckedRuleIds = new Set(reactTypeCheckedNames.map((name) => `react/${name}`));
/** react 映射中的 type-aware 规则子集（仅在 ts/tsx/jsx 层启用） */
const reactTypeCheckedRules = Object.fromEntries(
  [...reactTypeCheckedRuleIds].flatMap((ruleId) => {
    const rule = react[ruleId];

    return rule === undefined
      ? []
      : [
        [ruleId, rule] as const,
      ];
  }),
);
/** react 映射中剔除 type-aware 规则后的基础规则表（作用于全部源文件） */
const reactBase = Object.fromEntries(
  Object.entries(react).filter(([ruleId]) => !reactTypeCheckedRuleIds.has(ruleId)),
);

/** flat config 插件类型。 */
type FlatConfigPlugin = NonNullable<Linter.Config["plugins"]>[string];

/** 规则组的通用装配参数。 */
interface RulesGroupOptions {
  /** setup 层名称 */
  setup: ConfigNames;
  /** rules 层名称 */
  rules: ConfigNames;
  /** 插件注册名（与规则命名空间前缀一致） */
  plugin: string;
  /** 插件实现 */
  pluginImpl: FlatConfigPlugin;
  /** 规则映射 */
  ruleMap: RuleMap;
  /** 规则组覆盖 */
  overrides?: RuleMap | undefined;
  /** rules 层文件范围 */
  files: string[];
  /** 可选的 parser 层（插入 setup 与 rules 之间） */
  parserLayer?: ConfigLayer | undefined;
}

/** 追加「setup（注册插件）→ parser（可选）→ rules（规则与文件范围）」三层。 */
function addGroup (configs: ConfigLayer[], options: RulesGroupOptions): void {
  configs.push({
    name: options.setup,
    plugins: { [options.plugin]: options.pluginImpl },
  });

  if (options.parserLayer) {
    configs.push(options.parserLayer);
  }

  configs.push({
    name: options.rules,
    files: [...options.files],
    rules: {
      ...options.ruleMap,
      ...(options.overrides ?? {}),
    },
  });
}

/**
 * 规则组覆盖选项
 *
 * 覆盖规则会与预设规则表合并，同名规则以 `overrides` 为准。
 *
 * @example
 * ```ts
 * const options: RulesOverrideOptions = {
 *   overrides: { "ts/consistent-type-definitions": ["error", "interface"] },
 * };
 * ```
 */
export interface RulesOverrideOptions {
  /** 覆盖该规则组的规则（与预设规则表浅合并，同名规则以本参数为准） */
  overrides?: RuleMap;
}

/**
 * TypeScript 规则组选项
 *
 * @example
 * ```ts
 * const options: TypeScriptOptions = {
 *   overrides: { "ts/consistent-type-definitions": ["error", "interface"] },
 *   overridesTypeAware: { "ts/no-unsafe-assignment": "warn" },
 *   parserOptions: { tsconfigRootDir: import.meta.dirname },
 * };
 * ```
 */
export interface TypeScriptOptions extends RulesOverrideOptions {
  /** 仅覆盖类型感知规则（作用于 `filesTypeAware` 限定的文件） */
  overridesTypeAware?: RuleMap;
  /** 类型感知规则的文件范围；默认 {@link GLOB_TYPESCRIPT} */
  filesTypeAware?: string[];
  /** 透传给 TypeScript parser 的解析选项；与默认值浅合并，同名键以本参数为准 */
  parserOptions?: Record<string, unknown>;
}

/**
 * React 规则组选项
 *
 * @example
 * ```ts
 * const options: ReactOptions = {
 *   compiler: "latest",
 *   overrides: { "react/no-implicit-key": "warn" },
 *   overridesTypeAware: { "react/no-unused-props": "off" },
 * };
 * ```
 */
export interface ReactOptions extends RulesOverrideOptions {
  /**
   * React Compiler 规则切换
   *
   * react 组启用时默认开启（`true` 等价 `"recommended"`）：将 10 条与 `@eslint-react` 重叠的
   * Compiler 规则切换为 `eslint-plugin-react-hooks` 官方实现，并关闭 `@eslint-react` 等价规则；
   * 同时关闭 `react/no-unstable-context-value`（React Compiler 会自动记忆化 Context value）；
   * 传 `false` 回退到 `@eslint-react` 实现，传 `"latest"` 额外启用实验性 `react-hooks/void-use-memo`。
   *
   * 仅控制这 10 条重叠规则；官方独有的 `config` / `gating` / `incompatible-library` /
   * `preserve-manual-memoization` 始终由 `react-hooks` 提供。
   *
   * @default true
   *
   * @example
   * ```ts
   * const options: ReactOptions = { compiler: "latest" };
   * const legacy: ReactOptions = { compiler: false };
   * ```
   */
  compiler?: boolean | ReactCompilerPreset;
  /** 仅覆盖依赖类型信息的 react 规则（仅在开启 `typescript` 时生效） */
  overridesTypeAware?: RuleMap;
}

/**
 * 预设工厂选项
 *
 * 除 `javascript` 规则组常开外，其余规则组均通过对应字段显式开启。
 * 每个规则组都接受 `{ overrides }` 形式，在预设内部完成规则覆盖，避免后置配置层与 flat config 插件作用域的问题。
 *
 * @example
 * ```ts
 * const options: PawoverOptions = {
 *   typescript: {
 *     overrides: { "ts/strict-void-return": [1, { allowReturnAny: true }] },
 *   },
 *   react: true,
 * };
 * ```
 */
export interface PawoverOptions {
  /** javascript 规则组覆盖选项（该组常开） */
  javascript?: RulesOverrideOptions;
  /** 启用 `typescript` 规则组（ts / tsx 文件；同时注册 TypeScript parser，默认启用 type-aware 解析） */
  typescript?: boolean | TypeScriptOptions;
  /** 启用 `stylistic` 规则组 */
  stylistic?: boolean | RulesOverrideOptions;
  /** 启用 `antfu` 规则组 */
  antfu?: boolean | RulesOverrideOptions;
  /** 启用 `imports` 规则组（eslint-plugin-import-lite） */
  imports?: boolean | RulesOverrideOptions;
  /** 启用 `importsSort` 规则组（eslint-plugin-simple-import-sort） */
  importsSort?: boolean | RulesOverrideOptions;
  /** 启用 `react` 规则组（注册 `@eslint-react` 与 `eslint-plugin-react-hooks` 两个插件，默认开启 React Compiler 规则切换）；与 `typescript` 同开时，依赖类型信息的规则作用于 ts/tsx/jsx */
  react?: boolean | ReactOptions;
  /** 启用 `vue` 规则组（vue / vue+ts 单文件组件；同时接入 vue-eslint-parser） */
  vue?: boolean | RulesOverrideOptions;
}

/** 将布尔 / 对象选项归一化为选项对象。 */
function resolveOptions<T extends object> (value: boolean | T | undefined): Partial<T> {
  return typeof value === "object" && value !== null
    ? value
    : {};
}

/** 将 React Compiler 开关归一化为官方预设名；`false` 表示回退到 `@eslint-react` 实现。 */
function resolveReactCompilerPreset (value: boolean | ReactCompilerPreset | undefined): ReactCompilerPreset | undefined {
  if (value === false) {
    return undefined;
  }

  return value === "latest"
    ? "latest"
    : "recommended";
}

/**
 * 创建 ESLint flat config 预设
 *
 * 返回 composer（继承 Promise，可直接用于 `eslint.config.js` 的默认导出），也可链式调用
 * `append` / `prepend` / `override` / `renamePlugins` 等能力继续组合。
 *
 * 各规则组拆为 `setup` 层（只注册插件，不带 `files`）、`parser` 层（解析器）与
 * `rules` / `type-aware` 层（规则与文件范围），因此后置配置可以直接使用预设已注册的插件规则；
 * 若需注册自定义插件，在自己的配置层中挂载即可。
 *
 * @param options 预设选项；缺省时返回忽略层与 `javascript` parser/rules 层
 * @param userConfigs 追加在预设之后的 flat config（单个对象、数组、composer 或 Promise）
 * @returns 可直接导出或继续链式组合的 flat config composer
 *
 * @example
 * ```ts
 * // TypeScript + React 项目，使用按组 overrides 覆盖规则
 * import pawover from "@pawover/kit/eslint-rules";
 *
 * export default pawover({
 *   typescript: {
 *     overrides: { "ts/strict-void-return": [1, { allowReturnAny: true }] },
 *   },
 *   react: true,
 * });
 * ```
 *
 * @example
 * ```ts
 * // 追加自定义配置层
 * import pawover from "@pawover/kit-eslint-rules";
 *
 * export default pawover(
 *   { typescript: true },
 *   { rules: { "no-console": "error" } },
 * );
 * ```
 *
 * @example
 * ```ts
 * // 按层名称覆盖
 * import pawover from "@pawover/kit-eslint-rules";
 *
 * export default pawover({ typescript: true })
 *   .override("pawover/typescript/rules", {
 *     rules: { "ts/consistent-type-definitions": ["error", "interface"] },
 *   });
 * ```
 */
function pawover (
  options: PawoverOptions = {},
  ...userConfigs: PawoverUserConfig[]
): FlatConfigComposer<ConfigLayer, ConfigNames> {
  const {
    javascript: javascriptOptions,
    stylistic: enableStylistic = false,
    antfu: enableAntfu = false,
    imports: enableImports = false,
    importsSort: enableImportsSort = false,
    react: enableReact = false,
    vue: enableVue = false,
  } = options;

  const enableTypescript = Boolean(options.typescript);
  const typescriptOptions = resolveOptions<TypeScriptOptions>(options.typescript);
  const stylisticOptions = resolveOptions<RulesOverrideOptions>(options.stylistic);
  const antfuOptions = resolveOptions<RulesOverrideOptions>(options.antfu);
  const importsOptions = resolveOptions<RulesOverrideOptions>(options.imports);
  const importsSortOptions = resolveOptions<RulesOverrideOptions>(options.importsSort);
  const reactOptions = resolveOptions<ReactOptions>(options.react);
  const reactCompilerPreset = resolveReactCompilerPreset(reactOptions.compiler);
  const vueOptions = resolveOptions<RulesOverrideOptions>(options.vue);

  const sourceFiles = enableVue
    ? [...GLOB_SOURCE, GLOB_VUE]
    : [...GLOB_SOURCE];
  const typescriptParserOptions = {
    projectService: true,
    ...(typescriptOptions.parserOptions ?? {}),
  };
  const filesTypeAware = typescriptOptions.filesTypeAware ?? [...GLOB_TYPESCRIPT];
  const reactTypeAwareFiles = [
    ...new Set([...filesTypeAware, GLOB_JSX]),
  ];

  const configs: ConfigLayer[] = [
    {
      name: LAYER_NAMES.ignores,
      ignores: [...GLOB_EXCLUDE],
    },
    {
      name: LAYER_NAMES.javascript.parser,
      files: [...sourceFiles],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {
          ecmaFeatures: { jsx: true },
        },
      },
    },
    {
      name: LAYER_NAMES.javascript.rules,
      files: [...sourceFiles],
      rules: {
        ...javascript,
        ...(javascriptOptions?.overrides ?? {}),
      },
    },
  ];

  if (enableTypescript) {
    const typescriptRuleFiles = enableVue
      ? [...GLOB_TYPESCRIPT, GLOB_VUE]
      : [...GLOB_TYPESCRIPT];
    const typescriptParserFiles = enableReact
      ? [...typescriptRuleFiles, GLOB_JSX]
      : [...typescriptRuleFiles];

    configs.push({
      name: LAYER_NAMES.typescript.setup,
      plugins: { ts: plugins.typescript },
    });
    configs.push({
      name: LAYER_NAMES.typescript.parser,
      files: [...typescriptParserFiles],
      languageOptions: {
        parser: plugins.typescriptParser,
        parserOptions: { ...typescriptParserOptions },
      },
    });
    configs.push({
      name: LAYER_NAMES.typescript.rules,
      files: [...typescriptRuleFiles],
      rules: {
        ...typescript,
        ...(typescriptOptions.overrides ?? {}),
      },
    });
    if (typescriptOptions.overridesTypeAware) {
      configs.push({
        name: LAYER_NAMES.typescript.typeAware,
        files: [...filesTypeAware],
        rules: { ...typescriptOptions.overridesTypeAware },
      });
    }
  }

  if (enableStylistic) {
    addGroup(configs, {
      setup: LAYER_NAMES.stylistic.setup,
      rules: LAYER_NAMES.stylistic.rules,
      plugin: "stylistic",
      pluginImpl: plugins.stylistic,
      ruleMap: stylistic,
      overrides: stylisticOptions.overrides,
      files: sourceFiles,
    });
  }

  if (enableAntfu) {
    addGroup(configs, {
      setup: LAYER_NAMES.antfu.setup,
      rules: LAYER_NAMES.antfu.rules,
      plugin: "antfu",
      pluginImpl: plugins.antfu,
      ruleMap: antfu,
      overrides: antfuOptions.overrides,
      files: sourceFiles,
    });
  }

  if (enableImports) {
    addGroup(configs, {
      setup: LAYER_NAMES.imports.setup,
      rules: LAYER_NAMES.imports.rules,
      plugin: "imports",
      pluginImpl: plugins.imports,
      ruleMap: imports,
      overrides: importsOptions.overrides,
      files: sourceFiles,
    });
  }

  if (enableImportsSort) {
    addGroup(configs, {
      setup: LAYER_NAMES.importsSort.setup,
      rules: LAYER_NAMES.importsSort.rules,
      plugin: "importsSort",
      pluginImpl: plugins.importsSort,
      ruleMap: importsSort,
      overrides: importsSortOptions.overrides,
      files: sourceFiles,
    });
  }

  if (enableReact) {
    const reactCompilerRules = reactCompilerPreset
      ? getReactCompilerRuleMap(reactCompilerPreset)
      : {
        off: {},
        on: getReactCompilerDisabledRuleMap(),
      };

    configs.push({
      name: LAYER_NAMES.react.setup,
      plugins: {
        "react": enableTypescript ? plugins.react : reactWithoutTypeChecked,
        "react-hooks": plugins.reactHooks,
      },
    });
    configs.push({
      name: LAYER_NAMES.react.rules,
      files: [...GLOB_SOURCE],
      rules: {
        ...reactBase,
        ...reactHooks,
        ...(enableTypescript
          ? {}
          : reactTypeCheckedOff),
        ...reactCompilerRules.off,
        ...reactCompilerRules.on,
        ...(reactOptions.overrides ?? {}),
      },
    });
    if (enableTypescript) {
      configs.push({
        name: LAYER_NAMES.react.typeAware,
        files: [...reactTypeAwareFiles],
        rules: {
          ...reactTypeCheckedRules,
          ...(reactOptions.overridesTypeAware ?? {}),
        },
      });
    }
  }

  if (enableVue) {
    addGroup(configs, {
      setup: LAYER_NAMES.vue.setup,
      parserLayer: {
        name: LAYER_NAMES.vue.parser,
        files: [GLOB_VUE],
        languageOptions: {
          parser: plugins.vueParser,
          parserOptions: enableTypescript
            ? { parser: plugins.typescriptParser, ...typescriptParserOptions }
            : {},
        },
      },
      rules: LAYER_NAMES.vue.rules,
      plugin: "vue",
      pluginImpl: plugins.vue,
      ruleMap: vue,
      overrides: vueOptions.overrides,
      files: [GLOB_VUE],
    });
  }

  let result = composer<ConfigLayer, ConfigNames>(...configs);

  if (userConfigs.length > 0) {
    result = result.append(...userConfigs);
  }

  return result;
}

export default pawover;
