import { useEffect, useRef } from "react";
import { isBrowser } from "../../utils";
import { useUnmount } from "./useUnmount";

interface TitleHookOptions {
  isRestoreOnUnmount?: boolean;
}
export function useTitle (title: string, options?: TitleHookOptions | undefined) {
  if (!isBrowser()) {
    return;
  }

  const titleRef = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useUnmount(() => {
    if (options?.isRestoreOnUnmount) {
      document.title = titleRef.current;
    }
  });
}
