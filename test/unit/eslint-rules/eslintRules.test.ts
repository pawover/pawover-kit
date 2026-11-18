import { describe, expect, it } from "vitest";
import { Linter } from "eslint";
import { builtinRules } from "eslint/use-at-your-own-risk";
import pawover, { GLOB_EXCLUDE, GLOB_TYPESCRIPT } from "@pawover/kit/eslint-rules";
import type { ConfigNames, PawoverOptions } from "@pawover/kit/eslint-rules";
import stylisticCoreRules from "../../../packages/eslint-rules/src/core.stylistic.ts";
import vueCoreRules from "../../../packages/eslint-rules/src/core.vue.ts";
import {
  getReactHooksPresetRules,
  normalizeRuleLevel,
  REACT_COMPILER_DISABLED_REACT_RULES,
  REACT_COMPILER_LATEST_ONLY_RULES,
  REACT_COMPILER_RULE_MAP,
  REACT_HOOKS_CORE_RULES,
} from "../../../packages/eslint-rules/src/reactCompiler.ts";

/** `core.stylistic.ts` 现状规则映射（默认值守卫基准）。 */
const STYLISTIC_DEFAULTS = stylisticCoreRules as Record<string, unknown>;
/** `core.vue.ts` 现状规则映射（默认值守卫基准）。 */
const VUE_DEFAULTS = vueCoreRules as Record<string, unknown>;

const ALL_OPTIONS: PawoverOptions = {
  typescript: true,
  stylistic: true,
  antfu: true,
  imports: true,
  importsSort: true,
  react: true,
  vue: true,
};

/** 解析 composer 为 flat config 数组。 */
async function resolvePreset(options: PawoverOptions = {}): Promise<Linter.Config[]> {
  return await pawover(options);
}

function collectRuleIds(configs: Linter.Config[]): string[] {
  return configs.flatMap((config) => Object.keys(config.rules ?? {}));
}

/** 收集预设中全部已注册插件（setup 层无条件匹配所有文件）。 */
function collectPlugins(configs: Linter.Config[]): NonNullable<Linter.Config["plugins"]> {
  return Object.assign({}, ...configs.map((config) => config.plugins));
}

/**
 * 黑盒校验：遍历预设产物中每层 rules 引用的规则，
 * 带命名空间的规则必须存在于预设已注册插件，无命名空间的必须存在于 ESLint 内置规则表。
 */
function findUnresolvedRules(configs: Linter.Config[]): string[] {
  const unresolved: string[] = [];
  const presetPlugins = collectPlugins(configs);

  for (const ruleId of collectRuleIds(configs)) {
    const separatorIndex = ruleId.indexOf("/");

    if (separatorIndex === -1) {
      if (!builtinRules.has(ruleId)) unresolved.push(ruleId);
      continue;
    }

    const pluginName = ruleId.slice(0, separatorIndex);
    const ruleName = ruleId.slice(separatorIndex + 1);
    const plugin = presetPlugins[pluginName];

    if (!plugin) {
      unresolved.push(ruleId);
    } else if (!Object.hasOwn(plugin.rules ?? {}, ruleName)) {
      unresolved.push(ruleId);
    }
  }

  return unresolved;
}

/** 按层名称查找配置。 */
function findLayer(configs: Linter.Config[], name: ConfigNames): Linter.Config | undefined {
  return configs.find((config) => config.name === name);
}

describe("pawover default export", () => {
  it("should keep GLOB_EXCLUDE with common exclude patterns", () => {
    expect(GLOB_EXCLUDE).toContain("**/node_modules");
    expect(GLOB_EXCLUDE).toContain("**/dist");
    expect(GLOB_EXCLUDE).toContain("**/coverage");
    expect(GLOB_EXCLUDE.length).toBeGreaterThan(10);
  });

  it("should return only ignores and javascript layers for the default call", async () => {
    const configs = await resolvePreset();

    expect(configs).toHaveLength(3);
    expect(configs[0]?.ignores).toEqual(GLOB_EXCLUDE);
    expect(findLayer(configs, "pawover/javascript/parser")?.rules).toBeUndefined();
    expect(Object.keys(findLayer(configs, "pawover/javascript/rules")?.rules ?? {}).length).toBeGreaterThan(100);
    expect(findLayer(configs, "pawover/javascript/rules")?.plugins).toBeUndefined();
  });

  it("should register every enabled group plugin with the same name as its rule prefix", async () => {
    const configs = await resolvePreset(ALL_OPTIONS);
    const pluginNames = new Set(configs.flatMap((config) => Object.keys(config.plugins ?? {})));

    expect(pluginNames).toEqual(new Set(["ts", "stylistic", "antfu", "imports", "importsSort", "react", "react-hooks", "vue"]));
  });

  it("should resolve every rule referenced by the fully enabled preset", async () => {
    expect(findUnresolvedRules(await resolvePreset(ALL_OPTIONS))).toEqual([]);
  });

  it("should resolve every rule referenced by the default preset", async () => {
    expect(findUnresolvedRules(await resolvePreset())).toEqual([]);
  });

  it("should not contain the removed @eslint-react debug rules", async () => {
    const ruleIds = collectRuleIds(await resolvePreset({ react: true }));

    expect(ruleIds.some((ruleId) => ruleId.includes("debug-"))).toBe(false);
  });
});

