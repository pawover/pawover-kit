import type { Except } from "type-fest";
import { isAbortSignal, isBoolean, isFunction, isPositiveInteger } from "../../utils";
import { type EventSourceMessage, getBytes, getLines, getMessages } from "./parse";

const RECONNECTION_DELAY = 1000;
const EVENT_STREAM_CONTENT_TYPE = "text/event-stream";
const LAST_EVENT_ID = "LAST_EVENT_ID";

export type FetchEventSourceOpenEvent = (response: Response) => void | Promise<void>;
export type FetchEventSourceCloseEvent = () => void | Promise<void>;
export type FetchEventSourceMessageEvent = (event: EventSourceMessage) => void | Promise<void>;
export type FetchEventSourceErrorEvent = (error: unknown) => number | undefined | Promise<number | undefined>;
export interface FetchEventSourceOptions extends Except<RequestInit, "headers"> {
  /**
   * The request headers.
   * FetchEventSource only supports the plain object format.
   */
  headers?: PlainObject | AnyFunction<unknown[], PlainObject> | undefined;

  /**
   * Called when a response is received.
   * Use this to validate that the response actually matches what you expect (and throw if it doesn't.) If not provided, will default to a basic validation to ensure the content-type is text/event-stream.
   */
  onopen?: FetchEventSourceOpenEvent | undefined;

  /**
   * Called when a response finishes.
   * If you don't expect the server to kill the connection, you can throw an exception here and retry using onerror.
   */
  onclose?: FetchEventSourceCloseEvent | undefined;

  /**
   * Called when a message is received.
   * Unlike the default browser EventSource.onmessage, this callback is called for _all_ events, even ones with a custom `event` field.
   */
  onmessage?: FetchEventSourceMessageEvent | undefined;

  /**
   * Called when there is any error making the request / processing messages / handling callbacks etc.
   * Use this to control the retry strategy: if the error is fatal, rethrow the error inside the callback to stop the entire operation.
   * Otherwise, you can return an interval (in milliseconds) after which the request will automatically retry (with the last-event-id).
   * If this callback is not specified, or it returns undefined, fetchEventSource will treat every error as retryable and will try again after 1 second.
   */
  onerror?: FetchEventSourceErrorEvent | undefined;

  /**
   * By default, will keep the request open even if the document is hidden.
   * If false, fetchEventSource will close the request and reopen it automatically when the document becomes visible again.
   * @default true
   */
  isKeepConnect?: boolean | undefined;

  /**
   * The delay to wait before reconnection.
   * @unit ms
   * @default 1000
   */
  reconnectionDelay?: number | undefined;

  /**
   * The Fetch function to use.
   * @default fetch
   */
  fetch?: typeof fetch | undefined;
}

/**
 * `@microsoft/fetch-event-source` 的修补版本
 * @see https://github.com/Azure/fetch-event-source
 */
export function fetchEventSource(input: RequestInfo, options?: FetchEventSourceOptions | undefined) {
  const {
    headers: inputHeaders,
    isKeepConnect: inputIsKeepConnect,
    reconnectionDelay: inputReconnectionDelay,
    onopen,
    onclose,
    onmessage,
    onerror,
    fetch: inputFetch,
    signal,
    ...rest
  } = options || {};

  return new Promise<void>((resolve, reject) => {
    const fetchFn = inputFetch ?? fetch;
    const isKeepConnect = isBoolean(inputIsKeepConnect) ? inputIsKeepConnect : true;
    let reconnectionDelay = isPositiveInteger(inputReconnectionDelay) ? inputReconnectionDelay : RECONNECTION_DELAY;
    let reconnectionTimer: NodeJS.Timeout;
    let curRequestController: AbortController;
    const requestHeaders = isFunction(inputHeaders) ? inputHeaders() : { ...inputHeaders };
    if (!requestHeaders["accept"]) {
      requestHeaders["accept"] = EVENT_STREAM_CONTENT_TYPE;
    }

    function onVisibilityChange() {
      // close existing request on every visibility change
      curRequestController.abort();
      if (!document?.hidden) {
        // page is now visible again, recreate request
        create();
      }
    }

    if (typeof document !== "undefined" && !isKeepConnect) {
      document.addEventListener("visibilitychange", onVisibilityChange);
    }

    function dispose() {
      if (typeof document !== "undefined" && !isKeepConnect) {
        document.removeEventListener("visibilitychange", onVisibilityChange);
      }
      clearTimeout(reconnectionTimer);
      curRequestController.abort();
    }

    function onSignalAbort() {
      dispose();
      // don't waste time constructing/logging errors
      resolve();
    }

    // if the incoming signal aborts, dispose resources and resolve
    if (isAbortSignal(signal)) {
      signal.addEventListener("abort", onSignalAbort);
    }

    async function create() {
      if (curRequestController) {
        curRequestController.abort();
      }
      // Store the AbortController instance in function scope to prevent race conditions
      // This ensures that when error handling occurs, we check the abort status
      // of the correct controller instance that was associated with this specific request,
      // rather than potentially checking a new controller created by a subsequent request.
      //
      // Race condition example:
      // 1. Request A starts with Controller A
      // 2. Tab becomes hidden -> Controller A is aborted
      // 3. Tab becomes visible -> Request B starts with Controller B
      // 4. Request A's error handler executes
      // Without this fix, it would check Controller B's status instead of A's
      const currentController = new AbortController();
      curRequestController = currentController;

      try {
        const response = await fetchFn(input, {
          ...rest,
          headers: requestHeaders as AnyObject,
          signal: curRequestController.signal,
        });

        if (isFunction(onopen)) {
          await onopen(response);
        } else {
          const contentType = response.headers.get("content-type");
          if (!contentType?.startsWith(EVENT_STREAM_CONTENT_TYPE)) {
            throw new Error(`Expected content-type to be ${EVENT_STREAM_CONTENT_TYPE}, Actual: ${contentType}`);
          }
        }

        function onId(id: string) {
          if (id) {
            // store the id and send it back on the next retry:
            requestHeaders[LAST_EVENT_ID] = id;
          } else {
            // don't send the last-event-id header anymore:
            delete requestHeaders[LAST_EVENT_ID];
          }
        }
        function onReconnect(delay: number) {
          reconnectionDelay = delay;
        }

        await getBytes(response.body!, getLines(getMessages(onmessage, onId, onReconnect)));

        onclose?.();
        dispose();
        resolve();
      } catch (error) {
        if (!currentController.signal.aborted) {
          // if we haven't aborted the request ourselves:
          try {
            // check if we need to retry:
            const delay = await onerror?.(error) ?? reconnectionDelay;
            clearTimeout(reconnectionTimer);
            reconnectionTimer = setTimeout(create, delay);
          } catch (innerError) {
            // we should not retry anymore:
            dispose();
            reject(innerError);
          }
        }
      }
    }

    create();
  });
}
