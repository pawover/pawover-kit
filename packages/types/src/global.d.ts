/**
 * 全局类型入口（`@pawover/kit-types/global`）
 *
 * 声明全部基础类型的全局投影，填入 tsconfig `types` 数组即可全局使用：
 * ```json
 * { "compilerOptions": { "types": ["@pawover/kit-types/global"] } }
 * ```
 *
 * 本文件为手写声明文件（唯一维护点）：类型一律引用模块版（`./index`）的定义，签名变更自动跟随；
 * 构建时由 tsdown `copy` 原样拷贝至 `dist/`（相对引用在 src 与 dist 同目录下恒成立），不经打包器重写。
 * 文件经 `export {}` 标记为模块，使 `declare global` 生效；模块导入入口（`@pawover/kit-types`）不受影响。
 */

import type * as KitTypes from "./index.js";

declare global {
  /**
   * 原始类型
   *
   * TypeScript 中的全部原始值类型集合。
   *
   * @example
   * ```ts
   * const a: Primitive = "str";
   * const b: Primitive = 42;
   * const c: Primitive = null;
   * ```
   */
  type Primitive = KitTypes.Primitive;

  /**
   * 空值类型
   *
   * `null` 与 `undefined` 的联合类型，用于表示「无值」语义。
   *
   * @example
   * ```ts
   * const a: Nullish = null;
   * const b: Nullish = undefined;
   * ```
   */
  type Nullish = KitTypes.Nullish;

  /**
   * 任意对象类型
   *
   * 以索引签名描述任意键值对对象，键类型默认为 `PropertyKey`，值类型默认为 `any`。
   *
   * @template K 键类型
   * @template T 值类型
   *
   * @example
   * ```ts
   * const obj: AnyObject = { a: 1, b: "2" };
   * const numObj: AnyObject<"id", number> = { id: 1 };
   * ```
   */
  type AnyObject<K extends PropertyKey = PropertyKey, T = any> = KitTypes.AnyObject<K, T>;

  /**
   * 普通对象类型
   *
   * 以索引签名描述普通对象，值类型默认为 `unknown`，比 `AnyObject` 更严格。
   *
   * @template K 键类型
   * @template T 值类型
   *
   * @example
   * ```ts
   * const obj: PlainObject = { a: 1 };
   * const strMap: PlainObject<string, string> = { key: "value" };
   * ```
   */
  type PlainObject<K extends PropertyKey = PropertyKey, T = unknown> = KitTypes.PlainObject<K, T>;

  /**
   * 描述树类型
   *
   * 递归结构：每个节点都包含子树节点数组（子节点键名默认为 `children`）。
   *
   * @template T 节点基础类型（需为对象类型）
   * @template CK 子节点键名
   *
   * @example
   * ```ts
   * interface Node {
   *   id: number;
   *   name: string;
   * }
   * const tree: TreeLike<Node> = {
   *   id: 1,
   *   name: "root",
   *   children: [{ id: 2, name: "leaf", children: [] }],
   * };
   * ```
   */
  type TreeLike<T extends AnyObject, CK extends string = "children"> = KitTypes.TreeLike<T, CK>;

  /**
   * 描述可选子节点树类型
   *
   * 递归结构：每个节点都可省略子节点键（子节点键名默认为 `children`）。
   *
   * @template T 节点基础类型（需为对象类型）
   * @template CK 子节点键名
   *
   * @example
   * ```ts
   * interface Node {
   *   id: number;
   *   name: string;
   * }
   * const leaf: TreeLikeOptionalChildren<Node> = { id: 2, name: "leaf" };
   * const root: TreeLikeOptionalChildren<Node> = {
   *   id: 1,
   *   name: "root",
   *   children: [leaf],
   * };
   * ```
   */
  type TreeLikeOptionalChildren<T extends AnyObject, CK extends string = "children"> = KitTypes.TreeLikeOptionalChildren<T, CK>;

  /**
   * 描述函数类型
   *
   * 任意参数与任意返回值的函数类型。
   *
   * @template P 参数元组类型
   * @template R 返回值类型
   *
   * @example
   * ```ts
   * const fn: AnyFunction = (a, b) => a + b;
   * const strFn: AnyFunction<[string], string> = (s) => s.toUpperCase();
   * ```
   */
  type AnyFunction<P extends any[] = any[], R = any> = KitTypes.AnyFunction<P, R>;

  /**
   * 描述异步函数类型
   *
   * 任意参数且返回 Promise 的函数类型。
   *
   * @template P 参数元组类型
   * @template R 返回值类型
   *
   * @example
   * ```ts
   * const fn: AnyAsyncFunction = async () => {};
   * const fetchFn: AnyAsyncFunction<[string], number> = async (url) => (await fetch(url)).status;
   * ```
   */
  type AnyAsyncFunction<P extends any[] = any[], R = any> = KitTypes.AnyAsyncFunction<P, R>;

  /**
   * 描述生成器函数类型
   *
   * 任意参数且返回 Generator 的函数类型。
   *
   * @template P 参数元组类型
   * @template T 产出值类型
   * @template R 返回值类型
   * @template N 下一传入值类型
   *
   * @example
   * ```ts
   * const fn: AnyGeneratorFunction<[], number> = function* () {
   *   yield 1;
   * };
   * ```
   */
  type AnyGeneratorFunction<P extends any[] = any[], T = any, R = any, N = any> = KitTypes.AnyGeneratorFunction<P, T, R, N>;

  /**
   * 描述异步生成器函数类型
   *
   * 任意参数且返回 AsyncGenerator 的函数类型。
   *
   * @template P 参数元组类型
   * @template T 产出值类型
   * @template R 返回值类型
   * @template N 下一传入值类型
   *
   * @example
   * ```ts
   * const fn: AnyAsyncGeneratorFunction<[], number> = async function* () {
   *   yield 1;
   * };
   * ```
   */
  type AnyAsyncGeneratorFunction<P extends any[] = any[], T = any, R = any, N = any> = KitTypes.AnyAsyncGeneratorFunction<P, T, R, N>;

  /**
   * 判断是否为原始类型
   *
   * 若 `T` 为原始类型则结果为 `true`，否则为 `false`。
   *
   * @template T 待判断的类型
   *
   * @example
   * ```ts
   * type A = IsPrimitive<string>; // true
   * type B = IsPrimitive<{ a: 1 }>; // false
   * ```
   */
  type IsPrimitive<T> = KitTypes.IsPrimitive<T>;

  /**
   * 判断是否具有索引签名
   *
   * 若 `T` 可被字符串索引（具有 string 索引签名）则结果为 `true`，否则为 `false`。
   *
   * @template T 待判断的类型
   *
   * @example
   * ```ts
   * type A = HasStringIndex<Record<string, number>>; // true
   * type B = HasStringIndex<{ a: 1 }>; // false
   * ```
   */
  type HasStringIndex<T> = KitTypes.HasStringIndex<T>;

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
  type AdvancedRecordMode = KitTypes.AdvancedRecordMode;

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
  type AdvancedRecord<K extends PropertyKey, A = unknown, mode extends AdvancedRecordMode = ["!", "W"]> = KitTypes.AdvancedRecord<K, A, mode>;

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
  type ApiNameCheck<N extends string, P extends string = ""> = KitTypes.ApiNameCheck<N, P>;
}

export {};
