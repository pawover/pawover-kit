import { describe, expect, it } from "vitest";
import { arrayDifference } from "./arrayDifference";

describe("arrayDifference", () => {
  it("应该返回差集 (基础类型)", () => {
    expect(arrayDifference([1, 2, 3], [2, 3, 4])).toEqual([1]);
  });

  it("应该返回差集 (对象 + match函数)", () => {
    const list1 = [{ id: 1 }, { id: 2 }];
    const list2 = [{ id: 2 }, { id: 3 }];
    expect(arrayDifference(list1, list2, (x) => x.id)).toEqual([{ id: 1 }]);
  });

  it("没有匹配函数时，应该使用 Set 进行比较", () => {
    expect(arrayDifference([1, 2, 3], [3, 4, 5])).toEqual([1, 2]);
  });

  it("initialList 为空时，应返回空数组 (修正预期行为)", () => {
    // 假设我们期望 A - B，如果 A 是空，结果应该是空
    // 但原代码逻辑可能返回 diffList，这里我们先写个测试看现状，或者直接修复代码
    // 既然我是专家，我应该 assert 正确的行为。
    expect(arrayDifference([], [1, 2])).toEqual([]);
  });

  it("diffList 为空时，应返回 initialList", () => {
    expect(arrayDifference([1, 2], [])).toEqual([1, 2]);
  });
});
