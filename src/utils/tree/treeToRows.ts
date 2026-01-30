import type { AnyObject } from "@pawover/types";
import type { SetOptional } from "type-fest";
import { treeForEach, type TreeForeachOptions } from "./treeForEach";
import type { ChildrenKey } from "./types";

type TreeToRowsOptions<T extends AnyObject, CK extends string = ChildrenKey> = TreeForeachOptions<T, CK>;

/**
 * 树结构 转 行结构
 * - 将树形结构扁平化为数组
 *
 * @param tree 树结构数据 (单个节点或节点数组)
 * @param options 配置项
 * @returns 扁平化后的数组
 * @example
 * ```ts
 * const tree = [{ id: 1, children: [{ id: 2 }] }];
 * treeToRows(tree);
 * // [{ id: 1, children: undefined }, { id: 2, children: undefined }]
 * ```
 */
export function treeToRows<
  T extends AnyObject,
  CK extends string = ChildrenKey,
  R extends AnyObject = SetOptional<T, CK>,
>(tree: T | T[], options: TreeToRowsOptions<T, CK> = {}): R[] {
  const { childrenKey = "children" } = options;
  const result: R[] = [];

  if (!tree) {
    return result;
  }

  treeForEach(tree, (t) => result.push({ ...t, [childrenKey]: undefined }), options);

  return result;
}
