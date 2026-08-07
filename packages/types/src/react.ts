import type { ReactNode, RefObject } from "react";

/**
 * 只读 Props 类型
 *
 * 将任意属性集合转换为只读的组件 Props 类型。
 *
 * @template P 属性集合
 *
 * @example
 * ```ts
 * interface MyProps {
 *   title: string;
 * }
 * const props: Props<MyProps> = { title: "hello" };
 * // props.title = "x"; // ❌ 只读，无法修改
 * ```
 */
export type Props<P = unknown> = Readonly<P>;

/**
 * 含 children 的只读 Props 类型
 *
 * 在只读 Props 基础上增加可选的 `children` 属性。
 *
 * @template P 属性集合
 *
 * @example
 * ```ts
 * interface MyProps {
 *   title: string;
 * }
 * const props: PropsWithChildren<MyProps> = {
 *   title: "hello",
 *   children: <span>content</span>,
 * };
 * ```
 */
export type PropsWithChildren<P = unknown> = Readonly<P> & { readonly children?: ReactNode | undefined };

/**
 * 含 ref 的只读 Props 类型
 *
 * 在只读 Props 基础上增加可选的 `ref` 属性。
 *
 * @template P 属性集合
 * @template R ref 指向的 DOM 元素类型
 *
 * @example
 * ```ts
 * interface MyProps {
 *   title: string;
 * }
 * const props: PropsWithRef<MyProps, HTMLDivElement> = {
 *   title: "hello",
 *   ref: useRef<HTMLDivElement>(null),
 * };
 * ```
 */
export type PropsWithRef<P = unknown, R = unknown> = Readonly<P> & { readonly ref?: RefObject<R> | undefined };
