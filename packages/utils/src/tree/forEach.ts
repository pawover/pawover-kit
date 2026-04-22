import type { AnyObject } from "@pawover/types";

import { TypeUtil } from "../type";
import type { ChildrenKey, Queue, TreeForeachCallback, TreeForeachInnerOption } from "./index.type";
import { getFinalChildrenKey } from "./utils";

// 前置遍历
function preImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeForeachCallback<T>, options: TreeForeachInnerOption<T, CK>) {
  callback(row, options);
  const finalChildrenKey = getFinalChildrenKey(row, options, options);
  const children = row[finalChildrenKey] as T[] | undefined;

  if (TypeUtil.isArray(children)) {
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

  if (TypeUtil.isArray(children)) {
    const nextLevelOptions = { ...options, parents: [...options.parents, row], depth: options.depth + 1 };
    for (const child of children) {
      postImpl(child, callback, nextLevelOptions);
    }
  }
  callback(row, options);
}

// 广度优先遍历
function breadthImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeForeachCallback<T>, options: TreeForeachInnerOption<T, CK>) {
  const queue: Queue<T, CK>[] = [{ queueRow: row, queueOptions: options }];
  const runQueue = () => {
    if (queue.length === 0) {
      return;
    }

    const { queueRow, queueOptions } = queue.shift()!;
    const finalChildrenKey = getFinalChildrenKey(queueRow, queueOptions, queueOptions);
    const children = queueRow[finalChildrenKey] as T[] | undefined;

    if (TypeUtil.isArray(children)) {
      const nextLevelOptions = { ...queueOptions, parents: [...queueOptions.parents, queueRow], depth: queueOptions.depth + 1 };
      const subQueueItems = children.map((queueRow) => ({ queueRow, queueOptions: nextLevelOptions }));
      queue.push(...subQueueItems);
    }
    callback(queueRow, queueOptions);
    runQueue();
  };

  runQueue();
}

export const treeForEachStrategies = { pre: preImpl, post: postImpl, breadth: breadthImpl };
