import { all, create } from "mathjs";
import { describe, expect, it } from "vitest";
import { mathToBignumber } from "./mathToBignumber";
import { mathToDecimal } from "./mathToDecimal";
import { mathToEvaluate } from "./mathToEvaluate";

const math = create(all!);

describe("mathToBignumber", () => {
  it("应该将字符串转换为 BigNumber", () => {
    const bn = mathToBignumber(math, "0.1");
    expect(math.equal(bn, math.bignumber(0.1))).toBe(true);
  });

  it("无效值应返回 0 或 saveValue", () => {
    const zero = mathToBignumber(math, null);
    expect(math.equal(zero, math.bignumber(0))).toBe(true);

    const safe = mathToBignumber(math, "invalid", math.bignumber(100));
    // stringToNumber parses "invalid" as "0"
    expect(math.equal(safe, math.bignumber(0))).toBe(true);
  });
});

describe("mathToDecimal", () => {
  it("应该格式化为指定精度的字符串", () => {
    expect(mathToDecimal(math, 0.12345, 2)).toBe("0.12");
    expect(mathToDecimal(math, 0.126, 2)).toBe("0.13"); // Round half up usually? MathJS default round mode
  });

  it("当 isFormat 为 false 时返回 BigNumber", () => {
    const res = mathToDecimal(math, 0.1, 2, false);
    expect(math.isBigNumber(res)).toBe(true);
  });
});

describe("mathToEvaluate", () => {
  it("应该计算表达式", () => {
    expect(mathToEvaluate(math, "1 + 2")).toBe("3");
  });

  it("应该使用 scope", () => {
    // @ts-expect-error scope types
    expect(mathToEvaluate(math, "a + b", { a: 1, b: 2 })).toBe("3");
  });
});
