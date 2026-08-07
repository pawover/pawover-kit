import { describe, expect, it } from "vitest";
import { TreeUtil } from "@pawover/kit/utils";

describe("TreeUtil", () => {
  describe("rowsToTree", () => {
    it("should convert flat rows to tree", () => {
      const rows = [
        { id: 1, parentId: null },
        { id: 2, parentId: 1 },
        { id: 3, parentId: 1 },
      ];
      const tree = TreeUtil.rowsToTree(rows);
      expect(tree).toHaveLength(1);
      expect(tree[0].id).toBe(1);
      expect(tree[0].children).toHaveLength(2);
    });

    it("should handle multiple root nodes", () => {
      const rows = [
        { id: 1, parentId: null },
        { id: 2, parentId: null },
      ];
      const tree = TreeUtil.rowsToTree(rows);
      expect(tree).toHaveLength(2);
    });

    it("should handle empty array", () => {
      expect(TreeUtil.rowsToTree([])).toEqual([]);
    });

    it("should use custom keys", () => {
      const rows = [
        { key: 1, pid: null },
        { key: 2, pid: 1 },
      ];
      const tree = TreeUtil.rowsToTree(rows, { rowKey: "key", parentIdKey: "pid", childrenKey: "kids" });
      expect(tree).toHaveLength(1);
      expect(tree[0]).toHaveProperty("kids");
    });

    it("should throw when children key is not an array", () => {
      const rows = [
        { id: 1, parentId: null, children: "not-an-array" as never },
        { id: 2, parentId: 1 },
      ];
      expect(() => TreeUtil.rowsToTree(rows)).toThrow("not an array");
    });

    it("should handle rows with existing children array", () => {
      const rows = [
        { id: 1, parentId: null, children: [] },
        { id: 2, parentId: 1 },
      ];
      const tree = TreeUtil.rowsToTree(rows);
      expect(tree[0].children).toHaveLength(1);
    });

    it("should handle parentId not found in map", () => {
      const rows = [
        { id: 1, parentId: 999 },
      ];
      const tree = TreeUtil.rowsToTree(rows);
      expect(tree).toHaveLength(1);
    });

    it("should deduplicate duplicate ids by first occurrence", () => {
      const rows = [
        { id: 1, parentId: null, name: "first" },
        { id: 1, parentId: null, name: "second" },
        { id: 1, parentId: null, name: "third" },
      ];
      const tree = TreeUtil.rowsToTree(rows);
      expect(tree).toHaveLength(1);
      expect(tree[0].name).toBe("first");
      expect(tree[0]).not.toBe(rows[0]);
    });

    it("should deduplicate duplicate roots without dropping distinct ids", () => {
      const rows = [
        { id: 1, parentId: null },
        { id: 1, parentId: null },
        { id: 2, parentId: null },
      ];
      const tree = TreeUtil.rowsToTree(rows);
      expect(tree).toHaveLength(2);
      expect(tree[0].id).toBe(1);
      expect(tree[1].id).toBe(2);
    });

    it("should deduplicate duplicate child rows by first occurrence", () => {
      const rows = [
        { id: 1, parentId: null },
        { id: 2, parentId: 1, name: "first" },
        { id: 2, parentId: 1, name: "second" },
      ];
      const tree = TreeUtil.rowsToTree(rows);
      expect(tree).toHaveLength(1);
      expect(tree[0].children).toHaveLength(1);
      expect(tree[0].children[0].name).toBe("first");
    });

    it("should not duplicate a node across root and children when duplicate id rows have different parents", () => {
      const rows = [
        { id: 1, parentId: null, name: "root" },
        { id: 2, parentId: null, name: "first" },
        { id: 2, parentId: 1, name: "second" },
      ];
      const tree = TreeUtil.rowsToTree(rows);
      expect(tree).toHaveLength(2);
      expect(tree[0].children).toHaveLength(0);
      expect(tree[1].children).toHaveLength(0);
    });

    it("should return fresh object references for nodes", () => {
      const rows = [
        { id: 1, parentId: null },
        { id: 2, parentId: 1 },
      ];
      const tree = TreeUtil.rowsToTree(rows);
      expect(tree[0]).not.toBe(rows[0]);
      expect(tree[0].children[0]).not.toBe(rows[1]);
    });

    it("should treat parentId 0 as a valid parent", () => {
      const rows = [
        { id: 0, parentId: null },
        { id: 2, parentId: 0 },
      ];
      const tree = TreeUtil.rowsToTree(rows);
      expect(tree).toHaveLength(1);
      expect(tree[0].id).toBe(0);
      expect(tree[0].children).toHaveLength(1);
    });

    it("should treat self-reference as root", () => {
      const rows = [
        { id: 1, parentId: 1 },
        { id: 2, parentId: 1 },
      ];
      const tree = TreeUtil.rowsToTree(rows);
      expect(tree).toHaveLength(1);
      expect(tree[0].id).toBe(1);
      expect(tree[0].children).toHaveLength(1);
    });

    it("should not mutate input rows", () => {
      const rows = [
        { id: 1, parentId: null },
        { id: 2, parentId: 1 },
      ];
      TreeUtil.rowsToTree(rows);
      expect(rows[1]).not.toHaveProperty("children");
      expect(rows[0]).not.toHaveProperty("children");
    });

    it("should provide children array on every node", () => {
      const rows = [
        { id: 1, parentId: null },
        { id: 2, parentId: 1 },
        { id: 3, parentId: null },
      ];
      const tree = TreeUtil.rowsToTree(rows);
      expect(tree).toHaveLength(2);
      expect(tree[0].children).toHaveLength(1);
      expect(tree[0].children[0].children).toEqual([]);
      expect(tree[1].children).toEqual([]);
    });

    it("should throw when children key is not an array on a leaf node", () => {
      const rows = [
        { id: 1, parentId: null, children: "not-an-array" as never },
      ];
      expect(() => TreeUtil.rowsToTree(rows)).toThrow("not an array");
    });
  });

  describe("treeToRows", () => {
    it("should flatten tree to rows", () => {
      const tree = [{ id: 1, children: [{ id: 2 }] }];
      const rows = TreeUtil.treeToRows(tree);
      expect(rows).toHaveLength(2);
      expect(rows[0].id).toBe(1);
      expect(rows[1].id).toBe(2);
    });

    it("should handle null input", () => {
      expect(TreeUtil.treeToRows(null as never)).toEqual([]);
    });

    it("should handle single node", () => {
      const rows = TreeUtil.treeToRows({ id: 1, children: [] });
      expect(rows).toHaveLength(1);
    });

    it("should set children to undefined", () => {
      const tree = [{ id: 1, children: [{ id: 2 }] }];
      const rows = TreeUtil.treeToRows(tree);
      expect(rows[0].children).toBeUndefined();
    });

    it("should use custom childrenKey", () => {
      const tree = [{ id: 1, items: [{ id: 2 }] }];
      const rows = TreeUtil.treeToRows(tree, { childrenKey: "items" as "items" & "children" });
      expect(rows).toHaveLength(2);
      expect(rows[0].items).toBeUndefined();
    });
  });

  describe("forEach", () => {
    it("should traverse tree in pre-order by default", () => {
      const tree = [{ id: 1, children: [{ id: 2 }, { id: 3 }] }];
      const ids: number[] = [];
      TreeUtil.forEach(tree, (node) => ids.push(node.id));
      expect(ids).toEqual([1, 2, 3]);
    });

    it("should handle single node input", () => {
      const ids: number[] = [];
      TreeUtil.forEach({ id: 1 }, (node) => ids.push(node.id));
      expect(ids).toEqual([1]);
    });

    it("should handle empty array", () => {
      const ids: number[] = [];
      TreeUtil.forEach([] as { id: number }[], (node) => ids.push(node.id));
      expect(ids).toEqual([]);
    });

    it("should traverse in post-order", () => {
      const tree = [{ id: 1, children: [{ id: 2 }, { id: 3 }] }];
      const ids: number[] = [];
      TreeUtil.forEach(tree, (node) => ids.push(node.id), { strategy: "post" });
      expect(ids).toEqual([2, 3, 1]);
    });

    it("should traverse in breadth-order", () => {
      const tree = [{ id: 1, children: [{ id: 2 }, { id: 3 }] }];
      const ids: number[] = [];
      TreeUtil.forEach(tree, (node) => ids.push(node.id), { strategy: "breadth" });
      expect(ids).toEqual([1, 2, 3]);
    });

    it("should provide depth and parents in callback", () => {
      const tree = [{ id: 1, children: [{ id: 2 }] }];
      const depths: number[] = [];
      TreeUtil.forEach(tree, (node, meta) => depths.push(meta.depth));
      expect(depths).toEqual([0, 1]);
    });

    it("should use getChildrenKey for dynamic children resolution", () => {
      const tree = [{ id: 1, items: [{ id: 2 }] }];
      const ids: number[] = [];
      TreeUtil.forEach(tree, (node) => ids.push(node.id), { getChildrenKey: (n) => n.id === 1 ? "items" as const : "children" });
      expect(ids).toEqual([1, 2]);
    });
  });

  describe("find", () => {
    it("should find a node by predicate", () => {
      const tree = [{ id: 1, children: [{ id: 2 }, { id: 3 }] }];
      const found = TreeUtil.find(tree, (node) => node.id === 2);
      expect(found).toBeDefined();
      expect(found!.id).toBe(2);
    });

    it("should return undefined for non-matching predicate", () => {
      const tree = [{ id: 1, children: [{ id: 2 }] }];
      const found = TreeUtil.find(tree, (node) => node.id === 999);
      expect(found).toBeUndefined();
    });

    it("should handle single node", () => {
      const found = TreeUtil.find({ id: 1 }, (node) => node.id === 1);
      expect(found).toBeDefined();
      expect(found!.id).toBe(1);
    });

    it("should return undefined for empty array", () => {
      expect(TreeUtil.find([] as { id: number }[], (node) => node.id === 1)).toBeUndefined();
    });

    it("should find in post-order", () => {
      const tree = [{ id: 1, children: [{ id: 2 }] }];
      const found = TreeUtil.find(tree, (node) => node.id === 2, { strategy: "post" });
      expect(found).toBeDefined();
      expect(found!.id).toBe(2);
    });

    it("should find in breadth-order", () => {
      const tree = [{ id: 1, children: [{ id: 2 }] }];
      const found = TreeUtil.find(tree, (node) => node.id === 2, { strategy: "breadth" });
      expect(found).toBeDefined();
      expect(found!.id).toBe(2);
    });

    it("should return undefined when not found in breadth-order", () => {
      const tree = [{ id: 1, children: [{ id: 2 }] }];
      const found = TreeUtil.find(tree, (node) => node.id === 999, { strategy: "breadth" });
      expect(found).toBeUndefined();
    });

    it("should find root in breadth-order", () => {
      const tree = [{ id: 1, children: [{ id: 2 }] }];
      const found = TreeUtil.find(tree, (node) => node.id === 1, { strategy: "breadth" });
      expect(found).toBeDefined();
      expect(found!.id).toBe(1);
    });
  });

  describe("filter", () => {
    it("should filter tree nodes", () => {
      const tree = [{ id: 1, visible: true, children: [{ id: 2, visible: false }, { id: 3, visible: true }] }];
      const filtered = TreeUtil.filter(tree, (node) => node.visible);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(1);
    });

    it("should handle single node", () => {
      const filtered = TreeUtil.filter({ id: 1, visible: true } as never, (node) => node.visible);
      expect(filtered).toBeDefined();
    });

    it("should filter out all nodes", () => {
      const tree = [{ id: 1, visible: false }];
      const filtered = TreeUtil.filter(tree, (node) => node.visible);
      expect(filtered).toHaveLength(0);
    });

    it("should filter in post-order", () => {
      const tree = [{ id: 1, visible: true, children: [{ id: 2, visible: false }] }];
      const filtered = TreeUtil.filter(tree, (node) => node.visible, { strategy: "post" });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(1);
    });

    it("should visit deepest nodes first in post-order", () => {
      const tree = [{ id: 1, visible: true, children: [{ id: 2, visible: true, children: [{ id: 3, visible: true }] }] }];
      const visited: number[] = [];
      TreeUtil.filter(tree, (node) => {
        visited.push(node.id);
        return true;
      }, { strategy: "post" });
      expect(visited).toEqual([3, 2, 1]);
    });

    it("should filter in breadth-order", () => {
      const tree = [{ id: 1, visible: true, children: [{ id: 2, visible: false }, { id: 3, visible: true }] }];
      const filtered = TreeUtil.filter(tree, (node) => node.visible, { strategy: "breadth" });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(1);
    });

    it("should return empty for single non-matching node", () => {
      const filtered = TreeUtil.filter({ id: 1, visible: false } as never, (node) => node.visible);
      expect(filtered).toEqual([]);
    });
  });

  describe("map", () => {
    it("should map tree nodes", () => {
      const tree = [{ id: 1, val: 10, children: [{ id: 2, val: 20 }] }];
      const mapped = TreeUtil.map(tree, (node) => ({ ...node, val: node.val * 2 }));
      expect(mapped).toHaveLength(1);
      expect(mapped[0].val).toBe(20);
      expect(mapped[0]).toHaveProperty("children");
    });

    it("should handle single node", () => {
      const mapped = TreeUtil.map({ id: 1, val: 10 }, (node) => ({ ...node, val: node.val * 2 }));
      expect(mapped.val).toBe(20);
    });

    it("should handle empty array", () => {
      expect(TreeUtil.map([], (node) => node)).toEqual([]);
    });

    it("should map in post-order", () => {
      const tree = [{ id: 1, val: 10, children: [{ id: 2, val: 20 }] }];
      const mapped = TreeUtil.map(tree, (node) => ({ ...node, val: node.val * 2 }), { strategy: "post" });
      expect(mapped).toHaveLength(1);
      expect(mapped[0].val).toBe(20);
    });

    it("should map in breadth-order", () => {
      const tree = [{ id: 1, val: 10, children: [{ id: 2, val: 20 }] }];
      const mapped = TreeUtil.map(tree, (node) => ({ ...node, val: node.val * 2 }), { strategy: "breadth" });
      expect(mapped).toHaveLength(1);
      expect(mapped[0].val).toBe(20);
    });

    it("should use getChildrenKey for dynamic resolution", () => {
      const tree = [{ id: 1, kids: [{ id: 2 }] }];
      const mapped = TreeUtil.map(tree, (node) => ({ ...node }), { getChildrenKey: (n) => n.id === 1 ? "kids" as const : "children" });
      expect(mapped).toHaveLength(1);
    });

    it("should keep children key as undefined when no children", () => {
      const tree = [{ id: 1 }];
      const mapped = TreeUtil.map(tree, (node) => ({ ...node }));
      expect(mapped[0]).toHaveProperty("children", undefined);
    });
  });
});