describe("file patterns", () => {
  it("should include vue files in shared layers when vue is enabled", async () => {
    const configs = await resolvePreset({ vue: true });

    expect(findLayer(configs, "pawover/javascript/rules")?.files).toContain("**/*.vue");
  });

  it("should exclude vue files from shared layers by default", async () => {
    const configs = await resolvePreset();

    expect(findLayer(configs, "pawover/javascript/rules")?.files).not.toContain("**/*.vue");
  });

  it("should exclude vue files from the react layer even when vue is enabled", async () => {
    const configs = await resolvePreset(ALL_OPTIONS);
    const reactLayer = findLayer(configs, "pawover/react/rules");

    expect(reactLayer?.files).toEqual(["**/*.{js,cjs,mjs,jsx,ts,tsx}"]);
  });

  it("should restrict typescript rules to ts/tsx files", async () => {
    const configs = await resolvePreset({ typescript: true });
    const typescriptLayer = findLayer(configs, "pawover/typescript/rules");

    expect(typescriptLayer?.files).toEqual(["**/*.{ts,tsx}"]);
  });

  it("should extend typescript rules to vue files when both are enabled", async () => {
    const configs = await resolvePreset({ typescript: true, vue: true });
    const typescriptLayer = findLayer(configs, "pawover/typescript/rules");

    expect(typescriptLayer?.files).toEqual(["**/*.{ts,tsx}", "**/*.vue"]);
  });
});

describe("typescript parser", () => {
  it("should apply the typescript parser to ts/tsx files with projectService by default", async () => {
    const configs = await resolvePreset({ typescript: true });
    const parserLayer = findLayer(configs, "pawover/typescript/parser");

    expect(parserLayer?.files).toEqual(["**/*.{ts,tsx}"]);
    expect(parserLayer?.languageOptions?.parserOptions).toMatchObject({ projectService: true });
  });

  it("should keep js files out of the typescript project service", async () => {
    const linter = new Linter({ configType: "flat" });
    const configs = (await resolvePreset({ typescript: true })).filter((config) => !config.ignores);
    const messages = linter.verify("export const answer = 42;", configs, { filename: "helper.js" });

    expect(messages.filter((message) => message.fatal)).toEqual([]);
  });

  it("should keep plain js files out of the project service even with react enabled", async () => {
    const linter = new Linter({ configType: "flat" });
    const configs = (await resolvePreset({ typescript: true, react: true })).filter((config) => !config.ignores);
    const messages = linter.verify("export const util = 42;", configs, { filename: "util.js" });

    expect(messages.filter((message) => message.fatal)).toEqual([]);
  });

  it("should extend the typescript parser to jsx files when react is enabled", async () => {
    const configs = await resolvePreset({ typescript: true, react: true });
    const parserLayer = findLayer(configs, "pawover/typescript/parser");

    expect(parserLayer?.files).toEqual(["**/*.{ts,tsx}", "**/*.jsx"]);
  });

  it("should let typescript.parserOptions override the defaults", async () => {
    const configs = await resolvePreset({
      typescript: {
        parserOptions: { projectService: false, tsconfigRootDir: "/repo" },
      },
    });
    const parserLayer = findLayer(configs, "pawover/typescript/parser");

    expect(parserLayer?.languageOptions?.parserOptions).toMatchObject({
      projectService: false,
      tsconfigRootDir: "/repo",
    });
  });

  it("should forward the typescript parser to vue SFC script blocks", async () => {
    const configs = await resolvePreset({ typescript: true, vue: true });
    const vueLayer = findLayer(configs, "pawover/vue/parser");

    expect(vueLayer?.languageOptions?.parserOptions).toMatchObject({
      parser: expect.anything(),
    });
  });

  it("should not set a script parser for vue when typescript is disabled", async () => {
    const configs = await resolvePreset({ vue: true });
    const vueLayer = findLayer(configs, "pawover/vue/parser");

    expect(vueLayer?.languageOptions?.parserOptions).toEqual({});
  });

  it("should forward the vue extension through both typescript parser layers when vue is enabled", async () => {
    const configs = await resolvePreset({ typescript: true, vue: true });
    const parserOptions = findLayer(configs, "pawover/typescript/parser")?.languageOptions?.parserOptions;
    const vueParserOptions = findLayer(configs, "pawover/vue/parser")?.languageOptions?.parserOptions;

    expect(parserOptions).toMatchObject({ extraFileExtensions: [".vue"] });
    expect(vueParserOptions).toMatchObject({ extraFileExtensions: [".vue"] });
  });

  it("should not add extraFileExtensions when vue is disabled", async () => {
    const configs = await resolvePreset({ typescript: true });
    const parserLayer = findLayer(configs, "pawover/typescript/parser");

    expect(parserLayer?.languageOptions?.parserOptions).not.toHaveProperty("extraFileExtensions");
  });

  it("should keep user extraFileExtensions untouched when vue is disabled", async () => {
    const emptyConfigs = await resolvePreset({ typescript: { parserOptions: { extraFileExtensions: [] } } });
    // 非字符串项与重复项原样保留：预设不做运行时过滤或去重
    const userConfigs = await resolvePreset({
      typescript: { parserOptions: { extraFileExtensions: [".md", 42, ".md"] } },
    });

    expect(findLayer(emptyConfigs, "pawover/typescript/parser")?.languageOptions?.parserOptions).toEqual({
      projectService: true,
      extraFileExtensions: [],
    });
    expect(findLayer(userConfigs, "pawover/typescript/parser")?.languageOptions?.parserOptions).toEqual({
      projectService: true,
      extraFileExtensions: [".md", 42, ".md"],
    });
  });

  it("should append the vue extension after user extraFileExtensions", async () => {
    const configs = await resolvePreset({
      typescript: { parserOptions: { extraFileExtensions: [".md"] } },
      vue: true,
    });
    const parserLayer = findLayer(configs, "pawover/typescript/parser");

    expect(parserLayer?.languageOptions?.parserOptions).toMatchObject({
      extraFileExtensions: [".md", ".vue"],
    });
  });

  it("should keep user extraFileExtensions casing and append the vue extension verbatim", async () => {
    const configs = await resolvePreset({
      typescript: { parserOptions: { extraFileExtensions: [".Vue"] } },
      vue: true,
    });
    const parserLayer = findLayer(configs, "pawover/typescript/parser");

    // 严格相等：预设不做大小写归一，用户项原样保留、预设项原样追加
    expect(parserLayer?.languageOptions?.parserOptions).toMatchObject({
      extraFileExtensions: [".Vue", ".vue"],
    });
  });

  it("should keep user extraFileExtensions order and dedupe the vue extension", async () => {
    const configs = await resolvePreset({
      typescript: { parserOptions: { extraFileExtensions: [".vue", ".md"] } },
      vue: true,
    });
    const parserLayer = findLayer(configs, "pawover/typescript/parser");

    expect(parserLayer?.languageOptions?.parserOptions).toMatchObject({
      extraFileExtensions: [".vue", ".md"],
    });
  });
});

