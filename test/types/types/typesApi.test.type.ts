import type { RefObject } from "react";
import type {
  Props,
  PropsWithChildren,
  PropsWithRef,
} from "@pawover/kit/types/react";
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

// Primitive accepts all primitive values
const primitiveString: Primitive = "str";
const primitiveNumber: Primitive = 42;
const primitiveNull: Primitive = null;

// AnyObject accepts any key-value object
const anyObj: AnyObject = { a: 1, b: "2" };
const numObj: AnyObject<"id", number> = { id: 1 };

// PlainObject accepts any key-value object with unknown values
const plainObj: PlainObject = { key: 1 };
const strMap: PlainObject<string, string> = { key: "value" };

// TreeLike requires children key
interface TreeNode {
  id: number;
  name: string;
}
const tree: TreeLike<TreeNode> = {
  id: 1,
  name: "root",
  children: [{ id: 2, name: "leaf", children: [] }],
};

// TreeLikeOptionalChildren allows omitting children key
const leaf: TreeLikeOptionalChildren<TreeNode> = { id: 2, name: "leaf" };
const optTree: TreeLikeOptionalChildren<TreeNode> = { id: 1, name: "root", children: [leaf] };

// Function types accept matching signatures
const fn: AnyFunction = () => {};
const strFn: AnyFunction<[string], string> = (s) => s.toUpperCase();
const asyncFn: AnyAsyncFunction = async () => {};
const genFn: AnyGeneratorFunction<[], number> = function* () {
  yield 1;
};
const asyncGenFn: AnyAsyncGeneratorFunction<[], number> = async function* () {
  yield 1;
};
const voidFn: VoidFunction = () => {};

// Conditional types evaluate correctly
const isPrimitiveTrue: IsPrimitive<string> = true;
const isPrimitiveFalse: IsPrimitive<{ a: 1 }> = false;
const hasStringIndexTrue: HasStringIndex<Record<string, number>> = true;
const hasStringIndexFalse: HasStringIndex<{ a: 1 }> = false;

// AdvancedRecord builds records by mode
const reqWritableMode: AdvancedRecordMode = ["!", "W"];
type ReqWritable = AdvancedRecord<"id" | "name", string>;
const reqWritable: ReqWritable = { id: "1", name: "n" };
type OptReadonly = AdvancedRecord<"id", string, ["?", "R"]>;
const optReadonly: OptReadonly = { id: "1" };

// ApiNameCheck validates and normalizes API names
const apiName: ApiNameCheck<"GET_USER"> = "GET_USER";
const apiNameStripped: ApiNameCheck<"GET_USER_"> = "GET_USER";

// React props types
const props: Props<{ title: string }> = { title: "hello" };
const propsWithChildren: PropsWithChildren<{ title: string }> = { title: "hello", children: "content" };
const ref: RefObject<HTMLDivElement> = { current: document.createElement("div") };
const propsWithRef: PropsWithRef<{ title: string }, HTMLDivElement> = { title: "hello", ref };

// @ts-expect-error — arrays are not primitive
const badPrimitive: Primitive = [1];

// @ts-expect-error — value type must be number
const badAnyObj: AnyObject<"id", number> = { id: "str" };

// @ts-expect-error — default value type is unknown, not string
const badPlainValue: string = plainObj.key;

// @ts-expect-error — TreeLike requires children key
const badTree: TreeLike<{ id: number }> = { id: 1 };

// @ts-expect-error — child node is missing required id
const badOptTree: TreeLikeOptionalChildren<{ id: number }> = { id: 1, children: [{}] };

// @ts-expect-error — return type must be number
const badFn: AnyFunction<[], number> = () => "str";

// @ts-expect-error — must return a Promise
const badAsyncFn: AnyAsyncFunction = () => {};

// @ts-expect-error — must return a Generator
const badGenFn: AnyGeneratorFunction<[], number> = () => 1;

// @ts-expect-error — must return an AsyncGenerator
const badAsyncGenFn: AnyAsyncGeneratorFunction<[], number> = async () => 1;

// @ts-expect-error — VoidFunction takes no parameters
const badVoidFn: VoidFunction = (a: number) => {};

// @ts-expect-error — IsPrimitive<{ a: 1 }> is false
const badIsPrimitive: IsPrimitive<{ a: 1 }> = true;

// @ts-expect-error — { a: 1 } has no string index signature
const badHasStringIndex: HasStringIndex<{ a: 1 }> = true;

// @ts-expect-error — first element must be "?" or "!"
const badMode: AdvancedRecordMode = ["x", "W"];

// @ts-expect-error — required field id is missing
const badReqWritable: AdvancedRecord<"id", string> = {};

const readonlyRecord: AdvancedRecord<"id", string, ["!", "R"]> = { id: "1" };
// @ts-expect-error — readonly field cannot be reassigned
readonlyRecord.id = "2";

// @ts-expect-error — lowercase characters are invalid
const badApiName: ApiNameCheck<"GET_USER"> = "get_user";

const readOnlyProps: Props<{ title: string }> = { title: "hello" };
// @ts-expect-error — props are readonly
readOnlyProps.title = "x";

// @ts-expect-error — required field title is missing
const badPropsWithChildren: PropsWithChildren<{ title: string }> = { children: "content" };

// @ts-expect-error — ref current must be HTMLDivElement | null
const badPropsWithRef: PropsWithRef<{}, HTMLDivElement> = { ref: { current: 1 } };
