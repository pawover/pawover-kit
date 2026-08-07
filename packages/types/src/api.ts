import type { Split, TupleToUnion } from "type-fest";

/** 字母表 */
type ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/** 单个字母 */
type Letter = TupleToUnion<Split<ALPHABET, "">>;
/** 有效字符 */
type ValidChar = Letter | "_";

/**
 * API 命名检查
 *
 * 递归校验命名仅包含大写字母与下划线，并剥离尾随下划线；遇到非法字符时返回空字符串。
 *
 * @template N 待检查的命名
 * @template P 内部递归累计结果（由编译器推导，无需传入）
 *
 * @returns 剥离尾随下划线后的合法命名；包含非法字符时为 `""`
 *
 * @example
 * ```ts
 * type A = ApiNameCheck<"GET_USER">; // "GET_USER"
 * type B = ApiNameCheck<"GET_USER_">; // "GET_USER"（尾随下划线被剥离）
 * type C = ApiNameCheck<"getUser">; // ""（小写字符非法）
 * ```
 */
type ApiNameCheck<N extends string, P extends string = ""> = N extends `${infer L extends ValidChar}${infer R}`
  ? ApiNameCheck<R, `${P}${L}`>
  : P extends `${infer S}_`
    ? S
    : P;

export type { ApiNameCheck };
