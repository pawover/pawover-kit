import { describe, expect, it } from "vitest";
import { Linter } from "eslint";
import { builtinRules } from "eslint/use-at-your-own-risk";
import pawover, { GLOB_EXCLUDE } from "@pawover/kit/eslint-rules";

const ALL_OPTIONS = {
  typescript: true,
  stylistic: true,
  antfu: true,
  imports: true,
  importsSort: true,
  react: true,
  vue: true,
} as const;

function collectRuleIds (configs: Linter.Config[]): string[] {
  return configs.flatMap(config => Object.keys(config.rules ?? {}));
}

/**
 * 黑盒校验：遍历预设产物中每层 rules 引用的规则，
 * 带命名空间的规则必须存在于本层注册的插件，无命名空间的必须存在于 ESLint 内置规则表。
 */
function findUnresolvedRules (configs: Linter.Config[]): string[] {
  const unresolved: string[] = [];

  for (const config of configs) {
    for (const ruleId of Object.keys(config.rules ?? {})) {
      const separatorIndex = ruleId.indexOf("/");

      if (separatorIndex === -1) {
        if (!builtinRules.has(ruleId)) unresolved.push(ruleId);
        continue;
      }

      const pluginName = ruleId.slice(0, separatorIndex);
      const ruleName = ruleId.slice(separatorIndex + 1);
      const plugin = config.plugins?.[pluginName];

      if (!plugin) {
        unresolved.push(ruleId);
      } else if (!Object.hasOwn(plugin.rules ?? {}, ruleName)) {
        unresolved.push(ruleId);
      }
    }
  }

  return unresolved;
}

describe("pawover default export", () => {
  it("should keep GLOB_EXCLUDE with common exclude patterns", () => {
    expect(GLOB_EXCLUDE).toContain("**/node_modules");
    expect(GLOB_EXCLUDE).toContain("**/dist");
    expect(GLOB_EXCLUDE).toContain("**/coverage");
    expect(GLOB_EXCLUDE.length).toBeGreaterThan(10);
  });

  it("should return only ignores layer and javascript layer for the default call", () => {
    const configs = pawover();

    expect(configs).toHaveLength(2);
    expect(configs[0]?.ignores).toEqual(GLOB_EXCLUDE);
    expect(Object.keys(configs[1]?.rules ?? {}).length).toBeGreaterThan(100);
    expect(configs[1]?.plugins).toBeUndefined();
  });

  it("should register every enabled group plugin with the same name as its rule prefix", () => {
    const configs = pawover(ALL_OPTIONS);
    const pluginNames = new Set(configs.flatMap(config => Object.keys(config.plugins ?? {})));

    expect(pluginNames).toEqual(new Set(["ts", "stylistic", "antfu", "imports", "importsSort", "react", "react-hooks", "vue"]));
  });

  it("should resolve every rule referenced by the fully enabled preset", () => {
    expect(findUnresolvedRules(pawover(ALL_OPTIONS))).toEqual([]);
  });

  it("should resolve every rule referenced by the default preset", () => {
    expect(findUnresolvedRules(pawover())).toEqual([]);
  });

  it("should not contain the removed @eslint-react debug rules", () => {
    const ruleIds = collectRuleIds(pawover({ react: true }));

    expect(ruleIds.some(ruleId => ruleId.includes("debug-"))).toBe(false);
  });
});

describe("file patterns", () => {
  it("should include vue files in shared layers when vue is enabled", () => {
    const configs = pawover({ vue: true });

    expect(configs[1]?.files).toContain("**/*.vue");
  });

  it("should exclude vue files from shared layers by default", () => {
    const configs = pawover();

    expect(configs[1]?.files).not.toContain("**/*.vue");
  });

  it("should exclude vue files from the react layer even when vue is enabled", () => {
    const configs = pawover(ALL_OPTIONS);
    const reactLayer = configs.find(config => config.plugins?.["react"]);

    expect(reactLayer?.files).toEqual(["**/*.{js,cjs,mjs,jsx,ts,tsx}"]);
  });

  it("should restrict typescript rules to ts/tsx files", () => {
    const configs = pawover({ typescript: true });
    const typescriptLayer = configs.find(config => config.plugins?.["ts"]);

    expect(typescriptLayer?.files).toEqual(["**/*.{ts,tsx}"]);
  });

  it("should extend typescript rules to vue files when both are enabled", () => {
    const configs = pawover({ typescript: true, vue: true });
    const typescriptLayer = configs.find(config => config.plugins?.["ts"]);

    expect(typescriptLayer?.files).toEqual(["**/*.{ts,tsx}", "**/*.vue"]);
  });
});

