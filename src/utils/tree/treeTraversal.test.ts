import { describe, expect, it } from "vitest";
import { treeForEach } from "./treeForEach";
import { treeMap } from "./treeMap";

describe("treeForEach", () => {
  const tree = [
    {
      id: 1,
      children: [
        { id: 2 },
        { id: 3 },
      ],
    },
  ];

  it("应该前置遍历树节点", () => {
    const ids: number[] = [];
    treeForEach(tree, (node) => ids.push(node.id), { strategy: "pre" });
    expect(ids).toEqual([1, 2, 3]); // pre-order: root -> child1 -> child2
  });

  it("应该后置遍历树节点", () => {
    const ids: number[] = [];
    treeForEach(tree, (node) => ids.push(node.id), { strategy: "post" });
    expect(ids).toEqual([2, 3, 1]); // post-order: child1 -> child2 -> root
  });

  it("应该广度优先遍历树节点", () => {
    const ids: number[] = [];
    treeForEach(tree, (node) => ids.push(node.id), { strategy: "breadth" });
    expect(ids).toEqual([1, 2, 3]); // breadth: root -> children (order depends on siblings logic, usually sequential)
    // Implementation uses queue.shift() -> breadth. 1 then 2, 3.
  });
});

describe("treeMap", () => {
  const tree = [
    {
      id: 1,
      val: 10,
      children: [
        { id: 2, val: 20 },
      ],
    },
  ];

  it("应该映射并返回新树", () => {
    const result = treeMap(tree, (node) => ({ ...node, val: node.val * 2 }));
    expect(result).toHaveLength(1);
    expect(result[0]!.val).toBe(20);
    expect(result[0]!.children?.[0]!.val).toBe(40);
  });
});
