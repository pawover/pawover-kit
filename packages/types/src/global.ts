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
export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

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
export type AnyObject<K extends PropertyKey = PropertyKey, T = any> = Record<K, T>;

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
export type PlainObject<K extends PropertyKey = PropertyKey, T = unknown> = Record<K, T>;

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
export type TreeLike<T extends AnyObject, CK extends string = "children"> = T & Record<CK, TreeLike<T, CK>[]>;

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
export type TreeLikeOptionalChildren<T extends AnyObject, CK extends string = "children"> = T & { [K in CK]?: TreeLikeOptionalChildren<T, CK>[] };

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
export type AnyFunction<P extends any[] = any[], R = any> = (...arg: P) => R;

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
export type AnyAsyncFunction<P extends any[] = any[], R = any> = (...args: P) => Promise<R>;

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
export type AnyGeneratorFunction<P extends any[] = any[], T = any, R = any, N = any> = (...args: P) => Generator<T, R, N>;

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
export type AnyAsyncGeneratorFunction<P extends any[] = any[], T = any, R = any, N = any> = (...args: P) => AsyncGenerator<T, R, N>;

/**
 * 描述无返回值函数
 *
 * 不接受参数且返回 `void` 的函数类型。
 *
 * @example
 * ```ts
 * const fn: VoidFunction = () => {
 *   console.log("hello");
 * };
 * ```
 */
export type VoidFunction = () => void;

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
export type IsPrimitive<T> = T extends Primitive ? true : false;

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
export type HasStringIndex<T> = string extends keyof T ? true : false;
