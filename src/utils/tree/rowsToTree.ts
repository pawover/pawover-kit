import type { AnyObject, TreeLike } from "@pawover/types";
import { isNull, isUndefined } from "../typeof";
import type { ChildrenKey, ParentIdKey, RowKey } from "./types";

export interface RowsToTreeOptions<
  RK extends string = RowKey,
  PK extends string = ParentIdKey,
  CK extends string = ChildrenKey,
> {
  rowKey?: RK;
  parentIdKey?: PK;
  childrenKey?: CK;
}

/**
 * 行结构 转 树结构
 */
export function rowsToTree<
  T extends AnyObject = AnyObject,
  CK extends string = ChildrenKey,
  R = TreeLike<T, CK>,
  RK extends string = RowKey,
  PK extends string = ParentIdKey,
>(rows: T[], options?: RowsToTreeOptions<RK, PK, CK> | undefined): R[] {
  const { parentIdKey = "parentId", rowKey = "id", childrenKey = "children" } = options || {};
  const result: R[] = [];
  const map = new Map<PropertyKey, T>();

  for (const row of rows) {
    const id = row[rowKey];

    if (!map.get(id)) {
      map.set(id, row);
    }
  }

  for (const row of rows) {
    const parentId = row[parentIdKey];
    const parent = map.get(parentId);

    if (!parent || !parentId) {
      result.push(row);

      continue;
    }

    const siblings = parent[childrenKey];

    if (isNull(siblings) || isUndefined(siblings)) {
      parent[childrenKey] = [row] as T[CK];
    } else if (Array.isArray(siblings)) {
      siblings.push(row);
    } else {
      const message = `The key "${childrenKey.toString()}" in parent item is not an array.`;
      throw new Error(message);
    }
  }

  return result;
}
