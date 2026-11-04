/**
 * `importsSort` 规则组配置
 *
 * 规则名 → 严重级别/配置的映射：`importsSort` 组经预设工厂（`src/config.ts`）装配进 flat config，注册名 `importsSort`。
 */
const rules = {
  "importsSort/imports": 2,
  "importsSort/exports": 2,
};

export { rules };
export default rules;
