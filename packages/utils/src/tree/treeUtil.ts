import type { AnyObject, TreeLike } from "@pawover/types";
import type { SetOptional } from "type-fest";

import { TypeUtil } from "../type";
import { treeFilterStrategies } from "./filter";
import { treeFindStrategies } from "./find";
import { treeForEachStrategies } from "./forEach";
import type { ChildrenKey, ParentIdKey, RowKey, RowsToTreeOptions, TreeFilterCallback, TreeFilterOptions, TreeFindCallback, TreeFindOptions, TreeForeachCallback, TreeForeachOptions, TreeMapCallback, TreeMapOptions, TreeToRowsOptions } from "./index.type";
import { treeMapStrategies } from "./map";

/**
 * 树结构工具类
 */
export class TreeUtil {
  /**
   * 行结构 转 树结构
   * - 将平铺的数组转换为树形结构
   *
   * @param rows 行数据数组
   * @param options 配置项
   * @returns 树结构数组
   * @example
   * ```ts
   * const rows = [
   *   { id: 1, parentId: null },
   *   { id: 2, parentId: 1 },
   * ];
   * TreeUtil.rowsToTree(rows); // [{ id: 1, parentId: null, children: [{ id: 2, parentId: 1 }] }]
   * ```
   */
  static rowsToTree<T extends AnyObject = AnyObject, CK extends string = ChildrenKey, R = TreeLike<T, CK>, RK extends string = RowKey, PK extends string = ParentIdKey>(rows: T[], options?: RowsToTreeOptions<RK, PK, CK> | undefined): R[] {
    const { parentIdKey = "parentId", rowKey = "id", childrenKey = "children" } = options || {};
    const result: R[] = [];
    const map = new Map<PropertyKey, T>();

    for (const row of rows) {
      const id = row[rowKey];

      if (!map.get(id)) {
        map.set(id, row);
      }
    }

    for (const row of rows) {
      const parentId = row[parentIdKey];
      const parent = map.get(parentId);

      if (!parent || !parentId) {
        result.push(row);

        continue;
      }

      const siblings = parent[childrenKey];

      if (TypeUtil.isNull(siblings) || TypeUtil.isUndefined(siblings)) {
        parent[childrenKey] = [row] as T[CK];
      } else if (Array.isArray(siblings)) {
        siblings.push(row);
      } else {
        const message = `The key "${childrenKey.toString()}" in parent item is not an array.`;
        throw new Error(message);
      }
    }

    return result;
  }

