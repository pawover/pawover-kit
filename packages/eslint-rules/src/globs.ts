/**
 * 全部源文件（js / cjs / mjs / jsx / ts / tsx）
 *
 * 各规则组共享的基础文件范围；启用 `vue` 时工厂会在其后追加 {@link GLOB_VUE}。
 *
 * @example
 * ```ts
 * import { GLOB_SOURCE, GLOB_VUE } from "@pawover/kit-eslint-rules";
 *
 * const files = [...GLOB_SOURCE, GLOB_VUE];
 * ```
 */
const GLOB_SOURCE = ["**/*.{js,cjs,mjs,jsx,ts,tsx}"];

/**
 * TypeScript 源文件（ts / tsx）
 *
 * 类型感知规则与 TypeScript parser 的默认作用范围；后置覆盖 `ts/*` 类型感知规则时应使用该常量限定 `files`。
 *
 * @example
 * ```ts
 * import { GLOB_TYPESCRIPT } from "@pawover/kit-eslint-rules";
 *
 * const files = GLOB_TYPESCRIPT;
 * ```
 */
const GLOB_TYPESCRIPT = ["**/*.{ts,tsx}"];

/**
 * Vue 单文件组件
 *
 * @example
 * ```ts
 * import { GLOB_VUE } from "@pawover/kit-eslint-rules";
 *
 * const files = [GLOB_VUE];
 * ```
 */
const GLOB_VUE = "**/*.vue";

/**
 * JSX 组件文件
 *
 * react 的 type-aware 规则在启用 `typescript` 时作用于 jsx；类型是否可用由项目 tsconfig 的 include / allowJs 决定。
 *
 * @example
 * ```ts
 * import { GLOB_JSX } from "@pawover/kit-eslint-rules";
 *
 * const files = [GLOB_JSX];
 * ```
 */
const GLOB_JSX = "**/*.jsx";

export { GLOB_JSX, GLOB_SOURCE, GLOB_TYPESCRIPT, GLOB_VUE };
