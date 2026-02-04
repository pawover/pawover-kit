import { useEffect, useState } from "react";
import { BREAK_POINT_TOKEN_ENUM, type BREAK_POINT_TOKEN_TYPE } from "src/enums";
import { objectAssign, objectKeys } from "src/utils";

type Breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
type Subscriber = () => void;
type ResponsiveConfig = Record<Breakpoint, number>;
type ResponsiveValues = Record<Breakpoint, boolean>;

const subscriberList = new Set<Subscriber>();
const { XS, SM, MD, LG, XL, XXL } = BREAK_POINT_TOKEN_ENUM;
const defaultResponsiveValues: ResponsiveValues = { xxl: false, xl: false, lg: false, md: false, sm: false, xs: false };
let responsiveConfig: ResponsiveConfig = { xxl: XXL, xl: XL, lg: LG, md: MD, sm: SM, xs: XS };
let responsiveValues: ResponsiveValues = { ...defaultResponsiveValues };

export interface ResponsiveHookOptions {
  /**
   * 紧凑布局断点
   * - 低于此断点时使用紧凑布局
   * @default "xl"
   */
  compactBreakPoint?: Breakpoint;
  /** 屏幕响应断点 token 配置 */
  breakPointTokens?: BREAK_POINT_TOKEN_TYPE;
}
export function useResponsive (options?: ResponsiveHookOptions) {
  const { compactBreakPoint = "xl", breakPointTokens = {} } = options || {};
  const tokens: BREAK_POINT_TOKEN_TYPE = objectAssign(BREAK_POINT_TOKEN_ENUM, breakPointTokens);
  responsiveConfig = { xxl: tokens.XXL, xl: tokens.XL, lg: tokens.LG, md: tokens.MD, sm: tokens.SM, xs: tokens.XS };

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

  return { responsive, current, isCompact, breakPointTokens: tokens };
}

function resizeListener () {
  const oldInfo = responsiveValues;
  calculate();

  if (oldInfo === responsiveValues) {
    return;
  }

  for (const subscriber of subscriberList) {
    subscriber();
  }
}
function addListener () {
  window.addEventListener("resize", resizeListener);
}
function removeListener () {
  window.removeEventListener("resize", resizeListener);
}
function calculate () {
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