  /**
   * 树结构 转 行结构
   * - 将树形结构扁平化为数组
   *
   * @param tree 树结构数据 (单个节点或节点数组)
   * @param options 配置项
   * @returns 扁平化后的数组
   * @example
   * ```ts
   * const tree = [{ id: 1, children: [{ id: 2 }] }];
   * TreeUtil.treeToRows(tree); // [{ id: 1, children: undefined }, { id: 2, children: undefined }]
   * ```
   */
  static treeToRows<T extends AnyObject, CK extends string = ChildrenKey, R extends AnyObject = SetOptional<T, CK>>(tree: T | T[], options: TreeToRowsOptions<T, CK> = {}): R[] {
    const { childrenKey = "children" } = options;
    const result: R[] = [];

    if (!tree) {
      return result;
    }

    this.forEach(tree, (t) => result.push({ ...t, [childrenKey]: undefined }), options);

    return result;
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
   * TreeUtil.forEach(tree, (node) => ids.push(node.id)); // ids: [1, 2] (pre-order default)
   * ```
   */
  static forEach<T extends AnyObject, CK extends string = ChildrenKey>(tree: T | T[], callback: TreeForeachCallback<T>, options: TreeForeachOptions<T, CK> = {}): void {
    const { childrenKey = "children", strategy = "pre", getChildrenKey } = options;
    const traversalMethod = treeForEachStrategies[strategy];
    const innerOptions = { childrenKey: childrenKey as CK, depth: 0, parents: [], getChildrenKey };

    if (TypeUtil.isArray(tree)) {
      for (const row of tree) {
        traversalMethod<T, CK>(row, callback, innerOptions);
      }
    } else {
      traversalMethod<T, CK>(tree, callback, innerOptions);
    }
  }

  /**
   * 查找树节点
   * - 返回第一个回调返回 true 的节点
   *
   * @param tree 树结构数据
   * @param callback 回调函数
   * @param options 配置项
   * @returns 找到的节点，未找到则返回 undefined
   * @example
   * ```ts
   * const tree = [{ id: 1, children: [{ id: 2 }] }];
   * TreeUtil.find(tree, (node) => node.id === 2); // { id: 2, ... }
   * ```
   */
  static find<T extends AnyObject, CK extends string = ChildrenKey>(tree: T | T[], callback: TreeFindCallback<T>, options: TreeFindOptions<T, CK> = {}): T | undefined {
    const { childrenKey = "children", strategy = "pre", getChildrenKey } = options;
    const traversalMethod = treeFindStrategies[strategy];
    const innerOptions = { childrenKey: childrenKey as CK, depth: 0, parents: [], getChildrenKey };

    if (TypeUtil.isArray(tree)) {
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

  /**
   * 过滤树节点
   * - 返回新的树结构，包含所有回调返回 true 的节点
   * - 如果父节点被过滤，则其子节点也会被过滤 (pre 策略下)
   *
   * @param tree 树结构数据
   * @param callback 回调函数
   * @param options 配置项 (childrenKey, strategy等)
   * @returns 过滤后的树结构数组
   * @example
   * ```ts
   * const tree = [{ id: 1, visible: true, children: [{ id: 2, visible: false }] }];
   * TreeUtil.filter(tree, (node) => node.visible);
   * // [{ id: 1, visible: true, children: [] }]
   * ```
   */
  static filter<T extends AnyObject, CK extends string = ChildrenKey>(tree: T[], callback: TreeFilterCallback<T>, options?: TreeFilterOptions<T, CK>): T[];
  static filter<T extends AnyObject, CK extends string = ChildrenKey>(tree: T, callback: TreeFilterCallback<T>, options?: TreeFilterOptions<T, CK>): T;
  static filter<T extends AnyObject, CK extends string = ChildrenKey>(tree: T | T[], callback: TreeFilterCallback<T>, options: TreeFilterOptions<T, CK> = {}): T | T[] {
    const { childrenKey = "children", strategy = "pre", getChildrenKey } = options;
    const traversalMethod = treeFilterStrategies[strategy];
    const innerOptions = { childrenKey: childrenKey as CK, depth: 0, parents: [], getChildrenKey };

    return TypeUtil.isArray(tree) ? tree.map((row) => traversalMethod(row, callback, innerOptions)).filter((t) => !!t) : traversalMethod(tree, callback, innerOptions) || [];
  }

  /**
   * 映射树节点
   * - 返回新的树结构，保持层级关系
   *
   * @param tree 树结构数据
   * @param callback 回调函数 (返回映射后的节点内容)
   * @param options 配置项
   * @returns 映射后的树结构数组
   * @example
   * ```ts
   * const tree = [{ id: 1, val: 10, children: [{ id: 2, val: 20 }] }];
   * TreeUtil.map(tree, (node) => ({ ...node, val: node.val * 2 }));
   * // [{ id: 1, val: 20, children: [{ id: 2, val: 40 }] }]
   * ```
   */
  static map<R extends AnyObject, T extends AnyObject, CK extends string = ChildrenKey>(tree: T[], callback: TreeMapCallback<R, T>, options?: TreeMapOptions<T, CK>): TreeLike<R, CK>[];
  static map<R extends AnyObject, T extends AnyObject, CK extends string = ChildrenKey>(tree: T, callback: TreeMapCallback<R, T>, options?: TreeMapOptions<T, CK>): TreeLike<R, CK>;
  static map<R extends AnyObject, T extends AnyObject, CK extends string = ChildrenKey>(tree: T | T[], callback: TreeMapCallback<R, T>, options: TreeMapOptions<T, CK> = {}): TreeLike<R, CK> | TreeLike<R, CK>[] {
    const { childrenKey = "children", strategy = "pre", getChildrenKey } = options;
    const traversalMethod = treeMapStrategies[strategy];
    const innerOptions = { childrenKey: childrenKey as CK, depth: 0, parents: [], getChildrenKey };

    return TypeUtil.isArray(tree) ? tree.map((row) => traversalMethod<R, T, CK>(row, callback, innerOptions)) : traversalMethod<R, T, CK>(tree, callback, innerOptions);
  }
}
