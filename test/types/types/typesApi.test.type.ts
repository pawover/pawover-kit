import type { RefObject } from "react";
import type { Props, PropsWithChildren, PropsWithRef } from "@pawover/kit/types/react";
import type {
  AdvancedRecord,
  AdvancedRecordMode,
  AnyAsyncFunction,
  AnyAsyncGeneratorFunction,
  AnyFunction,
  AnyGeneratorFunction,
  AnyObject,
  ApiNameCheck,
  HasStringIndex,
  IsPrimitive,
  PlainObject,
  Primitive,
  TreeLike,
  TreeLikeOptionalChildren,
  VoidFunction,
} from "@pawover/kit/types";

interface TreeNode {
  id: number;
  name: string;
}

// Primitive — must stay wide (string | number | boolean | null | undefined | symbol | bigint)
// @ts-expect-error — Primitive must include non-string members, not narrow to string
const badPrimitiveNarrow: string = "str" as Primitive;

// @ts-expect-error — Primitive must include null (cast would fail) and stay wider than null
const badPrimitiveNull: null = null as Primitive;

// @ts-expect-error — arrays are not primitive
const badPrimitive: Primitive = [1];

// @ts-expect-error — plain objects are not primitive
const badPrimitiveObj: Primitive = { a: 1 };

// AnyObject — generic value type must not collapse to any
// @ts-expect-error — AnyObject<"id", number> must type id as number, not string
const badAnyObjValue: { id: string } = { id: 1 } as AnyObject<"id", number>;

// @ts-expect-error — value type must be number
const badAnyObj: AnyObject<"id", number> = { id: "str" };

// PlainObject — generic value type must not collapse, default stays unknown
// @ts-expect-error — PlainObject<string, string> must type key as string, not number
const badPlainNarrow: { key: number } = { key: "value" } as PlainObject<string, string>;

// @ts-expect-error — default value type is unknown, not string
const badPlainValue: string = ({ key: 1 } as PlainObject).key;

// TreeLike — children must stay an array of nodes, not narrow to []
// @ts-expect-error — TreeLike<TreeNode> children must not narrow to []
const badTreeNarrowChildren: { id: number; name: string; children: [] } = {
  id: 1,
  name: "root",
  children: [{ id: 2, name: "leaf", children: [] }],
} as TreeLike<TreeNode>;

// @ts-expect-error — TreeLike requires children key
const badTree: TreeLike<{ id: number }> = { id: 1 };

// TreeLikeOptionalChildren — node field types must not narrow
// @ts-expect-error — TreeLikeOptionalChildren<TreeNode> must keep id: number
const badOptTreeId: { id: string } = { id: 2, name: "leaf" } as TreeLikeOptionalChildren<TreeNode>;

// @ts-expect-error — child node is missing required id
const badOptTree: TreeLikeOptionalChildren<{ id: number }> = { id: 1, children: [{}] };

// Function types — generic bounds must not collapse to any
// @ts-expect-error — AnyFunction<[string], string> must not collapse to AnyFunction<[number], number>
const badFnBound: AnyFunction<[number], number> = (s: string) => s;

// @ts-expect-error — return type must be number
const badFn: AnyFunction<[], number> = () => "str";

// @ts-expect-error — AnyFunction must stay a function type, not collapse to any
const badAnyFnNull: AnyFunction = null;

// @ts-expect-error — must return a Promise
const badAsyncFn: AnyAsyncFunction = () => {};

// @ts-expect-error — AnyAsyncFunction<[], number> must resolve number, not string
const badAsyncFnBound: AnyAsyncFunction<[], number> = async () => "str";

// @ts-expect-error — must return a Generator
const badGenFn: AnyGeneratorFunction<[], number> = () => 1;

// @ts-expect-error — AnyGeneratorFunction<[], string> must yield string, not number
const badGenFnBound: AnyGeneratorFunction<[], string> = function* () {
  yield 1;
};

// @ts-expect-error — must return an AsyncGenerator
const badAsyncGenFn: AnyAsyncGeneratorFunction<[], number> = async () => 1;

