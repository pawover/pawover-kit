import preset from "./preset.js";

export default {
  /**
   * @desc 强制链式成员访问的换行风格保持一致
   * @descEN Enforce consistent line breaks for chaining member access
   * @see https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/consistent-chaining.md
   */
  "antfu/consistent-chaining": 2,
  /**
   * @desc 强制括号和圆括号内部的换行风格保持一致
   * @descEN Enforce consistent line breaks inside braces and parentheses
   * @see https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/consistent-list-newline.md
   */
  "antfu/consistent-list-newline": 2,
  /**
   * @desc 个人偏好的花括号规则，允许单行同时使用两种风格
   * @descEN Opinionated curly bracket enforcement that allows both styles on one-liners
   * @see https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/curly.md
   */
  "antfu/curly": 0,
  /**
   * @desc 强制 if 语句与其后续表达式之间换行
   * @descEN Enforce a newline between `if` and its consequent
   * @see https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/if-newline.md
   */
  "antfu/if-newline": 2,
  /**
   * @desc 自动去重来自同一来源的具名导入
   * @descEN Auto-fix duplicate named imports from the same source
   * @see https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/import-dedupe.md
   */
  "antfu/import-dedupe": 2,
  /**
   * @desc 强制 `unindent` 模板字符串标签内的缩进风格保持一致
   * @descEN Enforce consistent indentation inside `unindent` tagged template strings
   * @see https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/indent-unindent.md
   */
  "antfu/indent-unindent": [2, { indent: preset.indent, tags: ["$", "unindent", "unIndent"] }],
  /**
   * @desc 禁止从本地 dist 文件夹导入
   * @descEN Prevent importing from a local `dist` folder
   * @see https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/no-import-dist.md
   */
  "antfu/no-import-dist": 2,
  /**
   * @desc 禁止通过相对或绝对路径从 node_modules 导入
   * @descEN Prevent importing from `node_modules` by relative or absolute path
   * @see https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/no-import-node-modules-by-path.md
   */
  "antfu/no-import-node-modules-by-path": 2,
  /**
   * @desc 禁止顶层 await
   * @descEN Prevent top-level `await`
   * @see https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/no-top-level-await.md
   */
  "antfu/no-top-level-await": 0,
  /**
   * @desc 禁止使用 TypeScript 的 export = 语法
   * @descEN Disallow TypeScript's `export =` syntax
   * @see https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/no-ts-export-equal.md
   */
  "antfu/no-ts-export-equal": 2,
  /**
   * @desc 强制顶层函数使用 function 关键字声明
   * @descEN Enforce top-level functions to be declared with the `function` keyword
   * @see https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/top-level-function.md
   */
  "antfu/top-level-function": 2,
};
