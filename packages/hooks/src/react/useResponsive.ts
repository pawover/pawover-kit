import { ArrayUtil, ObjectUtil, StringUtil } from "@pawover/kit-utils";
import type { AnyFunction } from "@pawover/types";
import { assign, clone, isEqual } from "lodash-es";
import { useLayoutEffect, useMemo, useState } from "react";
import type { TupleToUnion } from "type-fest";

type Breakpoint = TupleToUnion<typeof BREAK_POINTS>;
type ResponsiveValues = Record<Breakpoint, boolean>;
export type BreakPointTokens = Record<keyof typeof BREAK_POINT_TOKEN, number>;

/** 屏幕响应断点 token 配置 */
export const BREAK_POINT_TOKEN = {
  XS: 480,
  XSMax: 575,
  XSMin: 480,

  SM: 576,
  SMMax: 767,
  SMMin: 576,

  MD: 768,
  MDMax: 991,
  MDMin: 768,

  LG: 992,
  LGMax: 1199,
  LGMin: 992,

  XL: 1200,
  XLMax: 1599,
  XLMin: 1200,

  XXL: 1600,
  XXLMax: 1919,
  XXLMin: 1600,

  XXXL: 1920,
  XXXLMin: 1920,
} as const;

const SUBSCRIBER_SET = new Set<AnyFunction>();
const BREAK_POINTS = ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"] as const;
const DEFAULT_VALUES: ResponsiveValues = Object.freeze(ArrayUtil.zipToObject(BREAK_POINTS, false));
let responsiveValues: ResponsiveValues = { ...DEFAULT_VALUES };
let responsiveTokens: BreakPointTokens = clone(BREAK_POINT_TOKEN);

export interface ResponsiveHookOptions {
  /** 屏幕响应断点 token 配置 */
  breakPointTokens?: BreakPointTokens;
}
export function useResponsive (options?: ResponsiveHookOptions | undefined) {
  const { breakPointTokens = {} } = options || {};
  const tokens = useMemo<BreakPointTokens>(() => assign(BREAK_POINT_TOKEN, breakPointTokens), [breakPointTokens]);
  const [responsive, setResponsive] = useState<ResponsiveValues>(() => calculateResponsive(tokens));
  const current = ObjectUtil.keys(DEFAULT_VALUES).find((key) => responsive[key] === true) || "xs";

  useLayoutEffect(() => {
    responsiveTokens = tokens;
    window.addEventListener("resize", resizeListener);

    const subscriber = () => {
      setResponsive(responsiveValues);
    };

    SUBSCRIBER_SET.add(subscriber);

    return () => {
      SUBSCRIBER_SET.delete(subscriber);

      if (!SUBSCRIBER_SET.size) {
        window.removeEventListener("resize", resizeListener);
      }
    };
  }, [tokens]);

  return { responsive, current, breakPointTokens: tokens };
}

function resizeListener () {
  const newValues = calculateResponsive(responsiveTokens);

  if (!isEqual(responsiveValues, newValues)) {
    responsiveValues = newValues;

    for (const subscriber of SUBSCRIBER_SET) {
      subscriber();
    }
  }
}

function calculateResponsive (tokens: BreakPointTokens) {
  const config = ArrayUtil.zipToObject(
    BREAK_POINTS,
    BREAK_POINTS.map((t) => tokens[StringUtil.toUpperCase(t)]),
  );

  return ObjectUtil.entriesMap(DEFAULT_VALUES, (key) => [key, window.innerWidth >= config[key]]);
}
