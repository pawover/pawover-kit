import { z } from "zod";

/** 空 */
export const empty = z.union([z.null(), z.undefined()]);

/** 字符串 */
export const string = z.string();
/** 字符串-空 */
export const stringEmpty = z.literal("").nullish();
/** 字符串-非空 */
export const stringNoEmpty = z.string().min(1);
/** 字符串-可空 */
export const stringAllowEmpty = z.string().nullish();

/** 数字 */
export const number = z.number();
/** 数字-可空 */
export const numberAllowEmpty = number.nullish();
/** 整数 */
export const int = z.number().int({ error: "应为整数" });
/** 整数-可空 */
export const intAllowEmpty = int.nullish();
/** 自然数 */
export const natural = int.nonnegative({ error: "应为非负数" });
/** 自然数-可空 */
export const naturalAllowEmpty = natural.nullish();

/** 布尔值 */
export const boolean = z.boolean();
/** 布尔值-可空 */
export const booleanAllowEmpty = z.boolean().nullish();

export const bigint = z.bigint();

export const symbol = z.symbol();

export const any = z.any();

export const unknown = z.unknown();

export const never = z.never();
