import type { AnyObject } from "@pawover/types";

export type RowKey = "id";
export type ParentIdKey = "parentId";
export type ChildrenKey = "children";
export type Strategy = "pre" | "post" | "breadth";

export interface BaseCallbackMeta<T> {
  depth: number;
  parents?: T[] | undefined;
}

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
}

export interface Queue<T, CK extends string> {
  queueRow: T;
  queueOptions: BaseInnerOptions<T, CK>;
}

export interface RowsToTreeOptions<RK extends string = RowKey, PK extends string = ParentIdKey, CK extends string = ChildrenKey> {
  rowKey?: RK;
  parentIdKey?: PK;
  childrenKey?: CK;
}
export type TreeToRowsOptions<T extends AnyObject, CK extends string = ChildrenKey> = TreeForeachOptions<T, CK>;

export type TreeFindOptions<T extends AnyObject, CK extends string = ChildrenKey> = BaseOptions<T, CK>;
export type TreeFindInnerOption<T extends AnyObject, CK extends string = ChildrenKey> = BaseInnerOptions<T, CK>;
export type TreeFindCallback<T extends AnyObject> = (row: T, meta: BaseCallbackMeta<T>) => boolean;

export type TreeForeachOptions<T extends AnyObject, CK extends string = ChildrenKey> = BaseOptions<T, CK>;
export type TreeForeachInnerOption<T extends AnyObject, CK extends string = ChildrenKey> = BaseInnerOptions<T, CK>;
export type TreeForeachCallback<T extends AnyObject> = (row: T, meta: BaseCallbackMeta<T>) => void;

export type TreeFilterOptions<T extends AnyObject, CK extends string = ChildrenKey> = BaseOptions<T, CK>;
export type TreeFilterInnerOption<T extends AnyObject, CK extends string = ChildrenKey> = BaseInnerOptions<T, CK>;
export type TreeFilterCallback<T extends AnyObject> = (row: T, meta: BaseCallbackMeta<T>) => boolean;

export type TreeMapOptions<T extends AnyObject, CK extends string> = BaseOptions<T, CK>;
export type TreeMapInnerOption<T extends AnyObject, CK extends string> = BaseInnerOptions<T, CK>;
export type TreeMapCallback<R extends AnyObject, T extends AnyObject> = (row: T, meta: BaseCallbackMeta<T>) => R;

