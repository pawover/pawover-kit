// @ts-nocheck
import { defineConfig } from "eslint/config";

import eslintTs from "typescript-eslint";
import eslintPluginStylistic from "@stylistic/eslint-plugin";
import eslintPluginAntfu from "eslint-plugin-antfu";
import eslintPluginImports from "eslint-plugin-import-lite";
import eslintPluginImportsSort from "eslint-plugin-simple-import-sort";
import eslintPluginReact from "@eslint-react/eslint-plugin";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

import eslintRules from "@pawover/eslint-rules";

const plugins = {
  typescript: {
    ts: eslintTs.plugin,
  },
  stylistic: {
    stylistic: eslintPluginStylistic,
  },
  antfu: {
    antfu: eslintPluginAntfu,
  },
  imports: {
    imports: eslintPluginImports.configs.all.plugins["import-lite"],
    importsSort: eslintPluginImportsSort,
  },
  react: {
    "react": eslintPluginReact,
    "react-hooks": eslintPluginReactHooks,
  },
};

export default defineConfig([
  {
    ignores: [...eslintRules.GLOB_EXCLUDE, "eslint.config.js", "**/.cache"],
  },
  {
    files: ["**/*.{js,cjs,mjs,jsx,ts,tsx}"],
    languageOptions: {
      parser: eslintTs.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      ...plugins.typescript,
      ...plugins.stylistic,
      ...plugins.antfu,
      ...plugins.imports,
      ...plugins.react,
    },
    rules: {
      ...eslintRules.javascript,
      ...eslintRules.typescript,
      ...eslintRules.stylistic,
      ...eslintRules.antfu,
      ...eslintRules.imports,
      ...eslintRules.importsSort,
      ...eslintRules.react,
      ...eslintRules.reactHooks,
      "antfu/no-import-dist": 0,
      "stylistic/no-multiple-empty-lines": [2, { max: 1, maxEOF: 1, maxBOF: 0 }],
    },
  },
  {
    files: ["**/*.test.{js,jsx,ts,tsx}"],
    rules: {
      ...Object.keys({
        ...eslintRules.javascript,
        ...eslintRules.typescript,
        ...eslintRules.react,
        ...eslintRules.reactHooks,
      }).reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {}),
    },
  },
]);
