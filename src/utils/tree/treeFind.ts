import type { AnyObject } from "@pawover/types";
import { isArray } from "../typeof";
import { type BaseCallbackMeta, type BaseInnerOptions, type BaseOptions, type ChildrenKey, type QueueItem, getFinalChildrenKey } from "./types";

export type TreeFindOptions<T extends AnyObject, CK extends string = ChildrenKey> = BaseOptions<T, CK>;
export type TreeFindInnerOption<T extends AnyObject, CK extends string = ChildrenKey> = BaseInnerOptions<T, CK>;
export type TreeFindCallback<T extends AnyObject> = (row: T, meta: BaseCallbackMeta<T>) => boolean;

const strategies = { pre: preImpl, post: postImpl, breadth: breadthImpl };

// 前置深度优先遍历
function preImpl<T extends AnyObject, CK extends string = ChildrenKey>(row: T, callback: TreeFindCallback<T>, options: TreeFindInnerOption<T, CK>): T | undefined {
  const callbackResult = callback(row, options);
  if (callbackResult) {
    return row;
  }

  const finalChildrenKey = getFinalChildrenKey(row, options, options);
  const children = row[finalChildrenKey] as T[] | undefined;
  if (isArray(children)) {
    for (const child of children) {
      const nextLevelOptions = { ...options, parents: [...options.parents, row], depth: options.depth + 1 };
      const result = preImpl(child, callback, nextLevelOptions);
      if (result) {
        return result;
      }
    }
  }

  return undefined;
}

// 后置深度优先遍历
function postImpl<T extends AnyObject, CK extends string = ChildrenKey>(row: T, callback: TreeFindCallback<T>, options: TreeFindInnerOption<T, CK>): T | undefined {
  const finalChildrenKey = getFinalChildrenKey(row, options, options);
  const children = row[finalChildrenKey] as T[] | undefined;
  if (isArray(children)) {
    for (const child of children) {
      const nextLevelOptions = { ...options, parents: [...options.parents, row], depth: options.depth + 1 };
      const result = postImpl(child, callback, nextLevelOptions);
      if (result) {
        return result;
      }
    }
  }

  const callbackResult = callback(row, options);
  if (callbackResult) {
    return row;
  }

  return undefined;
}

// 广度优先遍历
function breadthImpl<T extends AnyObject, CK extends string = ChildrenKey>(row: T, callback: TreeFindCallback<T>, options: TreeFindInnerOption<T, CK>): T | undefined {
  const queue: QueueItem<T, CK>[] = [{ queueRow: row, queueOptions: options }];
  const runQueue = (): T | undefined => {
    if (queue.length === 0) {
      return undefined;
    }
    const { queueRow, queueOptions } = queue.shift()!;
    const finalChildrenKey = getFinalChildrenKey(queueRow, queueOptions, queueOptions);
    const children = queueRow[finalChildrenKey] as T[] | undefined;

    if (isArray(children)) {
      const nextLevelOptions = { ...queueOptions, parents: [...queueOptions.parents, queueRow], depth: queueOptions.depth + 1 };
      const subQueueItems = children.map((queueRow) => ({ queueRow, queueOptions: nextLevelOptions }));
      queue.push(...subQueueItems);
    }

    const callbackResult = callback(queueRow, queueOptions);
    if (callbackResult) {
      return queueRow;
    }

    return runQueue();
  };

  return runQueue();
}


/**
 * 查找树节点，找到第一个返回非空值的节点
 */
export function treeFind<T extends AnyObject, CK extends string = ChildrenKey>(tree: T | T[], callback: TreeFindCallback<T>, options: TreeFindOptions<T, CK> = {}): T | undefined {
  const { childrenKey = "children", strategy = "pre", getChildrenKey } = options;
  const traversalMethod = strategies[strategy];
  const innerOptions = { childrenKey: childrenKey as CK, depth: 0, parents: [], getChildrenKey };

  if (isArray(tree)) {
    for (const row of tree) {
      const result = traversalMethod<T, CK>(row, callback, innerOptions);
      if (result) {
        return result;
      }
    }

    return undefined;
  }

  return traversalMethod<T, CK>(tree, callback, innerOptions);
}
