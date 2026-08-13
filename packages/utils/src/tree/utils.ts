import type { AnyObject } from "@pawover/kit-types";
import { TypeUtil } from "../type";
import type { BaseCallbackMeta, BaseInnerOptions, ChildrenKey } from "./index.type";

export function getFinalChildrenKey<T, CK extends string> (tree: T, meta: BaseCallbackMeta<T>, options: BaseInnerOptions<T, CK>): CK {
  if (TypeUtil.isFunction(options.getChildrenKey)) {
    const dynamicChildrenKey = options.getChildrenKey(tree, meta);
    if (dynamicChildrenKey && dynamicChildrenKey !== null) {
      return dynamicChildrenKey;
    }
  }

  return options.childrenKey;
}

/** 计算进入子层时的下一层 options（parents 追加当前节点、depth + 1） */
export function nextLevelOptions<T, CK extends string> (row: T, options: BaseInnerOptions<T, CK>): BaseInnerOptions<T, CK> {
  return { ...options, parents: [...options.parents, row], depth: options.depth + 1 };
}

/** 解析当前节点的 children 键与子节点数组（无子节点时 children 为 undefined） */
export function getChildren<T extends AnyObject, CK extends string = ChildrenKey> (row: T, options: BaseInnerOptions<T, CK>): { childrenKey: CK; children: T[] | undefined } {
  const childrenKey = getFinalChildrenKey(row, options, options);

  return { childrenKey, children: row[childrenKey] as T[] | undefined };
}