describe("vue processor", () => {
  it("should attach the vue processor to the vue parser layer", async () => {
    const configs = await resolvePreset({ vue: true });
    const vueLayer = findLayer(configs, "pawover/vue/parser");

    expect(vueLayer?.processor).toBe("vue/vue");
  });

  it("should not leak comment-directive clear messages when linting vue files", async () => {
    const linter = new Linter({ configType: "flat" });
    const configs = (await resolvePreset({ vue: true })).filter((config) => !config.ignores);
    const messages = linter.verify("<template><div /></template>\n", configs, { filename: "App.vue" });

    expect(messages.filter((message) => message.ruleId === "vue/comment-directive")).toEqual([]);
  });

  it("should honor eslint-disable-next-line comments inside vue templates", async () => {
    const linter = new Linter({ configType: "flat" });
    const directive = "  <!-- eslint-disable-next-line vue/no-v-html -->\n";
    const source = `<template>\n${directive}  <div v-html="html" />\n</template>\n`;
    const configs: Linter.Config[] = [
      ...(await resolvePreset({ vue: true })).filter((config) => !config.ignores),
      { rules: { "vue/no-v-html": "error" } },
    ];
    const disabledMessages = linter.verify(source, configs, { filename: "App.vue" });
    const plainMessages = linter.verify(source.replace(directive, ""), configs, { filename: "App.vue" });

    expect(disabledMessages.map((message) => message.ruleId)).not.toContain("vue/no-v-html");
    expect(plainMessages.map((message) => message.ruleId)).toContain("vue/no-v-html");
  });
});

