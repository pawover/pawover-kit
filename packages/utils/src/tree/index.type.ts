import type { AnyObject } from "@pawover/kit-types";

export type RowKey = "id";
export type ParentIdKey = "parentId";
export type ChildrenKey = "children";
export type Strategy = "pre" | "post" | "breadth";

export interface BaseCallbackMeta<T> {
  depth: number;
  parents?: T[] | undefined;
}

/**
 * 树节点剪枝判定
 * - 返回 `true` 时跳过该节点的子树，节点本身仍会被访问
 * - 应为纯函数：`pre` 在节点回调之后求值，`post` 与 `breadth` 在进入节点时求值，求值时机随 `strategy` 变化
 */
export type TreePruneCallback<T> = (row: T, meta: BaseCallbackMeta<T>) => boolean;

export interface BaseOptions<T, CK extends string> {
  childrenKey?: CK;
  strategy?: Strategy;
  getChildrenKey?: ((row: T, meta: BaseCallbackMeta<T>) => CK) | undefined;
}

export interface BaseInnerOptions<T, CK extends string> {
  childrenKey: CK;
  parents: T[];
  depth: number;
  getChildrenKey?: ((row: T, meta: BaseCallbackMeta<T>) => CK) | undefined;
  prune?: TreePruneCallback<T> | undefined;
}

export interface Queue<T, CK extends string> {
  queueRow: T;
  queueOptions: BaseInnerOptions<T, CK>;
}

export interface RowsToTreeOptions<RK extends string = RowKey, PK extends string = ParentIdKey, CK extends string = ChildrenKey> {
  rowKey?: RK;
  parentIdKey?: PK;
  childrenKey?: CK;
  orphan?: "promote" | "drop";
  rootParentId?: PropertyKey;
}
export type TreeToRowsOptions<T extends AnyObject, CK extends string = ChildrenKey> = Omit<TreeForeachOptions<T, CK>, "prune">;

export type TreeFindOptions<T extends AnyObject, CK extends string = ChildrenKey> = BaseOptions<T, CK> & { prune?: TreePruneCallback<T> | undefined };
export type TreeFindInnerOption<T extends AnyObject, CK extends string = ChildrenKey> = BaseInnerOptions<T, CK>;
export type TreeFindCallback<T extends AnyObject> = (row: T, meta: BaseCallbackMeta<T>) => boolean;

export type TreeForeachOptions<T extends AnyObject, CK extends string = ChildrenKey> = BaseOptions<T, CK> & { prune?: TreePruneCallback<T> | undefined };
export type TreeForeachInnerOption<T extends AnyObject, CK extends string = ChildrenKey> = BaseInnerOptions<T, CK>;
export type TreeForeachCallback<T extends AnyObject> = (row: T, meta: BaseCallbackMeta<T>) => void;

export type TreeFilterOptions<T extends AnyObject, CK extends string = ChildrenKey> = BaseOptions<T, CK>;
export type TreeFilterInnerOption<T extends AnyObject, CK extends string = ChildrenKey> = BaseInnerOptions<T, CK>;
export type TreeFilterCallback<T extends AnyObject> = (row: T, meta: BaseCallbackMeta<T>) => boolean;

export type TreeMapOptions<T extends AnyObject, CK extends string> = BaseOptions<T, CK>;
export type TreeMapInnerOption<T extends AnyObject, CK extends string> = BaseInnerOptions<T, CK>;
export type TreeMapCallback<R extends AnyObject, T extends AnyObject> = (row: T, meta: BaseCallbackMeta<T>) => R;

