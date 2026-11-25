---
name: alova-hooks
description: >-
  Use when wiring Alova requests, pagination, or watcher-driven requests with
  @pawover/kit-hooks/alova in a React, Vue, Svelte, or Solid app, especially when
  adding onBeforeRequest, onSuccess, onError, or onComplete callbacks. The
  framework is selected by the Alova instance's statesHook, not by this package.
metadata:
  purpose: Integrate Alova request, pagination, and watcher hooks through
    @pawover/kit-hooks; the framework adapter comes from the Alova instance's
    statesHook.
  type: framework
  framework: Alova
  library: "@pawover/kit-hooks"
  library_version: "0.0.9"
requires: []
sources:
  - src/alova/useAlovaRequest.ts
  - src/alova/useAlovaPagination.ts
  - src/alova/useAlovaWatcher.ts
  - src/alova/createBeforeRequestMiddleware.ts
  - src/alova/hookOptions.ts
---

# Use `@pawover/kit-hooks/alova`

This entry wraps Alova's `useRequest`, `usePagination`, and `useWatcher`. It adds
four lifecycle callbacks (`onBeforeRequest`, `onSuccess`, `onError`,
`onComplete`) and defaults request/pagination to `immediate: true`.

The entry is framework-agnostic: it imports only `alova` and `alova/client`.
Alova selects the React, Vue, Svelte, or Solid state adapter from the
`statesHook` passed to `createAlova`, so the framework is a property of the
Alova instance, not of this package. `react` is an optional peer used only by the
separate `/react` subpath; it is not required to use this entry from a Vue,
Svelte, or Solid app.

## Setup

Create the Alova instance with the `statesHook` that matches the UI framework,
then pass a method handler to the hook.

```tsx
import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import ReactHook from "alova/react";
import { useAlovaRequest } from "@pawover/kit-hooks/alova";

const alova = createAlova({
  baseURL: "https://api.example.com",
  requestAdapter: adapterFetch(),
  statesHook: ReactHook,
});

function UserProfile({ userId }: { userId: string }) {
  const { loading, data, send } = useAlovaRequest(
    () => alova.Get(`/users/${userId}`),
    {
      onBeforeRequest: () => console.log("before"),
      onSuccess: (response) => console.log("success", response.data),
      onError: (error) => console.error("error", error),
      onComplete: () => console.log("complete"),
    },
  );

  if (loading) {
    return <div>Loading…</div>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

With the aggregate package, use `@pawover/kit/hooks/alova` instead. Do not import
from `@pawover/kit-hooks` or `@pawover/kit/hooks`; the package root is empty.

## Framework adapters

The hooks call Alova's client hooks, which read the adapter from the instance.
Swap `statesHook` (and install the matching framework package) to reuse the same
hooks in another framework.

### Vue

```ts
import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import VueHook from "alova/vue";

const alova = createAlova({
  baseURL: "https://api.example.com",
  requestAdapter: adapterFetch(),
  statesHook: VueHook,
});
```

```vue
<script setup lang="ts">
import { useAlovaRequest } from "@pawover/kit-hooks/alova";

const { loading, data, send } = useAlovaRequest(
  () => alova.Get("/users/1"),
  { immediate: false },
);
</script>

<template>
  <button @click="send()">Load</button>
  <pre v-if="!loading">{{ data }}</pre>
</template>
```

`useAlovaRequest` returns refs for `loading` and `data` under `VueHook`, so read
them in the template without `.value`. Import the same `alova` instance the app
created above; the adapter must be the one bound to that instance.

### Svelte and Solid

Import the adapter from `alova/svelte` or `alova/solid` and pass it as
`statesHook`. The hooks themselves are unchanged; only the returned state shape
differs per adapter.

## Core patterns

### Request with lifecycle callbacks

`useAlovaRequest` passes the method handler and options to Alova's `useRequest`
and returns its exposure. `immediate` defaults to `true`; pass `{ immediate:
false }` when the request should wait for `send()`.

```tsx
import { useAlovaRequest } from "@pawover/kit-hooks/alova";

function UserProfile({ userId }: { userId: string }) {
  const { loading, data, send } = useAlovaRequest(
    () => alova.Get(`/users/${userId}`),
    { immediate: false },
  );

  return (
    <div>
      <button onClick={() => send()}>Load</button>
      {loading ? "Loading…" : <pre>{JSON.stringify(data)}</pre>}
    </div>
  );
}
```

The four callbacks are attached to the Alova exposure. `onBeforeRequest` is not
an Alova option; the wrapper composes it into the request middleware. The other
three are registered on the exposure and follow Alova's success / error /
complete timing.

### Compose `onBeforeRequest` with existing middleware

`onBeforeRequest` is a wrapper option, not an Alova option. The hook composes it
into `options.middleware` automatically. If the project already has middleware,
pass both: the wrapper runs the callback before delegating to the existing
middleware.

```tsx
import { useAlovaRequest } from "@pawover/kit-hooks/alova";

