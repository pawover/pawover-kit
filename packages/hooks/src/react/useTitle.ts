import { EnvUtil, TypeUtil } from "@pawover/kit-utils";
import { useEffect, useRef } from "react";

import { useUnmount } from "./useUnmount";

interface TitleHookOptions {
  /** 件卸载时是否恢复原始标题 */
  isRestoreOnUnmount?: boolean;
}

/**
 * 设置页面标题
 * - 轻量级，适用于无路由库时设置页面标题
 * - 多个 `useTitle` 实例会互相干扰，需在顶层组件使用
 * - 无法处理 `document.title` 固有的竞态问题
 *
 * @param title 页面标题
 * @param options 配置选项
 */
export function useTitle (title: string, options?: TitleHookOptions | undefined) {
  const titleRef = useRef(EnvUtil.isBrowser() ? document.title : "");

  useEffect(() => {
    if (!TypeUtil.isString(title)) {
      console.error(`hook [useTitle] Expected parameter to be a string, but got ${typeof title}. This effect will not execute.`);

      return;
    }
    if (EnvUtil.isBrowser()) {
      document.title = title;
    }
  }, [title]);

  useUnmount(() => {
    if (EnvUtil.isBrowser() && options?.isRestoreOnUnmount) {
      document.title = titleRef.current;
    }
  });
}
