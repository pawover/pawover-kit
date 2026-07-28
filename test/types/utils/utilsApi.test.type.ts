import { TypeUtil } from "@pawover/kit/utils";

// TypeUtil.isString narrows to string
const stringCheck: boolean = TypeUtil.isString("hello");
const narrowCheck: string = TypeUtil.isString("hello") ? "hello" : "";

// TypeUtil.isNumber narrows to number
const numCheck: number = TypeUtil.isNumber(42) ? 42 : 0;

// TypeUtil.isInteger narrows to number
const intCheck: number = TypeUtil.isInteger(42) ? 42 : 0;

// @ts-expect-error — isString returns boolean, not string
const invalid: string = TypeUtil.isString("hello");

// @ts-expect-error — isNumber returns boolean, not number
const invalidNum: number = TypeUtil.isNumber(42);

// @ts-expect-error — isInteger returns boolean, not number
const invalidInt: number = TypeUtil.isInteger(42);