describe("typescript parser", () => {
  it("should apply the typescript parser to ts/tsx files with projectService by default", () => {
    const configs = pawover({ typescript: true });
    const parserLayer = configs.find(config => config.languageOptions?.parser);

    expect(parserLayer?.files).toEqual(["**/*.{ts,tsx}"]);
    expect(parserLayer?.languageOptions?.parserOptions).toMatchObject({ projectService: true });
  });

  it("should keep js files out of the typescript project service", () => {
    const linter = new Linter({ configType: "flat" });
    const configs = pawover({ typescript: true }).filter(config => !config.ignores);
    const messages = linter.verify("export const answer = 42;", configs, { filename: "helper.js" });

    expect(messages.filter(message => message.fatal)).toEqual([]);
  });

  it("should keep plain js files out of the project service even with react enabled", () => {
    const linter = new Linter({ configType: "flat" });
    const configs = pawover({ typescript: true, react: true }).filter(config => !config.ignores);
    const messages = linter.verify("export const util = 42;", configs, { filename: "util.js" });

    expect(messages.filter(message => message.fatal)).toEqual([]);
  });

  it("should extend the typescript parser to jsx files when react is enabled", () => {
    const configs = pawover({ typescript: true, react: true });
    const parserLayer = configs.find(config => config.languageOptions?.parser);

    expect(parserLayer?.files).toEqual(["**/*.{ts,tsx}", "**/*.jsx"]);
  });

  it("should let parserOptions override the defaults", () => {
    const configs = pawover({
      typescript: true,
      parserOptions: { projectService: false, tsconfigRootDir: "/repo" },
    });
    const parserLayer = configs.find(config => config.languageOptions?.parser);

    expect(parserLayer?.languageOptions?.parserOptions).toMatchObject({
      projectService: false,
      tsconfigRootDir: "/repo",
    });
  });

  it("should forward the typescript parser to vue SFC script blocks", () => {
    const configs = pawover({ typescript: true, vue: true });
    const vueLayer = configs.find(config => config.plugins?.["vue"]);

    expect(vueLayer?.languageOptions?.parserOptions).toMatchObject({ parser: expect.anything() });
  });

  it("should not set a script parser for vue when typescript is disabled", () => {
    const configs = pawover({ vue: true });
    const vueLayer = configs.find(config => config.plugins?.["vue"]);

    expect(vueLayer?.languageOptions?.parserOptions).toEqual({});
  });
});

describe("layer composition", () => {
  it("should merge react and react-hooks rules into a single react layer", () => {
    const configs = pawover({ react: true });
    const reactLayer = configs.find(config => config.plugins?.["react"]);
    const ruleIds = Object.keys(reactLayer?.rules ?? {});

    expect(ruleIds.some(ruleId => ruleId.startsWith("react/"))).toBe(true);
    expect(ruleIds.some(ruleId => ruleId.startsWith("react-hooks/"))).toBe(true);
  });

  it("should add one layer per enabled group", () => {
    const defaultLayers = pawover().length;
    const fullLayers = pawover(ALL_OPTIONS).length;
    const typescriptOnlyLayers = pawover({ typescript: true }).length;

    expect(defaultLayers).toBe(2);
    expect(typescriptOnlyLayers).toBe(4);
    expect(fullLayers).toBe(11);
  });
});

