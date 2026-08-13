import type { AnyObject } from "@pawover/kit-types";
import { ArrayUtil } from "../array";
import { TypeUtil } from "../type";
import type { ChildrenKey, Queue, TreeFilterCallback, TreeFilterInnerOption } from "./index.type";
import { getChildren, nextLevelOptions } from "./utils";

// 前置遍历
function preImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeFilterCallback<T>, options: TreeFilterInnerOption<T, CK>): T | undefined {
  const result = callback(row, options);
  if (!result) {
    return undefined;
  }

  const { childrenKey, children } = getChildren(row, options);
  let newChildren: T[] | undefined;

  if (TypeUtil.isArray(children)) {
    newChildren = children.map((c) => preImpl(c, callback, nextLevelOptions(row, options))).filter((c) => !!c);
  }

  return { ...row, [childrenKey]: newChildren };
}

// 子节点优先遍历
function postImpl<T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeFilterCallback<T>, options: TreeFilterInnerOption<T, CK>): T | undefined {
  const { childrenKey, children } = getChildren(row, options);
  let newChildren: T[] | undefined;

  if (TypeUtil.isArray(children)) {
    newChildren = children.map((c) => postImpl(c, callback, nextLevelOptions(row, options))).filter((c) => !!c);
  }

  const result = callback(row, options);
  if (!result) {
    return undefined;
  }

  return { ...row, [childrenKey]: newChildren };
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
    const { childrenKey, children } = getChildren(queueRow, queueOptions);

    if (TypeUtil.isArray(children)) {
      const subQueueItems = children.map((child) => ({ queueRow: child, queueOptions: nextLevelOptions(queueRow, queueOptions) }));
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

    const newNode = { ...queueRow, [childrenKey]: undefined };
    if (isTopNode) {
      result = newNode;
    }

    resultCache.set(queueRow, callbackResult);
    newNodeCache.set(queueRow, newNode);
    childrenKeyCache.set(queueRow, childrenKey);

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
