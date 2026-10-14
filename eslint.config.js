// @ts-nocheck
import { defineConfig } from "eslint/config";

import pawover from "@pawover/kit-eslint-rules";

const preset = pawover({
  typescript: true,
  stylistic: true,
  antfu: true,
  imports: true,
  react: true,
  parserOptions: {
    tsconfigRootDir: import.meta.dirname,
  },
});

// 测试文件中禁用全部预设规则：从预设产物反推规则清单
const allRules = {};
for (const config of preset) {
  Object.assign(allRules, config.rules);
}
const offTestFiles = Object.fromEntries(Object.keys(allRules).map((rule) => [rule, 0]));

export default defineConfig([
  ...preset,
  {
    ignores: ["entry/**", "site/**", "docs/**"],
  },
  {
    files: ["**/*.{js,cjs,mjs,jsx,ts,tsx}"],
    rules: {
      "antfu/no-import-dist": 0,
      "ts/no-explicit-any": 0,
    },
  },
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.test.type.ts"],
    rules: offTestFiles,
  },
]);
