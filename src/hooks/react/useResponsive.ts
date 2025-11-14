import type { Breakpoint } from "@pawover/types";
import { useEffect, useState } from "react";
import { BREAK_POINT_TOKENS } from "src/enums";
import { objectKeys } from "src/utils";

type Subscriber = () => void;
type ResponsiveConfig = Record<Breakpoint, number>;
type ResponsiveValues = Record<Breakpoint, boolean>;

const subscriberList = new Set<Subscriber>();
const { XS, SM, MD, LG, XL, XXL } = BREAK_POINT_TOKENS;
const defaultResponsiveValues: ResponsiveValues = { xxl: false, xl: false, lg: false, md: false, sm: false, xs: false };
const responsiveConfig: ResponsiveConfig = Object.freeze({ xs: XS, sm: SM, md: MD, lg: LG, xl: XL, xxl: XXL });
let responsiveValues: ResponsiveValues = { ...defaultResponsiveValues };

interface ResponsiveHookOptions {
  /**
   * 紧凑布局断点
   * - 低于此断点时使用紧凑布局
   * @default "xl"
   */
  compactBreakPoint?: Breakpoint;
  /** 屏幕响应断点 token 配置 */
  // breakPointTokens?: Record<keyof typeof BREAK_POINT_TOKENS, number>;
}
export function useResponsive(options?: ResponsiveHookOptions) {
  const { compactBreakPoint = "xl" } = options || {};

  calculate();

  const [responsive, setResponsive] = useState<ResponsiveValues>(responsiveValues);
  const isCompact = !responsive[compactBreakPoint];
  const current = objectKeys(defaultResponsiveValues).find((key) => responsive[key] === true) || "xs";

  useEffect(() => {
    addListener();

    const subscriber = () => {
      setResponsive(responsiveValues);
    };

    subscriberList.add(subscriber);

    return () => {
      subscriberList.delete(subscriber);

      if (subscriberList.size === 0) {
        removeListener();
      }
    };
  }, []);

  return { responsive, current, isCompact };
}

function resizeListener() {
  const oldInfo = responsiveValues;
  calculate();

  if (oldInfo === responsiveValues) {
    return;
  }

  for (const subscriber of subscriberList) {
    subscriber();
  }
}
function addListener() {
  window.addEventListener("resize", resizeListener);
}
function removeListener() {
  window.removeEventListener("resize", resizeListener);
}
function calculate() {
  const width = window.innerWidth;
  const newValues = { ...defaultResponsiveValues };
  let shouldUpdate = false;

  for (const key of objectKeys(responsiveConfig)) {
    newValues[key] = width >= responsiveConfig[key];
    if (newValues[key] !== responsiveValues[key]) {
      shouldUpdate = true;
    }
  }
  if (shouldUpdate) {
    responsiveValues = newValues;
  }
}
