import { describe, expect, it } from "vitest";
import { Linter } from "eslint";
import { builtinRules } from "eslint/use-at-your-own-risk";
import pawover, { GLOB_EXCLUDE, GLOB_TYPESCRIPT } from "@pawover/kit/eslint-rules";
import type { ConfigNames, PawoverOptions } from "@pawover/kit/eslint-rules";

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
