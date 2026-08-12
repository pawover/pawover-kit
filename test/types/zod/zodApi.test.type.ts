import { id } from "@pawover/kit/zod";
import type { z } from "zod";

// z.infer<typeof id> must stay string | number
type IdType = z.infer<typeof id>;

// @ts-expect-error — IdType must include string (cast would fail) and stay wider than number
const badIdTypeNumber: number = "abc" as IdType;

// @ts-expect-error — IdType must include number (cast would fail) and stay wider than string
const badIdTypeString: string = 123 as IdType;

// @ts-expect-error — IdType is string | number, not boolean
const badIdTypeBoolean: IdType = true;

// @ts-expect-error — IdType is string | number, not object
const badIdTypeObject: IdType = {};