function ProtectedData() {
  return useAlovaRequest(
    () => alova.Get("/me"),
    {
      middleware: existingMiddleware,
      onBeforeRequest: (context) => {
        context.config.headers = { Authorization: `Bearer ${getToken()}` };
      },
    },
  );
}
```

For multiple `onBeforeRequest` handlers, compose them in order or build one
middleware that runs each step. The wrapper does not merge arrays of callbacks.

### Pagination

`useAlovaPagination` expects a method handler `(page, pageSize, ...args)`. It
defaults to `immediate: true` and returns the Alova pagination exposure, including
`page`, `pageSize`, `data`, `total`, `loading`, and `update`.

```tsx
import { useAlovaPagination } from "@pawover/kit-hooks/alova";

function UserList() {
  const { page, pageSize, data, total, loading, update } = useAlovaPagination(
    (pageNumber, currentPageSize) =>
      alova.Get("/users", { params: { page: pageNumber, pageSize: currentPageSize } }),
    { initialPage: 1, initialPageSize: 20 },
  );

  return (
    <div>
      <ul>
        {data?.list?.map((user: { id: number; name: string }) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={() => update({ page: page + 1 })}>
        Next ({total} total)
      </button>
    </div>
  );
}
```

The method handler receives `page` and `pageSize` as numbers. Do not read them
from a stale closure; use the values passed to the handler. The hook watches
`page` and `pageSize` by default, so `update({ page })` triggers the next fetch.
Pass `onPageChange` only if a newer Alova version exposes it; this package
returns the upstream `usePagination` exposure unchanged.

### Watcher-driven requests

`useAlovaWatcher` sends a request when one of the watched states changes. It does
**not** default `immediate` to `true`; pass `{ immediate: true }` when the first
render should fetch.

```tsx
import { useState } from "react";
import { useAlovaWatcher } from "@pawover/kit-hooks/alova";

function Search() {
  const [keyword, setKeyword] = useState("");
  const { data, loading } = useAlovaWatcher(
    () => alova.Get("/search", { params: { q: keyword } }),
    [keyword],
    { immediate: true },
  );

  return (
    <div>
      <input value={keyword} onChange={(event) => setKeyword(event.target.value)} />
      {loading ? "Searching…" : <pre>{JSON.stringify(data)}</pre>}
    </div>
  );
}
```

The watched states array is positional: Alova compares each entry between
renders. Pass the state values themselves, not a derived object that is recreated
on every render. Under `VueHook`, pass refs or reactive sources; under
`ReactHook`, pass the current values.

## Common mistakes

### Importing from the package root

The root entries are empty:

```ts no-check
import { useAlovaRequest } from "@pawover/kit-hooks";
import { useAlovaRequest } from "@pawover/kit/hooks";
```

Use `@pawover/kit-hooks/alova` or `@pawover/kit/hooks/alova`.

### Installing the wrong peer for the chosen framework

The hooks resolve `alova` and `alova/client` at runtime, so `alova` is required.
The framework package is resolved by the adapter you import into `createAlova`:
a React app installs `react` together with `ReactHook`, a Vue app installs `vue`
with `VueHook`. Installing `@pawover/kit-hooks` alone is never enough, and a Vue
app does not need `react`.

### Omitting `statesHook` from `createAlova`

The hooks rely on Alova's state adapter. When `statesHook` is missing, Alova
throws at the first hook call. Pass the adapter for the UI framework explicitly
instead of relying on a default.

### Expecting `useAlovaWatcher` to fetch immediately

Unlike the request and pagination hooks, the watcher passes options through
without setting `immediate`. Add `{ immediate: true }` if the first render
should fetch.

### Passing `onBeforeRequest` as an Alova option and also as middleware

`onBeforeRequest` is a wrapper option. It is composed into `options.middleware`
automatically. If the project also passes `middleware`, the wrapper chains the
callback before the existing middleware; do not duplicate the callback inside
both places.

### Reading pagination fields from the wrong object

`useAlovaPagination` returns the Alova pagination exposure. Use its `data`,
`total`, `page`, `pageSize`, and `update`; do not expect a separate pagination
object or a `onPageChange` helper.

## Completion

- The hook is imported from `/alova` or `/hooks/alova`.
- `alova` is installed, and the Alova instance uses the `statesHook` for the UI
  framework (`ReactHook`, `VueHook`, `SvelteHook`, or `SolidHook`).
- Request and pagination hooks set `immediate: false` when the request should be
  manual.
- Watcher hooks pass `immediate: true` when the first render should fetch.
- `onBeforeRequest` is supplied once and is not duplicated in middleware.
