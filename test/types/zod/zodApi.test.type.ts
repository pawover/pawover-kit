import { id } from "@pawover/kit/zod";
import type { z } from "zod";

// Validate inferred type
type IdType = z.infer<typeof id>;
const idStr: IdType = "abc";
const idNum: IdType = 123;

// @ts-expect-error — IdType is string | number, not boolean
const idBool: IdType = true;

// @ts-expect-error — IdType is string | number, not object
const idObj: IdType = {};
