/**
 * `importsSort` 规则组配置
 *
 * 规则名 → 严重级别/配置的映射，聚合进包根默认导出（`eslintRules.importsSort` / `createRules("importsSort")`）。
 *
 * @example
 * ```ts
 * import { rules } from "@pawover/kit-eslint-rules/src/core.importsSort";
 * ```
 */
const rules = {
  "importsSort/imports": 2,
  "importsSort/exports": 2,
};

export { rules };
export default rules;
