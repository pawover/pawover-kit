import type { AnyObject } from "@pawover/kit-types";
import { TypeUtil } from "../type";
import type { ChildrenKey, Queue, TreeFindCallback, TreeFindInnerOption } from "./index.type";
import { getChildren, nextLevelOptions } from "./utils";

// 前置深度优先遍历
function preImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeFindCallback<T>, options: TreeFindInnerOption<T, CK>): T | undefined {
  const callbackResult = callback(row, options);
  if (callbackResult) {
    return row;
  }

  const { children } = getChildren(row, options);
  if (TypeUtil.isArray(children)) {
    for (const child of children) {
      const result = preImpl(child, callback, nextLevelOptions(row, options));
      if (result) {
        return result;
      }
    }
  }

  return undefined;
}

// 后置深度优先遍历
function postImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeFindCallback<T>, options: TreeFindInnerOption<T, CK>): T | undefined {
  const { children } = getChildren(row, options);
  if (TypeUtil.isArray(children)) {
    for (const child of children) {
      const result = postImpl(child, callback, nextLevelOptions(row, options));
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
    const { children } = getChildren(queueRow, queueOptions);

    if (TypeUtil.isArray(children)) {
      const subQueueItems = children.map((child) => ({ queueRow: child, queueOptions: nextLevelOptions(queueRow, queueOptions) }));
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
