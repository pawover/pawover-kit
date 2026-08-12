import { CurrencyUtil, TypeUtil } from "@pawover/kit/utils";
import { all, create } from "mathjs";

const math = create(all);

// TypeUtil.isString must keep returning boolean (not collapse to string / any)
// @ts-expect-error — isString returns boolean, not string
const invalidStringTarget: string = TypeUtil.isString("hello");

// @ts-expect-error — isString returns boolean, not number
const invalidNumberTarget: number = TypeUtil.isString("hello");

// @ts-expect-error — isNumber returns boolean, not number
const invalidNum: number = TypeUtil.isNumber(42);

// @ts-expect-error — isInteger returns boolean, not number
const invalidInt: number = TypeUtil.isInteger(42);

// CurrencyUtil.toRealValue — omitted stringMode must return string
// @ts-expect-error — omitted stringMode returns string, not number
const invalidRealStrDefault: number = CurrencyUtil.toRealValue(math, "0.1");

// @ts-expect-error — precision overload must keep returning string, not number
const invalidRealStrPrecision: number = CurrencyUtil.toRealValue(math, 0.1 + 0.2, 2);

// CurrencyUtil.toRealValue — stringMode = true → string
// @ts-expect-error — stringMode = true returns string, not number
const invalidRealStr: number = CurrencyUtil.toRealValue(math, "0.1", undefined, true);

// CurrencyUtil.toRealValue — stringMode = false → number
// @ts-expect-error — stringMode = false returns number, not string
const invalidRealNum: string = CurrencyUtil.toRealValue(math, "0.1", undefined, false);

// CurrencyUtil.toRealValue — stringMode as boolean → number | string (must not collapse)
// 注: const mode: boolean = false 会被 TS 6 收窄为字面量 false，故用函数参数保持真实 boolean 类型
function assertBooleanMode(mode: boolean): void {
  // @ts-expect-error — boolean stringMode must NOT collapse to number
  const invalidRealModeNum: number = CurrencyUtil.toRealValue(math, "0.1", undefined, mode);

  // @ts-expect-error — boolean stringMode must NOT collapse to string
  const invalidRealModeStr: string = CurrencyUtil.toRealValue(math, "0.1", undefined, mode);

  // @ts-expect-error — nullable value + boolean stringMode must append null
  const invalidRealUnion: number | string = CurrencyUtil.toRealValue(math, null, 2, mode);
}

function assertBooleanOrUndefinedMode(mode: boolean | undefined): void {
  // @ts-expect-error — boolean | undefined stringMode must NOT collapse to number
  const invalidRealMode: number = CurrencyUtil.toRealValue(math, "0.1", 2, mode);
}

// CurrencyUtil.toRealValue — nullable value must append null to result
// @ts-expect-error — null value must return string | null, not plain string
const invalidRealNull: string = CurrencyUtil.toRealValue(math, null);

// @ts-expect-error — null + stringMode = false must return number | null, not plain number
const invalidRealNullFalse: number = CurrencyUtil.toRealValue(math, null, 2, false);

// @ts-expect-error — undefined + stringMode = true must return string | null, not plain string
const invalidRealNullTrue: string = CurrencyUtil.toRealValue(math, undefined, 2, true);

const nullableValue: string | number | null = null;

// @ts-expect-error — nullable union + stringMode = false must return number | null, not plain number
const invalidRealNullable: number = CurrencyUtil.toRealValue(math, nullableValue, 2, false);