describe("react type-aware fallback", () => {
  it("should disable type-aware react rules when typescript is not enabled", () => {
    const configs = pawover({ react: true });
    const reactLayer = configs.find(config => config.plugins?.["react"]);

    expect(reactLayer?.rules?.["react/no-implicit-key"]).toBe(0);
    expect(reactLayer?.rules?.["react/no-implicit-ref"]).toBe(0);
    expect(reactLayer?.rules?.["react/no-leaked-conditional-rendering"]).toBe(0);
    expect(reactLayer?.rules?.["react/no-unused-props"]).toBe(0);
  });

  it("should keep type-aware react rules when typescript is enabled", () => {
    const configs = pawover({ react: true, typescript: true });
    const typeAwareLayer = configs.find(config => config.rules?.["react/no-implicit-key"] === 1);

    expect(typeAwareLayer?.rules?.["react/no-implicit-key"]).toBe(1);
    expect(typeAwareLayer?.rules?.["react/no-leaked-conditional-rendering"]).toBe(2);
  });

  it("should mirror every rule listed in the plugin disable-type-checked config", async () => {
    const { plugins } = await import("../../../packages/eslint-rules/src/plugins.ts");
    const reactPlugin = plugins.react as unknown as {
      configs: Record<string, { rules?: Record<string, unknown> }>;
    };
    const typeCheckedRules = Object.keys(reactPlugin.configs["disable-type-checked"]?.rules ?? {})
      .filter(ruleId => ruleId.startsWith("@eslint-react/"))
      .map(ruleId => ruleId.replace("@eslint-react/", "react/"));
    const configs = pawover({ react: true });
    const reactLayer = configs.find(config => config.plugins?.["react"]);

    expect(typeCheckedRules.length).toBeGreaterThan(0);
    for (const ruleId of typeCheckedRules) {
      expect(reactLayer?.rules?.[ruleId]).toBe(0);
    }
  });

  it("should stub type-aware react rules only when typescript is not enabled", () => {
    const withoutTypescript = pawover({ react: true })
      .find(config => config.plugins?.["react"])?.plugins?.["react"];
    const withTypescript = pawover({ react: true, typescript: true })
      .find(config => config.plugins?.["react"])?.plugins?.["react"];
    const stubRule = withoutTypescript?.rules?.["no-implicit-key"] as { create: () => unknown } | undefined;
    const originalRule = withTypescript?.rules?.["no-implicit-key"] as { create: (context: never) => unknown } | undefined;

    expect(stubRule).toBeDefined();
    expect(originalRule).toBeDefined();
    // 无 typescript：注册 no-op 实现（安全调用、返回空监听器）
    expect(stubRule?.create()).toEqual({});
    // 有 typescript：保留原实现（直接调用缺少 RuleContext 会抛错）
    expect(() => originalRule?.create(undefined as never)).toThrow();
  });

  it("should scope type-aware react rules to ts/tsx/jsx files when typescript is enabled", () => {
    const configs = pawover({ react: true, typescript: true });
    const typeAwareLayer = configs.find(config => config.rules?.["react/no-implicit-key"] === 1);
    const baseLayer = configs.find(config => config.plugins?.["react-hooks"]);

    expect(typeAwareLayer?.files).toEqual(["**/*.{ts,tsx}", "**/*.jsx"]);
    expect(baseLayer?.rules?.["react/no-implicit-key"]).toBeUndefined();
    expect(baseLayer?.rules?.["react/error-boundaries"]).toBeDefined();
  });

  it("should stay quiet when a type-aware rule is force-enabled without typescript", () => {
    const linter = new Linter({ configType: "flat" });
    const configs = pawover({ react: true }).filter(config => !config.ignores);
    const messages = linter.verify(
      "export const App = () => <div key={1} />;",
      [...configs, { rules: { "react/no-implicit-key": 2, "react/no-implicit-children": 2 } }],
      { filename: "app.jsx" },
    );

    expect(messages.filter(message => message.fatal || message.message.includes("type information"))).toEqual([]);
    expect(messages.filter(message => message.ruleId === "react/no-implicit-key" || message.ruleId === "react/no-implicit-children")).toEqual([]);
  });
});
