import type { AnyObject, TreeLike, TreeLikeOptionalChildren } from "@pawover/kit-types";
import { TypeUtil } from "../type";
import { treeFilterStrategies } from "./filter";
import { treeFindStrategies } from "./find";
import { treeForEachStrategies } from "./forEach";
import type { ChildrenKey, ParentIdKey, RowKey, RowsToTreeOptions, TreeFilterCallback, TreeFilterOptions, TreeFindCallback, TreeFindOptions, TreeForeachCallback, TreeForeachOptions, TreeMapCallback, TreeMapOptions, TreeToRowsOptions } from "./index.type";
import { treeMapStrategies } from "./map";

/**
 * 树结构工具类
 *
 * 引用策略约定：
 * - 转换类方法（`rowsToTree` / `treeToRows` / `filter` / `map`）：不突变输入；输出的每个节点均为**新对象引用**（来源节点的浅拷贝，仅自有可枚举属性；非枚举属性、原型链、getter 及深层嵌套对象不保证）。
 * - 查询类方法（`find` / `forEach`）：按查询语义直接使用**原对象引用**。
 */
export class TreeUtil {
  /**
   * 行结构 转 树结构
   * - 将平铺的数组转换为树形结构
   * - 返回的树结构与输入行无共享节点（新对象引用），输入行不会被突变
   * - 重复 id 的行只取首次出现；仅叶子/缺失父节点的 id 会作为根节点，且每个根节点只输出一次
   * - `orphan` 默认为 `"promote"`：缺失父节点的行提升为根节点
   * - `orphan` 为 `"drop"`：缺失父节点的行连同其子树整体丢弃
   * - 两种模式都不输出父链成环（无根可达）的行，差异仅在缺失父节点的行是提升为根还是连带子树丢弃
   *
   * @param rows 行数据数组
   * @param options 配置项
   * @returns 树结构数组（所有节点均包含 children 数组）
   * @example
   * ```ts
   * const rows = [
   *   { id: 1, parentId: null },
   *   { id: 2, parentId: 1 },
   * ];
   * TreeUtil.rowsToTree(rows); // [{ id: 1, parentId: null, children: [{ id: 2, parentId: 1, children: [] }] }]
   *
   * const orphanRows = [
   *   { id: 1, parentId: null },
   *   { id: 2, parentId: 999 },
   * ];
   * TreeUtil.rowsToTree(orphanRows, { orphan: "promote" }); // [{ id: 1, ... }, { id: 2, ... }]
   * TreeUtil.rowsToTree(orphanRows, { orphan: "drop" }); // [{ id: 1, ... }]
   * ```
   */
  static rowsToTree<
    T extends AnyObject = AnyObject,
    CK extends string = ChildrenKey,
    R extends AnyObject = TreeLike<T, CK>,
    RK extends string = RowKey,
    PK extends string = ParentIdKey,
  > (
    rows: T[],
    options?: RowsToTreeOptions<RK, PK, CK> | undefined,
  ): R[] {
    const { parentIdKey = "parentId", rowKey = "id", childrenKey = "children", orphan = "promote" } = options || {};
    const result: R[] = [];
    const map = new Map<PropertyKey, T>();
    const processedIds = new Set<PropertyKey>();

    for (const row of rows) {
      const id = row[rowKey];

      if (!map.get(id)) {
        map.set(id, { ...row });
      }
    }

    const retainedIds = orphan === "drop"
      ? collectRetainedIds(rows, map, rowKey, parentIdKey)
      : undefined;

    for (const row of rows) {
      const id = row[rowKey];

      if (processedIds.has(id)) {
        continue;
      }

      processedIds.add(id);

      if (retainedIds && !retainedIds.has(id)) {
        continue;
      }

      const parentId = row[parentIdKey];
      const node = map.get(id);

      if (!node) {
        continue;
      }

      if (isRootRow(id, parentId) || isMissingParent(map, parentId)) {
        result.push(node);

        continue;
      }

      const parent = map.get(parentId)!;
      const siblings = parent[childrenKey];

      if (TypeUtil.isNullish(siblings)) {
        parent[childrenKey] = [node] as T[CK];
      } else if (Array.isArray(siblings)) {
        siblings.push(node);
      } else {
        const message = `The key "${childrenKey.toString()}" in parent item is not an array.`;
        throw new Error(message);
      }
    }

    for (const root of result) {
      TreeUtil.forEach(root, (node) => {
        const record = node as Record<string, unknown>;
        const children = record[childrenKey];

        if (TypeUtil.isNullish(children)) {
          record[childrenKey] = [];
        } else if (!Array.isArray(children)) {
          const message = `The key "${childrenKey.toString()}" in parent item is not an array.`;
          throw new Error(message);
        }
      }, { childrenKey });
    }

    return result;
  }

