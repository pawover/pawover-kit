/**
 * 高级记录模式
 *
 * 由必选/可选标记（`"?"` | `"!"`）与读写权限标记（`"W"` | `"R"`）组成的二元组，用于控制 `AdvancedRecord` 的字段形态。
 *
 * @example
 * ```ts
 * // 必选且可读写
 * const mode: AdvancedRecordMode = ["!", "W"];
 * // 可选且只读
 * const readonlyMode: AdvancedRecordMode = ["?", "R"];
 * ```
 */
export type AdvancedRecordMode = ["?" | "!", "W" | "R"];

/**
 * 高级记录（Advanced Record）
 *
 * 按模式组合生成指定键集合的映射类型，可控制字段的必选/可选与只读/可写。
 *
 * @template K 键集合
 * @template A 值类型
 * @template mode 记录模式（默认必选且可读写）
 *
 * @example
 * ```ts
 * // 默认模式：必选且可读写
 * type A = AdvancedRecord<"id" | "name", string>;
 * // { id: string; name: string }
 *
 * // 可选且只读
 * type B = AdvancedRecord<"id", string, ["?", "R"]>;
 * // { readonly id?: string }
 * ```
 */
export type AdvancedRecord<K extends PropertyKey, A = unknown, mode extends AdvancedRecordMode = ["!", "W"]> = {
  "!": { R: { readonly [P in K]: A }; W: { [P in K]: A } };
  "?": { R: { readonly [P in K]?: A }; W: { [P in K]?: A } };
}[mode[0]][mode[1]];
