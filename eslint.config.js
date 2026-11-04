// @ts-nocheck
import pawover from "@pawover/kit-eslint-rules";

const preset = pawover({
  typescript: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
  stylistic: true,
  antfu: true,
  imports: true,
  react: true,
});

// 测试文件中禁用全部预设规则：从预设产物反推规则清单
const allRules = {};
for (const config of await preset) {
  Object.assign(allRules, config.rules);
}
const offTestFiles = Object.fromEntries(Object.keys(allRules).map((rule) => [rule, 0]));

export default preset.append(
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
    files: ["**/*.type.ts", "**/*.test.ts"],
    rules: {
      "antfu/reasonable-newline": [
        2,
        {
          minObjectProperties: 4,
          objectLineLength: 240,
          minArrayItems: 4,
          arrayLineLength: 240,
        },
      ],
    },
  },
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.test.type.ts"],
    rules: offTestFiles,
  },
);
