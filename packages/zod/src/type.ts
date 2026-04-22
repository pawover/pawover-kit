import { z } from "zod";

/** 空 */
export const empty = z.union([z.null(), z.undefined()]);

/** 字符串 */
export const string = z.string();
/** 字符串-空 */
export const stringEmpty = z.literal("").nullish();
/** 字符串-非空 */
export const stringNoEmpty = string.min(1);
/** 字符串-可空 */
export const stringAllowEmpty = string.nullish();

/** 数字 */
export const number = z.number();
/** 数字-可空 */
export const numberAllowEmpty = number.nullish();
/** 整数 */
export const integer = number.int();
/** 整数-可空 */
export const integerAllowEmpty = integer.nullish();
/** 整数-正整数和零 */
export const integerPositive = integer.nonnegative().int();
/** 整数-正整数和零-可空 */
export const integerPositiveAllowEmpty = integerPositive.nullish();
/** 整数-负整数和零 */
export const integerNegative = integer.nonpositive().int();
/** 整数-负整数和零-可空 */
export const integerNegativeAllowEmpty = integerNegative.nullish();

/** 布尔值 */
export const boolean = z.boolean();
/** 布尔值-可空 */
export const booleanAllowEmpty = boolean.nullish();
/** 大数字 */
export const bigint = z.bigint();
/** 大数字-可空 */
export const bigintAllowEmpty = bigint.nullish();
/** 大数字-正整数和零 */
export const bigintPositive = bigint.nonnegative();
/** 大数字-正整数和零-可空 */
export const bigintPositiveAllowEmpty = bigintPositive.nullish();
/** 大数字-负整数和零 */
export const bigintNegative = bigint.nonpositive();
/** 大数字-负整数和零-可空 */
export const bigintNegativeAllowEmpty = bigintNegative.nullish();

export const symbol = z.symbol();

export const any = z.any();

export const unknown = z.unknown();

export const never = z.never();

export const propertyKey = z.union([string, number, symbol]);

export const anyObject = z.record(propertyKey, any);

export const plainObject = z.record(propertyKey, unknown);
