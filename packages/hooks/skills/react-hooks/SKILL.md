---
name: react-hooks
description: >-
  Use when adding mount or unmount effects, latest-value refs, responsive
  breakpoint state, or document title management to a React app with
  @pawover/kit-hooks/react.
metadata:
  purpose: Add React lifecycle, latest-value, responsive breakpoint, and
    document title behavior with @pawover/kit-hooks.
  type: framework
  framework: React
  library: "@pawover/kit-hooks"
  library_version: "0.0.9"
requires: []
sources:
  - src/react/useMount.ts
  - src/react/useUnmount.ts
  - src/react/useLatest.ts
  - src/react/useResponsive.ts
  - src/react/useTitle.ts
---

# Use `@pawover/kit-hooks/react`

This entry provides five small React hooks. It has a peer dependency on `react`.
The package root is empty by design; import from the `/react` or `/alova`
subpath, never from `@pawover/kit-hooks` or `@pawover/kit/hooks`.

## Setup

```tsx
import { useLatest, useMount, useResponsive, useTitle, useUnmount } from "@pawover/kit-hooks/react";
```

With the aggregate package, use `@pawover/kit/hooks/react` instead.

## Core patterns

### Run mount and unmount effects

`useMount` runs the effect after the first mount. It is designed to run once
even when React StrictMode replays effects. `useUnmount` runs the latest callback
when the component unmounts. Both hooks keep the latest callback in a ref, so
inline functions do not need to be memoized.

```tsx
import { useMount, useUnmount } from "@pawover/kit-hooks/react";

function Panel() {
  useMount(() => {
    console.log("mounted");
    return () => console.log("mount cleanup");
  });

  useUnmount(() => {
    console.log("unmounted");
  });

  return <div>Panel</div>;
}
```

`useMount` accepts an async function, but an async function returns a Promise,
not a cleanup function. Manage async cancellation with an `AbortController` or a
ref, and do not return a Promise expecting React to call it.

```tsx
import { useMount } from "@pawover/kit-hooks/react";

function DataPanel() {
  useMount(async () => {
    const controller = new AbortController();
    await fetch("/api/data", { signal: controller.signal });
    // Cleanup cannot be returned from an async effect; store the controller
    // in a ref or close over it in a synchronous cleanup.
  });

  return <div>Data</div>;
}
```

### Keep a ref to the latest value

`useLatest` updates a ref during render and returns the ref. It does not trigger a
re-render and does not replace state. Use it for callbacks that need the newest
props or state without re-subscribing.

```tsx
import { useEffect, useState } from "react";
import { useLatest } from "@pawover/kit-hooks/react";

function Counter() {
  const [count, setCount] = useState(0);
  const latestCount = useLatest(count);

  useEffect(() => {
    const id = setInterval(() => console.log(latestCount.current), 1000);
    return () => clearInterval(id);
  }, [latestCount]);

  return <button onClick={() => setCount((value) => value + 1)}>{count}</button>;
}
```

`useLatest` returns a `RefObject<T>`, not the value itself. Read `.current` when
the latest value is needed.

### Render responsive breakpoint state

`useResponsive` returns `responsive`, `current`, and the merged
`breakPointTokens`. Each key is `true` when the viewport is at least that
breakpoint; the mapping is cumulative. `current` is the largest matched
breakpoint.

```tsx
import { useResponsive } from "@pawover/kit-hooks/react";

function Layout() {
  const { responsive, current } = useResponsive();

  return (
    <div>
      <p>Current: {current}</p>
      {responsive.md && <aside>Sidebar from 768px</aside>}
      {responsive.xs && <p>Small screen</p>}
    </div>
  );
}
```

Override individual tokens for one hook instance. The override is merged over
the immutable default table and does not affect other instances.

```tsx
import { BREAK_POINT_TOKEN, useResponsive } from "@pawover/kit-hooks/react";

const tokens = { ...BREAK_POINT_TOKEN, MD: 800 };

function Layout() {
  const { responsive, breakPointTokens } = useResponsive({ breakPointTokens: tokens });
  return <aside>{responsive.md ? `Sidebar from ${breakPointTokens.MD}px` : null}</aside>;
}
```

Instances with the same token signature share one resize calculation. The hook
registers one global resize listener and removes it when the last subscriber
unmounts.

`useResponsive` reads `window.innerWidth` during render. Do not render it on the
server; gate it behind a client-only boundary, or provide a browser-only wrapper.

### Manage the document title

`useTitle` sets `document.title` after render and is a no-op on the server. It is
a lightweight hook for pages without a routing library. Multiple instances
overwrite each other, so use one instance at a time (typically per page).

```tsx
import { useTitle } from "@pawover/kit-hooks/react";

function Dashboard() {
  useTitle("Dashboard", { isRestoreOnUnmount: true });
  return <main>Dashboard</main>;
}
```

`isRestoreOnUnmount` defaults to `false`. When enabled, the title captured before
the first render is restored on unmount.

## Common mistakes

### Importing from the package root

The package root exports nothing:

```ts no-check
import { useMount } from "@pawover/kit-hooks";
```

Use `@pawover/kit-hooks/react` or `@pawover/kit/hooks/react`.

### Returning cleanup from an async `useMount`

An async effect returns a Promise. React expects a cleanup function or
`undefined`, so the Promise is ignored. Use a synchronous effect that returns a
cleanup, or manage cancellation explicitly.

```ts no-check
useMount(async () => {
  return () => console.log("never called as cleanup");
});
```

### Expecting `useLatest` to re-render

Mutating `ref.current` does not schedule a render. Pair `useLatest` with state
when the UI must update.

### Using `useResponsive` during SSR

`useResponsive` accesses `window.innerWidth` in its state initializer. A server
render fails with `window is not defined`. Render the component only on the
client, or wrap it in an SSR-safe boundary.

### Using multiple `useTitle` instances

The hook writes `document.title` directly. Two mounted instances fight over the
title and the last effect wins. Use one instance per active page.

### Trying to read `props` from the `useTitle` option

`useTitle` takes a title string and an optional `{ isRestoreOnUnmount }` object.
It does not accept a function or a React node.

## Completion

- Hooks are imported from `/react` or `/hooks/react`, never from the package
  root.
- `useMount` cleanup is synchronous; async cancellation is handled explicitly.
- `useLatest` is read through `.current`.
- `useResponsive` is rendered on the client only and uses the intended token
  overrides.
- Only one `useTitle` instance is active for a page.
