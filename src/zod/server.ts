import { z } from "zod";

export const id = z.union([z.string().min(1), z.number().int()]);

export const idAllowEmpty = id.nullish();
