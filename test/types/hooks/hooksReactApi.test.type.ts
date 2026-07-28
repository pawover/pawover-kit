import type { RefObject } from "react";
import { useLatest, useMount, useUnmount } from "@pawover/kit/hooks/react";

// useLatest should return a RefObject<T>
const latestRef: RefObject<number> = useLatest(42);

// useMount should accept EffectCallback
useMount(() => {});

// useUnmount should accept AnyFunction
useUnmount(() => {});

// @ts-expect-error — useMount expects a function
useMount("not a function");

// @ts-expect-error — useUnmount expects a function
useUnmount("not a function");
