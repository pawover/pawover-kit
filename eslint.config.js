// @ts-nocheck
import eslintPluginReact from "@eslint-react/eslint-plugin";
import eslintRules from "@pawover/eslint-rules";
import eslintPluginStylistic from "@stylistic/eslint-plugin";
import eslintPluginAntfu from "eslint-plugin-antfu";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

import { defineConfig } from "eslint/config";
import eslintTs from "typescript-eslint";

const plugins = {
  ts: {
    ts: eslintTs.plugin,
  },
  stylistic: {
    stylistic: eslintPluginStylistic,
  },
  antfu: {
    antfu: eslintPluginAntfu,
  },
  react: {
    "react-x": eslintPluginReact.configs.all.plugins["@eslint-react"],
    "react-dom": eslintPluginReact.configs.all.plugins["@eslint-react/dom"],
    "react-rsc": eslintPluginReact.configs.all.plugins["@eslint-react/rsc"],
    "react-web-api": eslintPluginReact.configs.all.plugins["@eslint-react/web-api"],
    "react-hooks": eslintPluginReactHooks,
    "react-naming-convention": eslintPluginReact.configs.all.plugins["@eslint-react/naming-convention"],
  },
};
const GLOB_EXCLUDE = [
  "**/node_modules",
  "**/dist",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/pnpm-lock.yaml",
  "**/bun.lockb",
  "**/output",
  "**/coverage",
  "**/temp",
  "**/.temp",
  "**/tmp",
  "**/.tmp",
  "**/.history",
  "**/.vitepress/cache",
  "**/.nuxt",
  "**/.next",
  "**/.svelte-kit",
  "**/.vercel",
  "**/.changeset",
  "**/.idea",
  "**/.cache",
  "**/.output",
  "**/.vite-inspect",
  "**/.yarn",
  "**/vite.config.*.timestamp-*",
  "**/CHANGELOG*.md",
  "**/*.min.*",
  "**/LICENSE*",
  "**/__snapshots__",
  "**/auto-import?(s).d.ts",
  "**/auto-component?(s).d.ts",
  "**/auto-router?(s).d.ts",
  "routeTree.gen.ts",
];

export default defineConfig([
  {
    ignores: GLOB_EXCLUDE,
  },
  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: false,
        },
      },
    },
    plugins: {
      ...plugins.stylistic,
      ...plugins.antfu,
    },
    rules: {
      ...eslintRules.javascript,
      ...eslintRules.stylistic,
      ...eslintRules.antfu,
    },
  },
  {
    files: ["**/*.{ts,cts,mts,tsx}"],
    languageOptions: {
      parser: eslintTs.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      ...plugins.ts,
      ...plugins.react,
      ...plugins.stylistic,
      ...plugins.antfu,
    },
    rules: {
      ...eslintRules.javascript,
      ...eslintRules.typescript,
      ...eslintRules.react,
      ...eslintRules.reactRefresh,
      ...eslintRules.stylistic,
      ...eslintRules.antfu,
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.test.json",
        projectService: false,
      },
    },
    rules: {
      "func-names": 0,
      "no-promise-executor-return": 0,
      "prefer-arrow-callback": 0,
      "stylistic/quote-props": 0,
      "ts/no-array-constructor": 0,
      "ts/no-confusing-void-expression": 0,
      "ts/no-explicit-any": 0,
      "ts/no-unused-expressions": 0,
      "ts/no-unused-vars": 0,
    },
  },
]);
