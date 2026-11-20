import { ArrayUtil } from "@pawover/kit-utils";
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
/** 按是否依赖类型信息对 react 规则表一次分区（各组保持原映射顺序） */
const [reactTypeCheckedEntries, reactBaseEntries] = ArrayUtil.fork(
  Object.entries(react),
  ([ruleId]) => reactTypeCheckedRuleIds.has(ruleId),
);
/** react 映射中的 type-aware 规则子集（仅在 ts/tsx/jsx 层启用） */
const reactTypeCheckedRules = Object.fromEntries(reactTypeCheckedEntries);
/** react 映射中剔除 type-aware 规则后的基础规则表（作用于全部源文件） */
const reactBase = Object.fromEntries(reactBaseEntries);

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
 * 引号风格快捷值
 *
 * 用于 `stylistic.quotes` 快捷项；仅支持单引号与双引号，不包含模板字符串（backtick）。
 *
 * @example
 * ```ts
 * const quotes: StylisticQuotes = "single";
 * ```
 */
export type StylisticQuotes = "single" | "double";

/**
 * stylistic 规则组选项
 *
 * 除通用 `overrides` 外提供常用风格快捷项；快捷项在装配阶段编译为规则配置，
 * 优先级低于 `overrides`、高于规则映射默认值。
 *
 * @example
 * ```ts
 * // 单引号 + 不写分号（自动联动 JSX 引号与 TypeScript 成员分隔符）
 * const options: StylisticOptions = { quotes: "single", semi: false };
 * ```
 *
 * @example
 * ```ts
 * // 保留原有 `{ overrides }` 用法
 * const legacy: StylisticOptions = { overrides: { "stylistic/quotes": 0 } };
 * ```
 */
