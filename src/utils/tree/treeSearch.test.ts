import { describe, expect, it } from "vitest";
import { treeFilter } from "./treeFilter";
import { treeFind } from "./treeFind";

describe("treeFilter", () => {
  const tree = [
    {
      id: 1,
      visible: true,
      children: [
        { id: 2, visible: true, children: [{ id: 3, visible: false }] },
        { id: 4, visible: false },
      ],
    },
    { id: 5, visible: false },
  ];

  it("应该过滤树节点 (pre)", () => {
    // 过滤 visible=true.
    // id 1: true -> keep.
    //   id 2: true -> keep.
    //     id 3: false -> remove.
    //   id 4: false -> remove.
    // id 5: false -> remove.
    const result = treeFilter(tree, (node) => node.visible);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(1);
    expect(result[0]?.children).toHaveLength(1);
    expect(result[0]?.children?.[0]?.id).toBe(2);
    expect(result[0]?.children?.[0]?.children).toHaveLength(0);
  });

  it("应该处理单个对象输入", () => {
    const node = { id: 1, visible: true };
    const result = treeFilter(node, (n) => n.visible);
    expect(result.id).toBe(1);

    const nodeHidden = { id: 2, visible: false };
    const resultHidden = treeFilter(nodeHidden, (n) => n.visible);
    expect(resultHidden).toEqual([]); // Single node filtered out becomes empty array (based on impl)?
    // Impl: traversalMethod(tree) || []
    // preImpl returns undefined if filtered. So returns [].
    // Wait, if input is T, output is T. But if filter filters it out?
    // Let's check impl:
    /* import { isArray } from "../typeof";
          return isArray(tree)
            ? tree.map...
            : traversalMethod(tree, callback, innerOptions) || [];
          If input T, output T. But if undefined returned, `|| []` returns `[]`.
          So T | T[] or actually T | [] ??
          Overload says: `treeFilter<T>(tree: T): T`
          But returns `[]` is not `T` usually. This might be a type mismatch in code?
          Let's verify runtime behavior first.
       */
    expect(resultHidden).toEqual([]);
  });
});

describe("treeFind", () => {
  const tree = [
    {
      id: 1,
      children: [
        { id: 2 },
        { id: 3 },
      ],
    },
    { id: 4 },
  ];

  it("应该找到目标节点", () => {
    const result = treeFind(tree, (node) => node.id === 2);
    expect(result).toBeDefined();
    expect(result?.id).toBe(2);
  });

  it("未找到返回 undefined", () => {
    const result = treeFind(tree, (node) => node.id === 99);
    expect(result).toBeUndefined();
  });

  it("支持深度信息", () => {
    treeFind(tree, (node, meta) => {
      if (node.id === 2) {
        expect(meta.depth).toBe(1);
      }
      if (node.id === 1) {
        expect(meta.depth).toBe(0);
      }

      return false;
    });
  });
});