// @ts-expect-error — AnyAsyncGeneratorFunction<[], string> must yield string, not number
const badAsyncGenFnBound: AnyAsyncGeneratorFunction<[], string> = async function* () {
  yield 1;
};

// VoidFunction — parameterless, void-returning
// @ts-expect-error — VoidFunction takes no parameters
const badVoidFn: VoidFunction = (a: number) => {};

// @ts-expect-error — VoidFunction must stay () => void, not narrow to number-returning
const badVoidFnNarrow: () => number = (() => {}) as VoidFunction;

// Conditional types evaluate correctly
// @ts-expect-error — IsPrimitive<string> is true, must not collapse to false
const badIsPrimitiveString: IsPrimitive<string> = false;

// @ts-expect-error — IsPrimitive<{ a: 1 }> is false
const badIsPrimitive: IsPrimitive<{ a: 1 }> = true;

// @ts-expect-error — HasStringIndex<Record<string, number>> is true, must not collapse to false
const badHasStringIndexTrue: HasStringIndex<Record<string, number>> = false;

// @ts-expect-error — { a: 1 } has no string index signature
const badHasStringIndex: HasStringIndex<{ a: 1 }> = true;

// AdvancedRecord — mode tuple and field shapes
// @ts-expect-error — AdvancedRecordMode must stay a union tuple, not narrow to ["!", "W"]
const badModeNarrow: ["!", "W"] = ["!", "W"] as AdvancedRecordMode;

// @ts-expect-error — first element must be "?" or "!"
const badMode: AdvancedRecordMode = ["x", "W"];

// @ts-expect-error — AdvancedRecord<"id" | "name", string> must type id as string, not number
const badReqWritableId: { id: number } = { id: "1", name: "n" } as AdvancedRecord<"id" | "name", string>;

// @ts-expect-error — required field id is missing
const badReqWritable: AdvancedRecord<"id", string> = {};

// @ts-expect-error — AdvancedRecord<"id", string, ["?", "R"]> must type id as string, not number
const badOptReadonlyId: { id: number } = { id: "1" } as AdvancedRecord<"id", string, ["?", "R"]>;

const readonlyRecord: AdvancedRecord<"id", string, ["!", "R"]> = { id: "1" };
// @ts-expect-error — readonly field cannot be reassigned
readonlyRecord.id = "2";

// ApiNameCheck — literal form must not narrow
// @ts-expect-error — ApiNameCheck<"GET_USER"> must stay "GET_USER", not widen to "GET_USER_"
const badApiNameNarrow: "GET_USER_" = "GET_USER" as ApiNameCheck<"GET_USER">;

// @ts-expect-error — lowercase characters are invalid
const badApiName: ApiNameCheck<"GET_USER"> = "get_user";

// React props types
// @ts-expect-error — Props<{ title: string }> must type title as string, not number
const badPropsTitle: { title: number } = { title: "hello" } as Props<{ title: string }>;

const readOnlyProps: Props<{ title: string }> = { title: "hello" };
// @ts-expect-error — props are readonly
readOnlyProps.title = "x";

// @ts-expect-error — PropsWithChildren<{ title: string }> children must stay ReactNode, not number
const badChildrenType: { children: number } = { title: "hello", children: "content" } as PropsWithChildren<{ title: string }>;

// @ts-expect-error — required field title is missing
const badPropsWithChildren: PropsWithChildren<{ title: string }> = { children: "content" };

// 注: HTMLDivElement 与 HTMLSpanElement 在 lib.dom 中结构相同（均为空接口 extends HTMLElement），互为可赋值，故用 HTMLInputElement 区分
// @ts-expect-error — PropsWithRef ref must stay RefObject<HTMLDivElement>, not narrow to RefObject<HTMLInputElement>
const badPropsWithRef: PropsWithRef<{}, HTMLInputElement> = { ref: { current: document.createElement("div") } } as PropsWithRef<{}, HTMLDivElement>;

// @ts-expect-error — ref current must be HTMLDivElement | null
const badPropsWithRefCurrent: PropsWithRef<{}, HTMLDivElement> = { ref: { current: 1 } };
