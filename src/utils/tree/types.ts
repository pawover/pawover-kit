import { isFunction } from "../typeof";

export type RowKey = "id";
export type ParentIdKey = "parentId";
export type ChildrenKey = "children";
export type Strategy = "pre" | "post" | "breadth";

export interface BaseCallbackMeta<T> {
  depth: number;
  parents?: T[];
}

export interface BaseOptions<T, CK extends string> {
  childrenKey?: CK;
  strategy?: Strategy;
  getChildrenKey?: (row: T, meta: BaseCallbackMeta<T>) => CK | undefined;
}

export interface BaseInnerOptions<T, CK extends string> {
  childrenKey: CK;
  parents: T[];
  depth: number;
  getChildrenKey?: (row: T, meta: BaseCallbackMeta<T>) => CK | undefined;
}

export interface QueueItem<T, CK extends string> {
  queueRow: T;
  queueOptions: BaseInnerOptions<T, CK>;
}

export function getFinalChildrenKey<T, CK extends string>(
  tree: T,
  meta: BaseCallbackMeta<T>,
  options: BaseInnerOptions<T, CK>,
): CK {
  if (isFunction(options.getChildrenKey)) {
    const dynamicChildrenKey = options.getChildrenKey(tree, meta);
    if (dynamicChildrenKey && dynamicChildrenKey !== null) {
      return dynamicChildrenKey;
    }
  }

  return options.childrenKey;
}
