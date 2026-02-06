import { useEffect, useRef } from "react";
import { isBrowser } from "../../utils";
import { useUnmount } from "./useUnmount";

interface TitleHookConfig {
  isRestoreOnUnmount?: boolean;
}
export function useTitle (title: string, config?: TitleHookConfig | undefined) {
  if (!isBrowser()) {
    return;
  }

  const titleRef = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useUnmount(() => {
    if (config?.isRestoreOnUnmount) {
      document.title = titleRef.current;
    }
  });
}