export interface StylisticOptions extends RulesOverrideOptions {
  /** 引号风格：同时切换 `stylistic/quotes` 与 `stylistic/jsx-quotes`（不传则不产生覆写） */
  quotes?: StylisticQuotes;
  /** 是否保留语句分号；传 `false` 时自动联动 `stylistic/member-delimiter-style`（不传则不产生覆写） */
  semi?: boolean;
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
  /**
   * 透传给 TypeScript parser 的解析选项；与默认值浅合并，同名键以本参数为准
   *
   * `extraFileExtensions` 例外：启用 `vue` 时会自动并入 `.vue`，本参数中的同名数组与之去重合并；
   * 未启用 `vue` 时按原值透传（不裁剪、不改写）。
   */
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
 * Vue 组件命名风格
 *
 * 同时适用于模板标签、组件属性与自定义事件三处命名快捷项。
 *
 * @example
 * ```ts
 * const casing: VueNamingCasing = "kebab-case";
 * ```
 */
export type VueNamingCasing = "PascalCase" | "camelCase" | "kebab-case";

/**
 * vue 规则组选项
 *
 * 命名快捷项分别映射到模板标签、组件属性与自定义事件三条规则：单项优先于总开关 `naming`，
 * `overrides` 优先于全部快捷项。
 *
 * @example
 * ```ts
 * // 属性与事件使用 kebab-case，仅模板标签保留 PascalCase
 * const options: VueOptions = { naming: "kebab-case", templateNaming: "PascalCase" };
 * ```
 *
 * @example
 * ```ts
 * // 保留原有 `{ overrides }` 用法
 * const legacy: VueOptions = { overrides: { "vue/attribute-hyphenation": "off" } };
 * ```
 */
export interface VueOptions extends RulesOverrideOptions {
  /** 命名总开关：一次设定模板标签 / 组件属性 / 自定义事件三条规则 */
  naming?: VueNamingCasing;
  /** 模板标签命名（`vue/component-name-in-template-casing`），优先于 `naming` */
  templateNaming?: VueNamingCasing;
  /** 组件属性命名（`vue/attribute-hyphenation`），优先于 `naming` */
  attributeNaming?: VueNamingCasing;
  /** 自定义事件命名（`vue/v-on-event-hyphenation`），优先于 `naming` */
  eventNaming?: VueNamingCasing;
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
 *
 * @example
 * ```ts
 * // 风格快捷开关
 * const options: PawoverOptions = {
 *   stylistic: { quotes: "single", semi: false },
 *   vue: { naming: "kebab-case" },
 * };
 * ```
 */
export interface PawoverOptions {
  /** javascript 规则组覆盖选项（该组常开） */
  javascript?: RulesOverrideOptions;
  /** 启用 `typescript` 规则组（ts / tsx 文件；同时注册 TypeScript parser，默认启用 type-aware 解析） */
  typescript?: boolean | TypeScriptOptions;
  /** 启用 `stylistic` 规则组（支持 `quotes` / `semi` 风格快捷项） */
  stylistic?: boolean | StylisticOptions;
  /** 启用 `antfu` 规则组 */
  antfu?: boolean | RulesOverrideOptions;
  /** 启用 `imports` 规则组（eslint-plugin-import-lite） */
  imports?: boolean | RulesOverrideOptions;
  /** 启用 `importsSort` 规则组（eslint-plugin-simple-import-sort） */
  importsSort?: boolean | RulesOverrideOptions;
  /** 启用 `react` 规则组（注册 `@eslint-react` 与 `eslint-plugin-react-hooks` 两个插件，默认开启 React Compiler 规则切换）；与 `typescript` 同开时，依赖类型信息的规则作用于 ts/tsx/jsx */
  react?: boolean | ReactOptions;
  /** 启用 `vue` 规则组（vue / vue+ts 单文件组件；同时接入 vue-eslint-parser，与 `typescript` 同开时自动为 TypeScript parser 放行 `.vue` 扩展名；支持 `naming` 命名快捷项） */
  vue?: boolean | VueOptions;
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

/** `stylistic/quotes` 引号风格 → `stylistic/jsx-quotes` 选项 */
const JSX_QUOTES_BY_QUOTES = {
  single: "prefer-single",
  double: "prefer-double",
} as const;

/**
 * 把 stylistic 快捷项编译为规则覆写
 *
 * 仅编译用户显式传入的快捷项，未传时返回空表，保证装配结果与规则映射默认值完全一致。
 *
 * @param options stylistic 规则组选项（布尔形式已归一化为空对象）
 * @returns 快捷项对应的规则覆写表
 *
 * @example
 * ```ts
 * const rules = resolveStylisticShortcuts({ semi: false });
 * // {"stylistic/semi": [2, "never"], "stylistic/member-delimiter-style": [...]}
 * ```
 */
function resolveStylisticShortcuts (options: Partial<StylisticOptions>): RuleMap {
  const rules: RuleMap = {};
  const { quotes, semi } = options;

  if (quotes !== undefined) {
    rules["stylistic/quotes"] = [2, quotes];
    rules["stylistic/jsx-quotes"] = [2, JSX_QUOTES_BY_QUOTES[quotes]];
  }

  if (semi !== undefined) {
    rules["stylistic/semi"] = [
      2,
      semi ? "always" : "never",
    ];

    // 不写分号时，TypeScript 接口/类型字面量的成员分隔符必须同步改为无分隔符风格。
    if (!semi) {
      rules["stylistic/member-delimiter-style"] = [
        2,
        {
          multiline: { delimiter: "none", requireLast: false },
          singleline: { delimiter: "comma" },
          multilineDetection: "brackets",
        },
      ];
    }
  }

  return rules;
}

/** 把命名风格转换为 `always`（kebab-case）/ `never`（PascalCase、camelCase）连字符选项。 */
function toHyphenationOption (casing: VueNamingCasing): "always" | "never" {
  return casing === "kebab-case"
    ? "always"
    : "never";
}

/**
 * 把 vue 命名快捷项编译为规则覆写
 *
 * 单项（`templateNaming` / `attributeNaming` / `eventNaming`）优先于总开关 `naming`；
 * 两者都未传时返回空表，保证装配结果与规则映射默认值完全一致。
 *
 * @param options vue 规则组选项（布尔形式已归一化为空对象）
 * @returns 命名快捷项对应的规则覆写表
 *
 * @example
 * ```ts
 * const rules = resolveVueNamingShortcuts({ naming: "kebab-case" });
 * // 三条规则同时切换为 kebab-case
 * ```
 */
function resolveVueNamingShortcuts (options: Partial<VueOptions>): RuleMap {
  const rules: RuleMap = {};
  const templateNaming = options.templateNaming ?? options.naming;
  const attributeNaming = options.attributeNaming ?? options.naming;
  const eventNaming = options.eventNaming ?? options.naming;

  if (templateNaming !== undefined) {
    rules["vue/component-name-in-template-casing"] = [
      2,
      templateNaming,
      { registeredComponentsOnly: false },
    ];
  }

  if (attributeNaming !== undefined) {
    rules["vue/attribute-hyphenation"] = [
      2,
      toHyphenationOption(attributeNaming),
      { ignore: [] },
    ];
  }

  if (eventNaming !== undefined) {
    rules["vue/v-on-event-hyphenation"] = [
      2,
      toHyphenationOption(eventNaming),
      { autofix: true },
    ];
  }

  return rules;
}

/**
 * 合并规则组覆写（优先级：`overrides` > 快捷项 > 规则映射默认值）
 *
 * @param shortcutRules 快捷项编译结果
 * @param overrides 用户显式规则覆盖
 * @returns 合并后的规则表；两者皆为空时返回 `undefined`，保持不传快捷项时的装配结果不变
 */
function mergeGroupOverrides (shortcutRules: RuleMap, overrides: RuleMap | undefined): RuleMap | undefined {
  const merged = {
    ...shortcutRules,
    ...(overrides ?? {}),
  };

  return Object.keys(merged).length > 0
    ? merged
    : undefined;
}

/**
 * 合并 `parserOptions.extraFileExtensions`
 *
 * 用户项保持原顺序在前，随后追加预设必需的扩展名并去重。用户值不是数组时原样返回，
 * 不在预设内做运行时裁剪；用户未提供且无必需扩展名时返回 `undefined`，避免写入空数组。
 *
 * @param provided 用户传入的 `parserOptions.extraFileExtensions` 字段值
 * @param required 预设必需的扩展名
 * @returns 去重合并后的扩展名数组；用户值不是数组时原样返回该值；用户未提供且无必需扩展名时返回 `undefined`
 */
function mergeExtraFileExtensions (provided: unknown, required: readonly string[]): unknown {
  if (provided === undefined) {
    return required.length > 0
      ? [...required]
      : undefined;
  }

  return Array.isArray(provided)
    ? ArrayUtil.merge(provided, required)
    : provided;
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
  const stylisticOptions = resolveOptions<StylisticOptions>(options.stylistic);
  const antfuOptions = resolveOptions<RulesOverrideOptions>(options.antfu);
  const importsOptions = resolveOptions<RulesOverrideOptions>(options.imports);
  const importsSortOptions = resolveOptions<RulesOverrideOptions>(options.importsSort);
  const reactOptions = resolveOptions<ReactOptions>(options.react);
  const reactCompilerPreset = resolveReactCompilerPreset(reactOptions.compiler);
  const vueOptions = resolveOptions<VueOptions>(options.vue);

  const sourceFiles = enableVue
    ? [...GLOB_SOURCE, GLOB_VUE]
    : [...GLOB_SOURCE];
  // 启用 vue 时，vue-eslint-parser 会把 `.vue` 交给 TypeScript parser 解析 script 块，
  // 需显式放行该非标准扩展名，否则 project service 会报「extension is non-standard」。
  // 未启用 vue 时不触碰用户的 extraFileExtensions，原样透传。
  const extraFileExtensions = enableVue
    ? mergeExtraFileExtensions(typescriptOptions.parserOptions?.["extraFileExtensions"], [".vue"])
    : undefined;
  const typescriptParserOptions = {
    projectService: true,
    ...(typescriptOptions.parserOptions ?? {}),
    ...(extraFileExtensions === undefined
      ? {}
      : { extraFileExtensions }),
  };
  const filesTypeAware = typescriptOptions.filesTypeAware ?? [...GLOB_TYPESCRIPT];
  const reactTypeAwareFiles = ArrayUtil.merge(filesTypeAware, [GLOB_JSX]);

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
      overrides: mergeGroupOverrides(resolveStylisticShortcuts(stylisticOptions), stylisticOptions.overrides),
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
        // vue processor 负责消费 `vue/comment-directive` 的 `clear` 消息，
        // 缺失时每条 `clear` 都会作为错误暴露给用户。
        processor: "vue/vue",
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
      overrides: mergeGroupOverrides(resolveVueNamingShortcuts(vueOptions), vueOptions.overrides),
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
