import type { AnyFunction } from "@pawover/types";
import { arrayZipToObject, objectAssign, objectKeys, stringToUpperCase, objectMapEntries, isEqual } from "../../utils";
import { useMemo, useState, useLayoutEffect } from "react";
import type { TupleToUnion } from "type-fest";
import { BREAK_POINT_TOKEN_ENUM, type BREAK_POINT_TOKEN_TYPE } from "../../enums";

type Breakpoint = TupleToUnion<typeof BREAK_POINTS>;
type ResponsiveValues = Record<Breakpoint, boolean>;

const SUBSCRIBER_SET = new Set<AnyFunction>();
const BREAK_POINTS = ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"] as const;
const DEFAULT_VALUES: ResponsiveValues = Object.freeze(arrayZipToObject(BREAK_POINTS, false));
let responsiveValues: ResponsiveValues = { ...DEFAULT_VALUES };
let responsiveTokens: BREAK_POINT_TOKEN_TYPE = BREAK_POINT_TOKEN_ENUM;

export interface ResponsiveHookOptions {
  /** 屏幕响应断点 token 配置 */
  breakPointTokens?: BREAK_POINT_TOKEN_TYPE;
}
export function useResponsive (options?: ResponsiveHookOptions | undefined) {
  const { breakPointTokens = {} } = options || {};
  const tokens = useMemo(() => objectAssign(BREAK_POINT_TOKEN_ENUM, breakPointTokens), [breakPointTokens]);
  const [responsive, setResponsive] = useState<ResponsiveValues>(() => calculateResponsive(tokens));
  const current = objectKeys(DEFAULT_VALUES).find((key) => responsive[key] === true) || "xs";

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

function calculateResponsive (tokens: BREAK_POINT_TOKEN_TYPE) {
  const config = arrayZipToObject(BREAK_POINTS, BREAK_POINTS.map((t) => tokens[stringToUpperCase(t)]));

  return objectMapEntries(DEFAULT_VALUES, (key) => [key, window.innerWidth >= config[key]]);
}
