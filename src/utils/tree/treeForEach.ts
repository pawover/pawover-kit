import type { AnyObject } from "@pawover/types";
import { isArray } from "../typeof";
import { type BaseCallbackMeta, type BaseInnerOptions, type BaseOptions, type ChildrenKey, type QueueItem, getFinalChildrenKey } from "./types";

export type TreeForeachOptions<T extends AnyObject, CK extends string = ChildrenKey> = BaseOptions<T, CK>;
export type TreeForeachInnerOption<T extends AnyObject, CK extends string = ChildrenKey> = BaseInnerOptions<T, CK>;
export type TreeForeachCallback<T extends AnyObject> = (row: T, meta: BaseCallbackMeta<T>) => void;

const strategies = { pre: preImpl, post: postImpl, breadth: breadthImpl };

// 前置遍历
function preImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeForeachCallback<T>, options: TreeForeachInnerOption<T, CK>) {
  callback(row, options);
  const finalChildrenKey = getFinalChildrenKey(row, options, options);
  const children = row[finalChildrenKey] as T[] | undefined;

  if (isArray(children)) {
    const nextLevelOptions = { ...options, parents: [...options.parents, row], depth: options.depth + 1 };
    for (const child of children) {
      preImpl(child, callback, nextLevelOptions);
    }
  }
}

// 后置遍历
function postImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeForeachCallback<T>, options: TreeForeachInnerOption<T, CK>) {
  const finalChildrenKey = getFinalChildrenKey(row, options, options);
  const children = row[finalChildrenKey] as T[] | undefined;

  if (isArray(children)) {
    const nextLevelOptions = { ...options, parents: [...options.parents, row], depth: options.depth + 1 };
    for (const child of children) {
      postImpl(child, callback, nextLevelOptions);
    }
  }
  callback(row, options);
}

// 广度优先遍历
function breadthImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeForeachCallback<T>, options: TreeForeachInnerOption<T, CK>) {
  const queue: QueueItem<T, CK>[] = [{ queueRow: row, queueOptions: options }];
  const runQueue = () => {
    if (queue.length === 0) {
      return;
    }

    const { queueRow, queueOptions } = queue.shift()!;
    const finalChildrenKey = getFinalChildrenKey(queueRow, queueOptions, queueOptions);
    const children = queueRow[finalChildrenKey] as T[] | undefined;

    if (isArray(children)) {
      const nextLevelOptions = { ...queueOptions, parents: [...queueOptions.parents, queueRow], depth: queueOptions.depth + 1 };
      const subQueueItems = children.map((queueRow) => ({ queueRow, queueOptions: nextLevelOptions }));
      queue.push(...subQueueItems);
    }
    callback(queueRow, queueOptions);
    runQueue();
  };

  runQueue();
}

/**
 * 遍历树节点
 *
 * @param tree 树结构数据
 * @param callback 回调函数
 * @param options 配置项
 * @example
 * ```ts
 * const tree = [{ id: 1, children: [{ id: 2 }] }];
 * const ids: number[] = [];
 * treeForEach(tree, (node) => ids.push(node.id));
 * // ids: [1, 2] (pre-order default)
 * ```
 */
export function treeForEach<T extends AnyObject, CK extends string = ChildrenKey> (tree: T | T[], callback: TreeForeachCallback<T>, options: TreeForeachOptions<T, CK> = {}): void {
  const { childrenKey = "children", strategy = "pre", getChildrenKey } = options;
  const traversalMethod = strategies[strategy];
  const innerOptions = { childrenKey: childrenKey as CK, depth: 0, parents: [], getChildrenKey };

  if (isArray(tree)) {
    for (const row of tree) {
      traversalMethod<T, CK>(row, callback, innerOptions);
    }
  } else {
    traversalMethod<T, CK>(tree, callback, innerOptions);
  }
}
