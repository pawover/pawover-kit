import type { AnyObject } from "@pawover/kit-types";
import { TypeUtil } from "../type";
import type { ChildrenKey, Queue, TreeForeachCallback, TreeForeachInnerOption } from "./index.type";
import { getChildren, nextLevelOptions } from "./utils";

// 前置遍历
function preImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeForeachCallback<T>, options: TreeForeachInnerOption<T, CK>) {
  callback(row, options);
  const { children } = getChildren(row, options);

  if (TypeUtil.isArray(children)) {
    for (const child of children) {
      preImpl(child, callback, nextLevelOptions(row, options));
    }
  }
}

// 后置遍历
function postImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeForeachCallback<T>, options: TreeForeachInnerOption<T, CK>) {
  const { children } = getChildren(row, options);

  if (TypeUtil.isArray(children)) {
    for (const child of children) {
      postImpl(child, callback, nextLevelOptions(row, options));
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
    const { children } = getChildren(queueRow, queueOptions);

    if (TypeUtil.isArray(children)) {
      const subQueueItems = children.map((child) => ({ queueRow: child, queueOptions: nextLevelOptions(queueRow, queueOptions) }));
      queue.push(...subQueueItems);
    }
    callback(queueRow, queueOptions);
    runQueue();
  };

  runQueue();
}

export const treeForEachStrategies = { pre: preImpl, post: postImpl, breadth: breadthImpl };
