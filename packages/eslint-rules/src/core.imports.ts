export default {
  /**
   * @desc 强制类型导入的标记风格保持一致（顶级或内联）
   * @descEN Enforce consistent style for type-only import specifiers (top-level vs inline)
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/consistent-type-specifier-style/README.md
   */
  "imports/consistent-type-specifier-style": [2, "prefer-top-level"],
  /**
   * @desc 确保所有导出语句都在文件末尾
   * @descEN Ensure all exports are declared at the bottom of the file
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/exports-last/README.md
   */
  "imports/exports-last": 0,
  /**
   * @desc 确保所有 import 语句在文件顶部
   * @descEN Ensure all imports are at the top of the file
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/first/README.md
   */
  "imports/first": 2,
  /**
   * @desc 强制在最后一个 import 或 require 语句后留有空行
   * @descEN Enforce one or more empty lines after the last top-level import or require
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/newline-after-import/README.md
   */
  "imports/newline-after-import": [2, { count: 1 }],
  /**
   * @desc 禁止使用默认导出
   * @descEN Disallow default exports
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/no-default-export/README.md
   */
  "imports/no-default-export": 0,
  /**
   * @desc 禁止重复导入同一模块
   * @descEN Disallow duplicate imports from the same module
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/no-duplicates/README.md
   */
  "imports/no-duplicates": 2,
  /**
   * @desc 禁止使用 var 或 let 导出可变绑定
   * @descEN Forbid mutable exports using `var` or `let`
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/no-mutable-exports/README.md
   */
  "imports/no-mutable-exports": 2,
  /**
   * @desc 禁止将默认导入作为具名导入使用
   * @descEN Disallow named import of default exports
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/no-named-default/README.md
   */
  "imports/no-named-default": 2,
  /**
   * @desc 优先使用默认导出而非具名导出
   * @descEN Prefer default export over named export
   * @see https://github.com/9romise/eslint-plugin-import-lite/blob/main/src/rules/prefer-default-export/README.md
   */
  "imports/prefer-default-export": 0,
};
