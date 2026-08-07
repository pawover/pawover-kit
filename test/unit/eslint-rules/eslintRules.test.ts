import { describe, expect, it } from "vitest";
import eslintRules from "@pawover/kit/eslint-rules";

const ruleGroups = ["javascript", "typescript", "react", "reactHooks", "vue", "stylistic", "antfu", "imports", "importsSort"] as const;

const severities = [0, 1, 2];

function isSeverity (value: unknown): boolean {
  return typeof value === "number" && severities.includes(value);
}

describe("eslintRules default export", () => {
  it("should export all rule groups, GLOB_EXCLUDE and createRules", () => {
    expect(Object.keys(eslintRules).sort()).toEqual([...ruleGroups, "GLOB_EXCLUDE", "createRules"].sort());
  });

  it("should contain non-empty rule groups with valid severity configs", () => {
    for (const group of ruleGroups) {
      const rules = eslintRules[group];
      expect(Object.keys(rules).length).toBeGreaterThan(0);
      for (const value of Object.values(rules)) {
        if (Array.isArray(value)) {
          expect(isSeverity(value[0])).toBe(true);
        } else {
          expect(isSeverity(value)).toBe(true);
        }
      }
    }
  });
});

describe("GLOB_EXCLUDE", () => {
  it("should contain common exclude patterns", () => {
    expect(eslintRules.GLOB_EXCLUDE).toContain("**/node_modules");
    expect(eslintRules.GLOB_EXCLUDE).toContain("**/dist");
    expect(eslintRules.GLOB_EXCLUDE).toContain("**/coverage");
    expect(eslintRules.GLOB_EXCLUDE.length).toBeGreaterThan(10);
  });
});

describe("createRules", () => {
  it("should return the original rule group without prefix", () => {
    expect(eslintRules.createRules("typescript")).toBe(eslintRules.typescript);
  });

  it("should rewrite the namespace prefix when prefix is provided", () => {
    const rules = eslintRules.createRules("react", "react-hooks");
    const keys = Object.keys(rules);
    expect(keys.length).toBe(Object.keys(eslintRules.react).length);
    expect(keys.every(key => key.startsWith("react-hooks/"))).toBe(true);
    expect(keys.some(key => key.startsWith("react/"))).toBe(false);
    expect(Object.keys(rules)).toContain("react-hooks/exhaustive-deps");
  });

  it("should return an empty object for an unknown rule group", () => {
    // @ts-expect-error — 测试非法规则组
    expect(eslintRules.createRules("unknown")).toEqual({});
  });
});

describe("preset application", () => {
  it("should apply the indent preset to rule groups", () => {
    expect(eslintRules.stylistic["stylistic/indent"]).toEqual([2, 2]);
    expect(eslintRules.antfu["antfu/indent-unindent"]).toEqual([2, { indent: 2, tags: ["$", "unindent", "unIndent"] }]);
  });

  it("should apply the tsMemberOrder preset to ts/member-ordering", () => {
    const config = eslintRules.typescript["ts/member-ordering"] as [2, { default: string[] }];
    expect(config[1].default[0]).toBe("signature");
    expect(config[1].default.length).toBeGreaterThan(50);
  });
});
