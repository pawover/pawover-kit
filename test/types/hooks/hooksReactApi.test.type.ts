import type { RefObject } from "react";
import { useLatest, useMount, useUnmount } from "@pawover/kit/hooks/react";

// useLatest must return a ref object and keep the generic value type
// @ts-expect-error — useLatest(42) must return RefObject<number>, not number
const badLatest: number = useLatest(42);

// @ts-expect-error — useLatest(42) must not narrow to RefObject<string>
const badLatestSpan: RefObject<string> = useLatest(42);

// useMount / useUnmount must return void
// @ts-expect-error — useMount must return void, not number
const badMount: number = useMount(() => {});

// @ts-expect-error — useUnmount must return void, not number
const badUnmount: number = useUnmount(() => {});

// @ts-expect-error — useMount expects a function
useMount("not a function");

// @ts-expect-error — useUnmount expects a function
useUnmount("not a function");
