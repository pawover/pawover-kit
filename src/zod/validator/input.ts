import { z } from "zod";

const _alphabet = /^[a-z]+$/i;
/** 字母 */
export const alphabet = z.string().regex(_alphabet, { error: "应为字母" });

const _alphabetLowercase = /^[a-z]+$/;
/** 小写字母 */
export const alphabetLowercase = z.string().regex(_alphabetLowercase, { error: "应为小写字母" });

const _alphabetUppercase = /^[A-Z]+$/;
/** 大写字母 */
export const alphabetUppercase = z.string().regex(_alphabetUppercase, { error: "应为大写字母" });

const _alphabetOmit = /^[^A-Z]*$/i;
/** 不包含字母 */
export const alphabetOmit = z.string().regex(_alphabetOmit, { error: "应不包含字母" });

const _numberAlphabet = /^[A-Z0-9]+$/i;
/** 数字和字母 */
export const numberAlphabet = z.string().regex(_numberAlphabet, { error: "应为数字和字母组合" });

const _stringSignedDecimalismFloat = /^[+-]?(\d+(\.\d+)?|\.\d+)$/;
/** 有符号十进制浮点数字符串 */
export const stringSignedDecimalismFloat = z.string().regex(_stringSignedDecimalismFloat, { error: "应为十进制数字" });

const _stringUnsignedDecimalismFloat = /^\+?(\d+(\.\d+)?|\.\d+)$/;
/** 无符号十进制浮点数字符串 */
export const stringUnsignedDecimalismFloat = z.string().regex(_stringUnsignedDecimalismFloat, { error: "应为十进制正数" });

const _stringSignedDecimalismInt = /^[+-]?\d+$/;
/** 有符号十进制整数字符串 */
export const stringSignedDecimalismInt = z.string().regex(_stringSignedDecimalismInt, { error: "应为十进制整数" });

const _stringUnsignedDecimalismInt = /^\+?\d+$/;
/** 无符号十进制整数字符串 */
export const stringUnsignedDecimalismInt = z.string().regex(_stringUnsignedDecimalismInt, { error: "应为十进制正整数" });

const _spaceInclude = /^[^ ]+$/;
/** 包含空格 */
export const spaceInclude = z.string().regex(_spaceInclude, { error: "应不包含空格" });

const _spaceStart = /^\S/g;
/** 首空格 */
export const spaceStart = z.string().regex(_spaceStart, { error: "应不包含首空格" });

const _spaceEnd = /\s$/g;
/** 尾空格 */
export const spaceEnd = z.string().regex(_spaceEnd, { error: "应不包含尾空格" });

/** 首尾空格 */
export const spaceStartEnd = spaceStart.and(spaceEnd);
