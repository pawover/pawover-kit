import { describe, expect, it } from "vitest";
import { rowsToTree } from "./rowsToTree";
import { treeToRows } from "./treeToRows";

describe("rowsToTree", () => {
  it("应该将扁平数组转换为树", () => {
    const rows = [
      { id: 1, parentId: null },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 1 },
      { id: 4, parentId: 2 },
    ];
    const tree = rowsToTree(rows);
    expect(tree).toHaveLength(1);
    expect(tree[0]?.id).toBe(1);
    expect(tree[0]?.children).toHaveLength(2);
    expect(tree[0]?.children?.[0]?.id).toBe(2);
    expect(tree[0]?.children?.[0]?.children).toHaveLength(1);
  });

  it("应该支持自定义 key", () => {
    const rows = [
      { uid: "root", pid: null },
      { uid: "child", pid: "root" },
    ];
    const tree = rowsToTree(rows, { rowKey: "uid", parentIdKey: "pid", childrenKey: "subs" });
    expect(tree[0]?.subs).toHaveLength(1);
    // @ts-expect-error test
    expect(tree[0]?.subs[0].uid).toBe("child");
  });

  it("父节点不存在时，作为根节点", () => {
    const rows = [
      { id: 2, parentId: 999 }, // parent missing
      { id: 1, parentId: null },
    ];
    const tree = rowsToTree(rows);
    expect(tree).toHaveLength(2);
  });
});

describe("treeToRows", () => {
  it("应该将树转换为扁平数组", () => {
    const tree = [
      {
        id: 1,
        children: [
          { id: 2, children: [] },
          { id: 3 },
        ],
      },
    ];
    const rows = treeToRows(tree);
    expect(rows).toHaveLength(3);
    const ids = rows.map((r) => r.id).sort();
    expect(ids).toEqual([1, 2, 3]);
  });

  it("应该移除 children 属性 (设为 undefined)", () => {
    const tree = [{ id: 1, children: [] }];
    const rows = treeToRows(tree);
    expect(rows[0]?.children).toBeUndefined();
  });

  it("应该处理空输入", () => {
    // @ts-expect-error test
    expect(treeToRows(null)).toEqual([]);
  });
});