  /**
   * 树结构 转 行结构
   * - 将树形结构扁平化为数组
   *
   * @param tree 树结构数据 (单个节点或节点数组)
   * @param options 配置项（遍历选项，不含 `prune`）
   * @returns 扁平化后的数组
   * @example
   * ```ts
   * const tree = [{ id: 1, children: [{ id: 2 }] }];
   * TreeUtil.treeToRows(tree); // [{ id: 1, children: undefined }, { id: 2, children: undefined }]
   * ```
   */
  static treeToRows<
    T extends AnyObject,
    CK extends string = ChildrenKey,
    R extends AnyObject = TreeLikeOptionalChildren<T, CK>,
  > (
    tree: T | T[],
    options: TreeToRowsOptions<T, CK> = {},
  ): R[] {
    // 绕过类型传入的 prune 在此剥离，不转发给内部遍历
    const foreachOptions: TreeForeachOptions<T, CK> = options;
    const { prune: _prune, ...rest } = foreachOptions;
    const childrenKey = rest.childrenKey ?? "children";
    const result: R[] = [];

    if (!tree) {
      return result;
    }

    TreeUtil.forEach(tree, (t) => {
      result.push({ ...t, [childrenKey]: undefined });
    }, rest);

    return result;
  }

  /**
   * 遍历树节点
   *
   * @param tree 树结构数据
   * @param callback 回调函数
   * @param options 配置项；`prune` 返回 `true` 时跳过该节点的子树（节点本身仍会被访问），求值时机随 `strategy` 不同，需为纯函数
   * @example
   * ```ts
   * const tree = [{ id: 1, disabled: false, children: [{ id: 2, disabled: true, children: [{ id: 3, disabled: false }] }] }];
   * const ids: number[] = [];
   * TreeUtil.forEach(tree, (node) => ids.push(node.id)); // ids: [1, 2, 3] (pre-order default)
   *
   * const enabledIds: number[] = [];
   * TreeUtil.forEach(tree, (node) => enabledIds.push(node.id), { prune: (node) => node.disabled }); // enabledIds: [1, 2]
   * ```
   */
  static forEach<T extends AnyObject, CK extends string = ChildrenKey> (tree: T | T[], callback: TreeForeachCallback<T>, options: TreeForeachOptions<T, CK> = {}): void {
    const { childrenKey = "children", strategy = "pre", getChildrenKey, prune } = options;
    const traversalMethod = treeForEachStrategies[strategy];
    const innerOptions = { childrenKey: childrenKey as CK, depth: 0, parents: [], getChildrenKey, prune };

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
   * @param options 配置项；`prune` 返回 `true` 时跳过该节点的子树（节点本身仍会被匹配），求值时机随 `strategy` 不同，需为纯函数
   * @returns 找到的节点，未找到则返回 undefined
   * @example
   * ```ts
   * const tree = [{ id: 1, disabled: false, children: [{ id: 2, disabled: true, children: [{ id: 3, disabled: false }] }] }];
   * TreeUtil.find(tree, (node) => node.id === 2); // { id: 2, ... }
   *
   * TreeUtil.find(tree, (node) => node.id === 3, { prune: (node) => node.disabled }); // undefined，停用节点的子树不参与查找
   * ```
   */
  static find<T extends AnyObject, CK extends string = ChildrenKey> (tree: T | T[], callback: TreeFindCallback<T>, options: TreeFindOptions<T, CK> = {}): T | undefined {
    const { childrenKey = "children", strategy = "pre", getChildrenKey, prune } = options;
    const traversalMethod = treeFindStrategies[strategy];
    const innerOptions = { childrenKey: childrenKey as CK, depth: 0, parents: [], getChildrenKey, prune };

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
   *
   * // 重载 1: 传入树数组
   * TreeUtil.filter(tree, (node) => node.visible); // [{ id: 1, visible: true, children: [] }]
   *
   * // 重载 2: 传入单个树节点
   * TreeUtil.filter(tree[0], (node) => node.visible); // { id: 1, visible: true, children: [] }
   * ```
   */
  static filter<T extends AnyObject, CK extends string = ChildrenKey> (tree: T[], callback: TreeFilterCallback<T>, options?: TreeFilterOptions<T, CK>): T[];
  static filter<T extends AnyObject, CK extends string = ChildrenKey> (tree: T, callback: TreeFilterCallback<T>, options?: TreeFilterOptions<T, CK>): T;
  static filter<T extends AnyObject, CK extends string = ChildrenKey> (tree: T | T[], callback: TreeFilterCallback<T>, options: TreeFilterOptions<T, CK> = {}): T | T[] {
    const { childrenKey = "children", strategy = "pre", getChildrenKey } = options;
    const traversalMethod = treeFilterStrategies[strategy];
    const innerOptions = { childrenKey: childrenKey as CK, depth: 0, parents: [], getChildrenKey };

    return TypeUtil.isArray(tree)
      ? tree.map((row) => traversalMethod(row, callback, innerOptions)).filter((t) => !!t)
      : traversalMethod(tree, callback, innerOptions) || [];
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
   *
   * // 重载 1: 传入树数组
   * TreeUtil.map(tree, (node) => ({ ...node, val: node.val * 2 }));
   * // [{ id: 1, val: 20, children: [{ id: 2, val: 40 }] }]
   *
   * // 重载 2: 传入单个树节点
   * TreeUtil.map(tree[0], (node) => ({ ...node, val: node.val * 2 }));
   * // { id: 1, val: 20, children: [{ id: 2, val: 40 }] }
   * ```
   */
  static map<R extends AnyObject, T extends AnyObject, CK extends string = ChildrenKey> (tree: T[], callback: TreeMapCallback<R, T>, options?: TreeMapOptions<T, CK>): TreeLike<R, CK>[];
  static map<R extends AnyObject, T extends AnyObject, CK extends string = ChildrenKey> (tree: T, callback: TreeMapCallback<R, T>, options?: TreeMapOptions<T, CK>): TreeLike<R, CK>;
  static map<R extends AnyObject, T extends AnyObject, CK extends string = ChildrenKey> (tree: T | T[], callback: TreeMapCallback<R, T>, options: TreeMapOptions<T, CK> = {}): TreeLike<R, CK> | TreeLike<R, CK>[] {
    const { childrenKey = "children", strategy = "pre", getChildrenKey } = options;
    const traversalMethod = treeMapStrategies[strategy];
    const innerOptions = { childrenKey: childrenKey as CK, depth: 0, parents: [], getChildrenKey };

    return TypeUtil.isArray(tree)
      ? tree.map((row) => traversalMethod<R, T, CK>(row, callback, innerOptions))
      : traversalMethod<R, T, CK>(tree, callback, innerOptions);
  }
}

function isRootRow (id: PropertyKey, parentId: PropertyKey): boolean {
  return TypeUtil.isNullish(parentId) || parentId === id;
}

function isMissingParent<T> (nodeMap: Map<PropertyKey, T>, parentId: PropertyKey): boolean {
  return !nodeMap.has(parentId);
}

/**
 * 收集从根可达的 id 集合
 * - 根指父 id 为空或自引用的行；缺失父节点与父链成环的行都不可达，其子树随之排除
 * - 每个唯一 id 至多入栈一次：根集合按首次出现写入，邻接表每个 id 只对应一条父边，故遍历无需再判重
 */
function collectRetainedIds<T extends AnyObject, RK extends string, PK extends string> (
  rows: readonly T[],
  nodeMap: Map<PropertyKey, T>,
  rowKey: RK,
  parentIdKey: PK,
): Set<PropertyKey> {
  const childIds = new Map<PropertyKey, PropertyKey[]>();
  const rootIds: PropertyKey[] = [];
  const seenIds = new Set<PropertyKey>();

  for (const row of rows) {
    const id: PropertyKey = row[rowKey];

    if (seenIds.has(id)) {
      continue;
    }

    seenIds.add(id);
    const parentId: PropertyKey = row[parentIdKey];

    if (isRootRow(id, parentId)) {
      rootIds.push(id);

      continue;
    }

    if (isMissingParent(nodeMap, parentId)) {
      continue;
    }

    const siblings = childIds.get(parentId);

    if (siblings) {
      siblings.push(id);
    } else {
      childIds.set(parentId, [id]);
    }
  }

  const retained = new Set<PropertyKey>();
  const stack = [...rootIds];

  while (stack.length) {
    const id = stack.pop()!;

    retained.add(id);
    stack.push(...(childIds.get(id) ?? []));
  }

  return retained;
}
