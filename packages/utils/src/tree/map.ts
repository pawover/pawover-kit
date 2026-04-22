import type { AnyObject, TreeLike } from "@pawover/types";

import { ArrayUtil } from "../array";
import { TypeUtil } from "../type";
import type { ChildrenKey, Queue, TreeMapCallback, TreeMapInnerOption } from "./index.type";
import { getFinalChildrenKey } from "./utils";

// 前置遍历
function preImpl<R extends AnyObject, T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeMapCallback<R, T>, options: TreeMapInnerOption<T, CK>): TreeLike<R, CK> {
  const finalChildrenKey = getFinalChildrenKey(row, options, options);
  const result = callback(row, options);
  const children = row[finalChildrenKey] as T[] | undefined;
  let newChildren: TreeLike<R, CK>[] | undefined;

  if (TypeUtil.isArray(children)) {
    const nextLevelOptions = { ...options, parents: [...options.parents, row], depth: options.depth + 1 };
    newChildren = children.map((c) => preImpl(c, callback, nextLevelOptions));
  }

  return { ...result, [finalChildrenKey]: newChildren };
}

// 子节点优先遍历
function postImpl<R extends AnyObject, T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeMapCallback<R, T>, options: TreeMapInnerOption<T, CK>): TreeLike<R, CK> {
  const finalChildrenKey = getFinalChildrenKey(row, options, options);
  const children = row[finalChildrenKey] as T[] | undefined;
  let newChildren: TreeLike<R, CK>[] | undefined;

  if (TypeUtil.isArray(children)) {
    const nextLevelOptions = { ...options, parents: [...options.parents, row], depth: options.depth + 1 };
    newChildren = children.map((c) => postImpl(c, callback, nextLevelOptions));
  }
  const result = callback(row, options);

  return { ...result, [finalChildrenKey]: newChildren };
}

// 广度优先遍历
function breadthImpl<R extends AnyObject, T extends AnyObject, CK extends string = ChildrenKey> (row: T, callback: TreeMapCallback<R, T>, options: TreeMapInnerOption<T, CK>): TreeLike<R, CK> {
  const queue: Queue<T, CK>[] = [{ queueRow: row, queueOptions: options }];
  const cache = new WeakMap<T, TreeLike<R, CK>>();
  const childrenKeyCache = new WeakMap<T, CK>();
  let result: TreeLike<R, CK>;

  const runQueue = () => {
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
    const res = callback(queueRow, queueOptions);
    cache.set(queueRow, res);
    childrenKeyCache.set(queueRow, finalChildrenKey);

    // breadth 模式的子节点一定晚于父节点执行，所以可以在cache中找到父节点的生成物
    const parent = ArrayUtil.last(queueOptions.parents);
    if (parent) {
      const newParent = cache.get(parent);
      const parentChildrenKey = childrenKeyCache.get(parent);

      if (newParent && parentChildrenKey) {
        if (newParent[parentChildrenKey]) {
          newParent[parentChildrenKey].push(res);
        } else {
          (newParent[parentChildrenKey] as TreeLike<R, CK>[]) = [res];
        }
      }
    }
    // 这棵树的顶点
    if (queueOptions.depth === 0) {
      result = res;
    }

    return runQueue();
  };

  return runQueue();
}

export const treeMapStrategies = { pre: preImpl, post: postImpl, breadth: breadthImpl };