describe("layer composition", () => {
  it("should merge react and react-hooks rules into a single react layer", async () => {
    const configs = await resolvePreset({ react: true });
    const reactLayer = findLayer(configs, "pawover/react/rules");
    const ruleIds = Object.keys(reactLayer?.rules ?? {});

    expect(ruleIds.some((ruleId) => ruleId.startsWith("react/"))).toBe(true);
    expect(ruleIds.some((ruleId) => ruleId.startsWith("react-hooks/"))).toBe(true);
  });

  it("should add one ignores layer, one javascript parser/rules pair and setup/rules layers per enabled group", async () => {
    const defaultLayers = (await resolvePreset()).length;
    const fullLayers = (await resolvePreset(ALL_OPTIONS)).length;
    const typescriptOnlyLayers = (await resolvePreset({ typescript: true })).length;

    expect(defaultLayers).toBe(3);
    expect(typescriptOnlyLayers).toBe(6);
    expect(fullLayers).toBe(20);
  });

  it("should give every layer a unique name", async () => {
    const configs = await resolvePreset(ALL_OPTIONS);
    const names = configs.map((config) => config.name).filter(Boolean);

    expect(names.length).toBe(configs.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it("should register plugins in files-free setup layers", async () => {
    const configs = await resolvePreset(ALL_OPTIONS);
    const setupLayers = configs.filter((config) => config.name?.endsWith("/setup"));

    expect(setupLayers.length).toBeGreaterThan(0);
    for (const layer of setupLayers) {
      expect(layer.files).toBeUndefined();
      expect(layer.rules).toBeUndefined();
      expect(Object.keys(layer.plugins ?? {}).length).toBeGreaterThan(0);
    }
  });
});

describe("composer", () => {
  it("should resolve to a flat config array", async () => {
    const composer = pawover({ typescript: true });
    const configs = await composer;

    expect(Array.isArray(configs)).toBe(true);
    expect(configs.length).toBeGreaterThan(0);
  });

  it("should append custom configs", async () => {
    const configs = await pawover({ typescript: true }).append({
      name: "custom",
      rules: { "no-console": "error" },
    });

    expect(configs.at(-1)).toMatchObject({
      name: "custom",
      rules: { "no-console": "error" },
    });
  });

  it("should override a named layer", async () => {
    const configs = await pawover({ typescript: true }).override("pawover/typescript/rules", {
      rules: {
        "ts/consistent-type-definitions": ["error", "interface"],
      },
    });
    const typescriptLayer = findLayer(configs, "pawover/typescript/rules");

    expect(typescriptLayer?.rules?.["ts/consistent-type-definitions"]).toEqual(["error", "interface"]);
  });

  it("should let a post config use preset plugin rules without re-registering plugins", async () => {
    const linter = new Linter({ configType: "flat" });
    const configs = (await resolvePreset({ stylistic: true })).filter((config) => !config.ignores);
    const messages = linter.verify(
      "const value = 1",
      [
        ...configs,
        {
          rules: {
            "stylistic/semi": ["error", "always"],
          },
        },
      ],
      { filename: "a.js" },
    );

    expect(messages.some((message) => message.ruleId === "stylistic/semi")).toBe(true);
    expect(messages.some((message) => message.message.includes("could not find plugin"))).toBe(false);
  });

  it("should statically resolve post-config ts rules via the preset setup layer", async () => {
    const configs = await resolvePreset({ typescript: true });

    expect(
      findUnresolvedRules([
        ...configs,
        {
          rules: { "ts/no-explicit-any": "error" },
        },
      ]),
    ).toEqual([]);
  });

  it("should rename plugin namespaces and rule prefixes through the composer", async () => {
    const configs = await pawover({ typescript: true }).renamePlugins({ ts: "typescript" });
    const typescriptLayer = findLayer(configs, "pawover/typescript/rules");

    expect(typescriptLayer?.rules).toHaveProperty("typescript/no-explicit-any");
    expect(Object.keys(typescriptLayer?.rules ?? {}).some((ruleId) => ruleId.startsWith("ts/"))).toBe(false);
  });
});

describe("group overrides", () => {
  it("should merge typescript overrides into the typescript rules layer", async () => {
    const configs = await resolvePreset({
      typescript: {
        overrides: { "ts/no-explicit-any": "error" },
      },
    });
    const typescriptLayer = findLayer(configs, "pawover/typescript/rules");

    expect(typescriptLayer?.rules?.["ts/no-explicit-any"]).toBe("error");
  });

  it("should add a type-aware override layer only when configured", async () => {
    const withoutOverrides = await resolvePreset({ typescript: true });
    const withOverrides = await resolvePreset({
      typescript: {
        overridesTypeAware: { "ts/no-explicit-any": "warn" },
      },
    });
    const layer = findLayer(withOverrides, "pawover/typescript/type-aware");

    expect(findLayer(withoutOverrides, "pawover/typescript/type-aware")).toBeUndefined();
    expect(layer?.files).toEqual(GLOB_TYPESCRIPT);
    expect(layer?.rules).toEqual({ "ts/no-explicit-any": "warn" });
  });

  it("should merge react overrides into the react rules layer", async () => {
    const configs = await resolvePreset({
      react: {
        overrides: { "react/no-implicit-key": "warn" },
      },
    });
    const reactLayer = findLayer(configs, "pawover/react/rules");

    expect(reactLayer?.rules?.["react/no-implicit-key"]).toBe("warn");
  });

  it("should merge react type-aware overrides when typescript is enabled", async () => {
    const configs = await resolvePreset({
      typescript: true,
      react: {
        overridesTypeAware: { "react/no-unused-props": "off" },
      },
    });
    const reactLayer = findLayer(configs, "pawover/react/type-aware");

    expect(reactLayer?.rules?.["react/no-unused-props"]).toBe("off");
  });

  it("should let consumers append custom global ignores", async () => {
    const configs = await pawover({ typescript: true }).append({
      ignores: ["dist/**"],
    });

    expect(configs.at(-1)?.ignores).toContain("dist/**");
    expect(configs[0]?.ignores).toContain("**/node_modules");
  });
});

describe("stylistic shortcuts", () => {
  const shortcutRuleIds = [
    "stylistic/quotes",
    "stylistic/jsx-quotes",
    "stylistic/semi",
    "stylistic/member-delimiter-style",
  ] as const;

  it("should not add any stylistic override when shortcuts are omitted", async () => {
    for (const stylistic of [true, {}]) {
      const layer = findLayer(await resolvePreset({ stylistic }), "pawover/stylistic/rules");

      // 整表全等：快捷项未传时装配结果必须与 core.stylistic.ts 逐条一致
      expect(layer?.rules).toEqual(STYLISTIC_DEFAULTS);
      for (const ruleId of shortcutRuleIds) {
        expect(layer?.rules?.[ruleId], ruleId).toEqual(STYLISTIC_DEFAULTS[ruleId]);
      }
    }

    expect(findLayer(await resolvePreset(), "pawover/stylistic/rules")).toBeUndefined();
  });

  it("should switch quotes and jsx quotes together for quotes: single", async () => {
    const rules = findLayer(await resolvePreset({ stylistic: { quotes: "single" } }), "pawover/stylistic/rules")?.rules;

    expect(rules?.["stylistic/quotes"]).toEqual([2, "single"]);
    expect(rules?.["stylistic/jsx-quotes"]).toEqual([2, "prefer-single"]);
    // 未传的快捷项不产生覆写
    expect(rules?.["stylistic/semi"]).toBe(STYLISTIC_DEFAULTS["stylistic/semi"]);
    expect(rules?.["stylistic/member-delimiter-style"]).toBe(STYLISTIC_DEFAULTS["stylistic/member-delimiter-style"]);
  });

  it("should switch quotes and jsx quotes together for quotes: double", async () => {
    const rules = findLayer(await resolvePreset({ stylistic: { quotes: "double" } }), "pawover/stylistic/rules")?.rules;

    expect(rules?.["stylistic/quotes"]).toEqual([2, "double"]);
    expect(rules?.["stylistic/jsx-quotes"]).toEqual([2, "prefer-double"]);
  });

  it("should link member-delimiter-style to semi: false", async () => {
    const rules = findLayer(await resolvePreset({ stylistic: { semi: false } }), "pawover/stylistic/rules")?.rules;

    expect(rules?.["stylistic/semi"]).toEqual([2, "never"]);
    expect(rules?.["stylistic/member-delimiter-style"]).toEqual([
      2,
      {
        multiline: { delimiter: "none", requireLast: false },
        singleline: { delimiter: "comma" },
        multilineDetection: "brackets",
      },
    ]);
    // 明确不联动这些规则
    expect(rules?.["stylistic/semi-spacing"]).toBe(STYLISTIC_DEFAULTS["stylistic/semi-spacing"]);
    expect(rules?.["stylistic/semi-style"]).toBe(STYLISTIC_DEFAULTS["stylistic/semi-style"]);
    expect(rules?.["stylistic/no-extra-semi"]).toBe(STYLISTIC_DEFAULTS["stylistic/no-extra-semi"]);
    expect(rules?.["stylistic/quote-props"]).toEqual(STYLISTIC_DEFAULTS["stylistic/quote-props"]);
  });

  it("should not link quotes to vue/html-quotes", async () => {
    const configs = await resolvePreset({ stylistic: { quotes: "single" }, vue: true });
    const stylisticRules = findLayer(configs, "pawover/stylistic/rules")?.rules;
    const vueRules = findLayer(configs, "pawover/vue/rules")?.rules;

    // 快捷项只编译 stylistic 自有规则，不产生 vue 规则覆写
    expect(stylisticRules).not.toHaveProperty("vue/html-quotes");
    // vue 组维持预设的 HTML 属性引号（恒为 double）
    expect(vueRules?.["vue/html-quotes"]).toEqual(VUE_DEFAULTS["vue/html-quotes"]);
  });

  it("should keep member-delimiter-style default for semi: true", async () => {
    const rules = findLayer(await resolvePreset({ stylistic: { semi: true } }), "pawover/stylistic/rules")?.rules;

    expect(rules?.["stylistic/semi"]).toEqual([2, "always"]);
    expect(rules?.["stylistic/member-delimiter-style"]).toEqual(STYLISTIC_DEFAULTS["stylistic/member-delimiter-style"]);
  });

  it("should let stylistic overrides win over shortcuts", async () => {
    const rules = findLayer(await resolvePreset({
      stylistic: {
        quotes: "single",
        overrides: { "stylistic/quotes": [2, "double"] },
      },
    }), "pawover/stylistic/rules")?.rules;

    expect(rules?.["stylistic/quotes"]).toEqual([2, "double"]);
    // 未被 overrides 覆盖的联动项仍按快捷项生效
    expect(rules?.["stylistic/jsx-quotes"]).toEqual([2, "prefer-single"]);
  });
});

describe("vue naming shortcuts", () => {
  const namingRuleIds = [
    "vue/component-name-in-template-casing",
    "vue/attribute-hyphenation",
    "vue/v-on-event-hyphenation",
  ] as const;

  it("should not add any naming override when shortcuts are omitted", async () => {
    const layer = findLayer(await resolvePreset({ vue: {} }), "pawover/vue/rules");

    // 整表全等：命名快捷项未传时装配结果必须与 core.vue.ts 逐条一致
    expect(layer?.rules).toEqual(VUE_DEFAULTS);
    for (const ruleId of namingRuleIds) {
      expect(layer?.rules?.[ruleId], ruleId).toEqual(VUE_DEFAULTS[ruleId]);
    }
  });

  it("should keep the boolean vue: true path untouched", async () => {
    const rules = findLayer(await resolvePreset({ vue: true }), "pawover/vue/rules")?.rules;

    expect(rules).toEqual(VUE_DEFAULTS);
    for (const ruleId of namingRuleIds) {
      expect(rules?.[ruleId], ruleId).toEqual(VUE_DEFAULTS[ruleId]);
    }
  });

  it("should switch all three naming rules for naming: kebab-case", async () => {
    const rules = findLayer(await resolvePreset({ vue: { naming: "kebab-case" } }), "pawover/vue/rules")?.rules;

    expect(rules?.["vue/component-name-in-template-casing"]).toEqual([
      2,
      "kebab-case",
      { registeredComponentsOnly: false },
    ]);
    expect(rules?.["vue/attribute-hyphenation"]).toEqual([2, "always", { ignore: [] }]);
    expect(rules?.["vue/v-on-event-hyphenation"]).toEqual([2, "always", { autofix: true }]);
  });

  it("should only switch the matching rule for a single templateNaming shortcut", async () => {
    const rules = findLayer(await resolvePreset({ vue: { templateNaming: "kebab-case" } }), "pawover/vue/rules")?.rules;

    expect(rules?.["vue/component-name-in-template-casing"]).toEqual([
      2,
      "kebab-case",
      { registeredComponentsOnly: false },
    ]);
    // 未传的单项保持预设默认值：不得回退到未传的 naming 而联动其他规则
    expect(rules?.["vue/attribute-hyphenation"]).toEqual(VUE_DEFAULTS["vue/attribute-hyphenation"]);
    expect(rules?.["vue/v-on-event-hyphenation"]).toEqual(VUE_DEFAULTS["vue/v-on-event-hyphenation"]);
  });

  it("should let single naming shortcuts win over the global naming switch", async () => {
    const rules = findLayer(await resolvePreset({
      vue: {
        naming: "kebab-case",
        templateNaming: "PascalCase",
      },
    }), "pawover/vue/rules")?.rules;

    expect(rules?.["vue/component-name-in-template-casing"]).toEqual([
      2,
      "PascalCase",
      { registeredComponentsOnly: false },
    ]);
    expect(rules?.["vue/attribute-hyphenation"]).toEqual([2, "always", { ignore: [] }]);
    expect(rules?.["vue/v-on-event-hyphenation"]).toEqual([2, "always", { autofix: true }]);
  });

  it("should let vue overrides win over naming shortcuts", async () => {
    const rules = findLayer(await resolvePreset({
      vue: {
        naming: "camelCase",
        overrides: { "vue/attribute-hyphenation": "off" },
      },
    }), "pawover/vue/rules")?.rules;

    expect(rules?.["vue/attribute-hyphenation"]).toBe("off");
    expect(rules?.["vue/component-name-in-template-casing"]).toEqual([
      2,
      "camelCase",
      { registeredComponentsOnly: false },
    ]);
    expect(rules?.["vue/v-on-event-hyphenation"]).toEqual([2, "never", { autofix: true }]);
  });
});

describe("vue deprecated stylistic bridge rules", () => {
  const deprecatedBridgeRuleIds = [
    "vue/array-bracket-newline",
    "vue/array-bracket-spacing",
    "vue/array-element-newline",
    "vue/object-curly-newline",
    "vue/object-curly-spacing",
    "vue/object-property-newline",
  ] as const;

  it("should disable rules that upstream merged into stylistic/list-style", async () => {
    const rules = findLayer(await resolvePreset({ vue: true }), "pawover/vue/rules")?.rules;

    // 上游复用 @stylistic 实现会触发运行时弃用告警，默认必须为 0 且不带配置对象
    for (const ruleId of deprecatedBridgeRuleIds) {
      expect(rules?.[ruleId], ruleId).toBe(0);
    }
  });
});

describe("vue severity tuning and stylistic alignment", () => {
  it("should soften rules that cannot be assumed for every consumer", async () => {
    const rules = findLayer(await resolvePreset({ vue: true }), "pawover/vue/rules")?.rules;

    // `useTemplateRef` 是 Vue 3.5+ API，预设不假设消费端版本，降为警告提醒迁移
    expect(rules?.["vue/prefer-use-template-ref"]).toBe(1);
    // 要求所有 slot 显式声明对透传类组件偏严格（且仅对 lang="ts" 的 script 生效）
    expect(rules?.["vue/require-explicit-slots"]).toBe(1);
    // ref(null) 哨兵值在 .ts 工具文件中会误报
    expect(rules?.["vue/require-typed-ref"]).toBe(0);
  });

  it("should align the template operator style with the stylistic group", async () => {
    const rules = findLayer(await resolvePreset({ vue: true }), "pawover/vue/rules")?.rules;

    // 运算符置于行首，与 stylistic/operator-linebreak 方向一致；三元表达式保留宽赦
    expect(rules?.["vue/operator-linebreak"]).toEqual([2, "before", { overrides: { "?": "ignore", ":": "ignore" } }]);
    // 与 stylistic/no-multi-spaces 同向：均为不带 exceptions 的严格模式
    expect(rules?.["vue/no-multi-spaces"]).toBe(2);
    // 刻意不一致：模板侧保留逗号位置检查，script 侧维持宽松选择
    expect(rules?.["vue/comma-style"]).toBe(2);
    expect(STYLISTIC_DEFAULTS["stylistic/comma-style"]).toBe(0);
  });
});

describe("reasonable-newline", () => {
  it("should align the default line length with Prettier printWidth", async () => {
    const configs = await resolvePreset({ antfu: true });
    const antfuLayer = findLayer(configs, "pawover/antfu/rules");

    expect(antfuLayer?.rules?.["antfu/reasonable-newline"]).toEqual([
      2,
      {
        minObjectProperties: 4,
        objectLineLength: 120,
        minArrayItems: 4,
        arrayLineLength: 120,
      },
    ]);
  });
});

describe("react type-aware fallback", () => {
  it("should disable type-aware react rules when typescript is not enabled", async () => {
    const configs = await resolvePreset({ react: true });
    const reactLayer = findLayer(configs, "pawover/react/rules");

    expect(reactLayer?.rules?.["react/no-implicit-key"]).toBe(0);
    expect(reactLayer?.rules?.["react/no-implicit-ref"]).toBe(0);
    expect(reactLayer?.rules?.["react/no-leaked-conditional-rendering"]).toBe(0);
    expect(reactLayer?.rules?.["react/no-unused-props"]).toBe(0);
  });

  it("should keep type-aware react rules when typescript is enabled", async () => {
    const configs = await resolvePreset({ react: true, typescript: true });
    const typeAwareLayer = configs.find((config) => config.rules?.["react/no-implicit-key"] === 1);

    expect(typeAwareLayer?.rules?.["react/no-implicit-key"]).toBe(1);
    expect(typeAwareLayer?.rules?.["react/no-leaked-conditional-rendering"]).toBe(2);
  });

  it("should mirror every rule listed in the plugin disable-type-checked config", async () => {
    const { plugins } = await import("../../../packages/eslint-rules/src/plugins.ts");
    const reactPlugin = plugins.react as unknown as {
      configs: Record<string, { rules?: Record<string, unknown> }>;
    };
    const typeCheckedRules = Object.keys(reactPlugin.configs["disable-type-checked"]?.rules ?? {})
      .filter((ruleId) => ruleId.startsWith("@eslint-react/"))
      .map((ruleId) => ruleId.replace("@eslint-react/", "react/"));
    const configs = await resolvePreset({ react: true });
    const reactLayer = findLayer(configs, "pawover/react/rules");

    expect(typeCheckedRules.length).toBeGreaterThan(0);
    for (const ruleId of typeCheckedRules) {
      expect(reactLayer?.rules?.[ruleId]).toBe(0);
    }
  });

  it("should stub type-aware react rules only when typescript is not enabled", async () => {
    const withoutTypescript = findLayer(await resolvePreset({ react: true }), "pawover/react/setup")?.plugins?.["react"];
    const withTypescript = findLayer(await resolvePreset({ react: true, typescript: true }), "pawover/react/setup")?.plugins?.["react"];
    const stubRule = withoutTypescript?.rules?.["no-implicit-key"] as { create: () => unknown } | undefined;
    const originalRule = withTypescript?.rules?.["no-implicit-key"] as { create: (context: never) => unknown } | undefined;

    expect(stubRule).toBeDefined();
    expect(originalRule).toBeDefined();
    // 无 typescript：注册 no-op 实现（安全调用、返回空监听器）
    expect(stubRule?.create()).toEqual({});
    // 有 typescript：保留原实现（直接调用缺少 RuleContext 会抛错）
    expect(() => originalRule?.create(undefined as never)).toThrow();
  });

  it("should scope type-aware react rules to ts/tsx/jsx files when typescript is enabled", async () => {
    const configs = await resolvePreset({ react: true, typescript: true });
    const typeAwareLayer = configs.find((config) => config.rules?.["react/no-implicit-key"] === 1);
    const baseLayer = findLayer(configs, "pawover/react/rules");

    expect(typeAwareLayer?.files).toEqual(["**/*.{ts,tsx}", "**/*.jsx"]);
    expect(baseLayer?.rules?.["react/no-implicit-key"]).toBeUndefined();
    expect(baseLayer?.rules?.["react/error-boundaries"]).toBeDefined();
  });

  it("should derive react type-aware files from typescript.filesTypeAware and keep jsx", async () => {
    const configs = await resolvePreset({
      typescript: {
        filesTypeAware: ["**/*.ts"],
      },
      react: {
        overridesTypeAware: { "react/no-unused-props": "off" },
      },
    });
    const typeAwareLayer = findLayer(configs, "pawover/react/type-aware");

    expect(typeAwareLayer?.files).toEqual(["**/*.ts", "**/*.jsx"]);
  });

  it("should stay quiet when a type-aware rule is force-enabled without typescript", async () => {
    const linter = new Linter({ configType: "flat" });
    const configs = (await resolvePreset({ react: true })).filter((config) => !config.ignores);
    const messages = linter.verify(
      "export const App = () => <div key={1} />;",
      [
        ...configs,
        {
          rules: { "react/no-implicit-key": 2, "react/no-implicit-children": 2 },
        },
      ],
      { filename: "app.jsx" },
    );

    expect(messages.filter((message) => message.fatal || message.message.includes("type information"))).toEqual([]);
    expect(messages.filter((message) => message.ruleId === "react/no-implicit-key" || message.ruleId === "react/no-implicit-children")).toEqual([]);
  });
});

describe("react compiler switch", () => {
  it("should switch shared compiler rules to react-hooks by default", async () => {
    const reactLayer = findLayer(await resolvePreset({ react: true }), "pawover/react/rules");

    expect(reactLayer?.rules?.["react/globals"]).toBe(0);
    expect(reactLayer?.rules?.["react/purity"]).toBe(0);
    expect(reactLayer?.rules?.["react-hooks/purity"]).toBe(2);
    expect(reactLayer?.rules?.["react-hooks/unsupported-syntax"]).toBe(1);
    expect(reactLayer?.rules?.["react-hooks/globals"]).toBe(2);
  });

  it("should keep @eslint-react rules when compiler is disabled", async () => {
    const disabled = findLayer(await resolvePreset({ react: { compiler: false } }), "pawover/react/rules");

    expect(disabled?.rules?.["react/globals"]).toBe(2);
    expect(disabled?.rules?.["react/purity"]).toBe(2);
    for (const hooksRule of Object.keys(REACT_COMPILER_RULE_MAP)) {
      expect(disabled?.rules?.[`react-hooks/${hooksRule}`], hooksRule).toBe(0);
    }
  });

  it("should disable no-unstable-context-value when compiler is enabled", async () => {
    const enabled = findLayer(await resolvePreset({ react: true }), "pawover/react/rules");
    const disabled = findLayer(await resolvePreset({ react: { compiler: false } }), "pawover/react/rules");

    expect(enabled?.rules?.["react/no-unstable-context-value"]).toBe(0);
    expect(disabled?.rules?.["react/no-unstable-context-value"]).toBe(2);
  });

  it("should enable void-use-memo only in the latest preset", async () => {
    const recommended = findLayer(await resolvePreset({ react: true }), "pawover/react/rules");
    const latest = findLayer(await resolvePreset({ react: { compiler: "latest" } }), "pawover/react/rules");

    expect(recommended?.rules?.["react-hooks/void-use-memo"]).toBe(0);
    expect(latest?.rules?.["react-hooks/void-use-memo"]).toBe(2);
  });

  it("should treat compiler: true as the recommended preset", async () => {
    const asTrue = findLayer(await resolvePreset({ react: { compiler: true } }), "pawover/react/rules");
    const asRecommended = findLayer(await resolvePreset({ react: { compiler: "recommended" } }), "pawover/react/rules");

    expect(asTrue?.rules).toEqual(asRecommended?.rules);
  });

  it("should let react overrides win over the compiler switch", async () => {
    const reactLayer = findLayer(await resolvePreset({
      react: {
        compiler: true,
        overrides: { "react-hooks/purity": 0 },
      },
    }), "pawover/react/rules");

    expect(reactLayer?.rules?.["react-hooks/purity"]).toBe(0);
  });

  it("should match every official recommended react-hooks rule", async () => {
    const reactLayer = findLayer(await resolvePreset({ react: true }), "pawover/react/rules");
    const official = getReactHooksPresetRules("recommended");

    for (const [ruleId, level] of Object.entries(official)) {
      if (!ruleId.startsWith("react-hooks/") || level === undefined) continue;

      const rule = ruleId.slice("react-hooks/".length);
      if ((REACT_HOOKS_CORE_RULES as readonly string[]).includes(rule)) continue;

      expect(reactLayer?.rules?.[ruleId], ruleId).toBe(normalizeRuleLevel(level));
    }
  });

  it("should keep the latest-only rule list in sync with the official preset", async () => {
    const recommended = new Set(Object.keys(getReactHooksPresetRules("recommended")));
    const latestOnly = Object.keys(getReactHooksPresetRules("latest"))
      .filter((ruleId) => !recommended.has(ruleId))
      .map((ruleId) => ruleId.slice("react-hooks/".length));

    expect(latestOnly.sort()).toEqual([...REACT_COMPILER_LATEST_ONLY_RULES].sort());
  });

  it("should reference existing rules on both sides of the mapping", async () => {
    const { plugins } = await import("../../../packages/eslint-rules/src/plugins.ts");
    const reactPlugin = plugins.react as unknown as { rules?: Record<string, unknown> };
    const reactHooksPlugin = plugins.reactHooks as unknown as { rules?: Record<string, unknown> };

    for (const [hooksRule, eslintReactRule] of Object.entries(REACT_COMPILER_RULE_MAP)) {
      expect(reactHooksPlugin.rules).toHaveProperty(hooksRule);
      expect(reactPlugin.rules).toHaveProperty(eslintReactRule);
    }

    for (const rule of REACT_COMPILER_DISABLED_REACT_RULES) {
      expect(reactPlugin.rules).toHaveProperty(rule);
    }
  });
});
