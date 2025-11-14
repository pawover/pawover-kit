import type { SetOptional } from "type-fest";
import { treeForEach, type TreeForeachOptions } from "./treeForEach";
import type { ChildrenKey } from "./types";

type TreeToRowsOptions<T extends AnyObject, CK extends string = ChildrenKey> = TreeForeachOptions<T, CK>;

/**
 * 树结构 转 行结构
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
