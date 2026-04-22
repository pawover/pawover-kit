import type { AnyObject } from "@pawover/types";

import { ArrayUtil } from "../array";
import { TypeUtil } from "../type";
import type { ChildrenKey, Queue, TreeFilterCallback, TreeFilterInnerOption } from "./index.type";
import { getFinalChildrenKey } from "./utils";

// 前置遍历
function preImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeFilterCallback<T>, options: TreeFilterInnerOption<T, CK>): T | undefined {
  const result = callback(row, options);
  if (!result) {
    return undefined;
  }

  const finalChildrenKey = getFinalChildrenKey(row, options, options);
  const children = row[finalChildrenKey] as T[] | undefined;
  let newChildren: T[] | undefined;

  if (TypeUtil.isArray(children)) {
    const nextLevelOptions = { ...options, parents: [...options.parents, row], depth: options.depth + 1 };
    newChildren = children.map((c) => preImpl(c, callback, nextLevelOptions)).filter((c) => !!c);
  }

  return { ...row, [finalChildrenKey]: newChildren };
}

// 子节点优先遍历
function postImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeFilterCallback<T>, options: TreeFilterInnerOption<T, CK>): T | undefined {
  const finalChildrenKey = getFinalChildrenKey(row, options, options);
  const children = row[finalChildrenKey] as T[] | undefined;
  let newChildren: T[] | undefined;

  if (TypeUtil.isArray(children)) {
    const nextLevelOptions = { ...options, parents: [...options.parents, row], depth: options.depth + 1 };
    newChildren = children.map((c) => preImpl(c, callback, nextLevelOptions)).filter((c) => !!c);
  }

  const result = callback(row, options);
  if (!result) {
    return undefined;
  }

  return { ...row, [finalChildrenKey]: newChildren };
}

// 广度优先遍历
function breadthImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeFilterCallback<T>, options: TreeFilterInnerOption<T, CK>): T | undefined {
  const queue: Queue<T, CK>[] = [{ queueRow: row, queueOptions: options }];
  const resultCache = new WeakMap<T, boolean>();
  const newNodeCache = new WeakMap<T, T>();
  const childrenKeyCache = new WeakMap<T, CK>();
  let result: T;
  const runQueue = (): T | undefined => {
    if (queue.length === 0) {
      return result;
    }

    const { queueRow, queueOptions } = queue.shift()!;
    const finalChildrenKey = getFinalChildrenKey(queueRow, queueOptions, queueOptions);
    const children = queueRow[finalChildrenKey] as T[] | undefined;

    if (TypeUtil.isArray(children)) {
      const nextLevelOptions = { ...queueOptions, parents: [...queueOptions.parents, queueRow], depth: queueOptions.depth + 1 };
      const subQueueItems = children.map((queueRow) => ({ queueRow, queueOptions: nextLevelOptions }));
      queue.push(...subQueueItems);
    }

    const parent = ArrayUtil.last(queueOptions.parents);
    const isTopNode = queueOptions.depth === 0;
    const parentResult = parent && resultCache.get(parent);

    if (!isTopNode && !parentResult) {
      return runQueue();
    }

    const callbackResult = callback(queueRow, queueOptions);
    if (isTopNode && !callbackResult) {
      return undefined;
    }

    const newNode = { ...queueRow, [finalChildrenKey]: undefined };
    if (isTopNode) {
      result = newNode;
    }

    resultCache.set(queueRow, callbackResult);
    newNodeCache.set(queueRow, newNode);
    childrenKeyCache.set(queueRow, finalChildrenKey);

    if (callbackResult && parent) {
      const parentNewNode = newNodeCache.get(parent);
      const parentChildrenKey = childrenKeyCache.get(parent);

      if (parentNewNode && parentChildrenKey) {
        if (!parentNewNode[parentChildrenKey]) {
          (parentNewNode[parentChildrenKey] as T[]) = [];
        }
        parentNewNode[parentChildrenKey].push(newNode);
      }
    }

    return runQueue();
  };

  return runQueue();
}

export const treeFilterStrategies = { pre: preImpl, post: postImpl, breadth: breadthImpl };
