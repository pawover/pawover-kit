// 全局类型入口探针（`@pawover/kit-types/global` 与 `@pawover/kit-types/react/global`）
//
// 每个全局类型一条 `@ts-expect-error` 反向断言（断言"拒绝一个不可能的值"）。
// 机制：类型引用断裂时（解析失败 → error 类型，"任何值都可赋"），断言将因不再报错而失效
// （Unused '@ts-expect-error' → TS2578），使 check:types / test:types 层直接红——
// 弥补 skipLibCheck: true 跳过 .d.ts 自身检查、无法发现入口声明错误的问题。
// 注：名字缺失（未声明）会作为普通编译错误被 @ts-expect-error 消费（假绿），故"存在性"由
// test/scripts/globalTypes.ts 的严格编译场景（正向使用点）负责，两者互补。
// 全局注入来源：test/tsconfig.json 的 include 已含 packages/types/src/**/*.ts（含两个 .d.ts 入口）。

// Primitive — 拒绝对象
// @ts-expect-error — 全局 Primitive 应拒绝对象（类型坏掉时此断言失效）
const badGlobalPrimitive: Primitive = { a: 1 };

// Nullish — 仅 null | undefined
// @ts-expect-error — 全局 Nullish 应拒绝字符串
const badGlobalNullish: Nullish = "x";

// AnyObject — 值类型受 T 约束
// @ts-expect-error — 全局 AnyObject<"id", number> 的值应为 number
const badGlobalAnyObject: AnyObject<"id", number> = { id: "x" };

// PlainObject — 默认值类型 unknown 不可赋给 string
// @ts-expect-error — 全局 PlainObject 的属性默认为 unknown
const badGlobalPlainObject: string = ({} as PlainObject).key;

// TreeLike — children 键必选
// @ts-expect-error — 全局 TreeLike 缺少 children
const badGlobalTreeLike: TreeLike<{ id: number }> = { id: 1 };

// TreeLikeOptionalChildren — 子节点字段类型不塌缩
// @ts-expect-error — 全局 TreeLikeOptionalChildren 子节点缺 id
const badGlobalTreeLikeOptional: TreeLikeOptionalChildren<{ id: number }> = { id: 1, children: [{}] };

// AnyFunction — 返回类型受 R 约束
// @ts-expect-error — 全局 AnyFunction<[], number> 必须返回 number
const badGlobalAnyFunction: AnyFunction<[], number> = () => "x";

// AnyAsyncFunction — 必须返回 Promise
// @ts-expect-error — 全局 AnyAsyncFunction 必须返回 Promise
const badGlobalAnyAsyncFunction: AnyAsyncFunction = () => {};

// AnyGeneratorFunction — 必须返回 Generator
// @ts-expect-error — 全局 AnyGeneratorFunction 必须返回 Generator
const badGlobalAnyGeneratorFunction: AnyGeneratorFunction<[], number> = () => 1;

// AnyAsyncGeneratorFunction — 必须返回 AsyncGenerator
// @ts-expect-error — 全局 AnyAsyncGeneratorFunction 必须返回 AsyncGenerator
const badGlobalAnyAsyncGeneratorFunction: AnyAsyncGeneratorFunction<[], number> = async () => 1;

// IsPrimitive — 条件求值不塌缩
// @ts-expect-error — IsPrimitive<string> 应为 true
const badGlobalIsPrimitive: IsPrimitive<string> = false;

// HasStringIndex — 条件求值不塌缩
// @ts-expect-error — 具名对象无 string 索引签名，应为 false
const badGlobalHasStringIndex: HasStringIndex<{ a: 1 }> = true;

// AdvancedRecordMode — 元组约束
// @ts-expect-error — 第二元素应为 "W" | "R"
const badGlobalRecordMode: AdvancedRecordMode = ["!", "X"];

// AdvancedRecord — 必选字段缺失
// @ts-expect-error — 全局 AdvancedRecord 必选字段 id 缺失
const badGlobalAdvancedRecord: AdvancedRecord<"id", string> = {};

// ApiNameCheck — 非法字符返回 ""
// @ts-expect-error — 小写字符非法，结果应为 ""
const badGlobalApiName: ApiNameCheck<"GET_USER"> = "get_user";

// Props — 属性类型受 P 约束
// @ts-expect-error — 全局 Props<{ title: string }> 的 title 应为 string
const badGlobalProps: Props<{ title: string }> = { title: 1 };

// PropsWithChildren — 必选字段缺失
// @ts-expect-error — 全局 PropsWithChildren 缺少必选字段 title
const badGlobalPropsWithChildren: PropsWithChildren<{ title: string }> = { children: "content" };

// PropsWithRef — ref 类型受 R 约束
// @ts-expect-error — 全局 PropsWithRef 的 ref 应为 RefObject<HTMLDivElement>
const badGlobalPropsWithRef: PropsWithRef<{}, HTMLDivElement> = { ref: { current: 1 } };
