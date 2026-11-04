/**
 * React 全局类型入口（`@pawover/kit-types/react/global`）
 *
 * 声明 React Props 类型的全局投影，填入 tsconfig `types` 数组即可全局使用：
 * ```json
 * { "compilerOptions": { "types": ["@pawover/kit-types/react/global"] } }
 * ```
 *
 * 本文件为手写声明文件（唯一维护点）：类型一律引用模块版（`./react`）的定义，签名变更自动跟随；
 * 构建时由 tsdown `copy` 原样拷贝至 `dist/`（相对引用在 src 与 dist 同目录下恒成立），不经打包器重写。
 * 需要项目已安装 `react` 与 `@types/react`（可选 peer）。
 */

import type * as KitProps from "./react.js";

declare global {
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
  type Props<P = unknown> = KitProps.Props<P>;

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
  type PropsWithChildren<P = unknown> = KitProps.PropsWithChildren<P>;

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
  type PropsWithRef<P = unknown, R = unknown> = KitProps.PropsWithRef<P, R>;
}

export {};
