import type { AnyObject } from "@pawover/types";

import { TypeUtil } from "../type";
import type { ChildrenKey, Queue, TreeFindCallback, TreeFindInnerOption } from "./index.type";
import { getFinalChildrenKey } from "./utils";

// 前置深度优先遍历
function preImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeFindCallback<T>, options: TreeFindInnerOption<T, CK>): T | undefined {
  const callbackResult = callback(row, options);
  if (callbackResult) {
    return row;
  }

  const finalChildrenKey = getFinalChildrenKey(row, options, options);
  const children = row[finalChildrenKey] as T[] | undefined;
  if (TypeUtil.isArray(children)) {
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
function postImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeFindCallback<T>, options: TreeFindInnerOption<T, CK>): T | undefined {
  const finalChildrenKey = getFinalChildrenKey(row, options, options);
  const children = row[finalChildrenKey] as T[] | undefined;
  if (TypeUtil.isArray(children)) {
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
function breadthImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeFindCallback<T>, options: TreeFindInnerOption<T, CK>): T | undefined {
  const queue: Queue<T, CK>[] = [{ queueRow: row, queueOptions: options }];
  const runQueue = (): T | undefined => {
    if (queue.length === 0) {
      return undefined;
    }
    const { queueRow, queueOptions } = queue.shift()!;
    const finalChildrenKey = getFinalChildrenKey(queueRow, queueOptions, queueOptions);
    const children = queueRow[finalChildrenKey] as T[] | undefined;

    if (TypeUtil.isArray(children)) {
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

export const treeFindStrategies = { pre: preImpl, post: postImpl, breadth: breadthImpl };
