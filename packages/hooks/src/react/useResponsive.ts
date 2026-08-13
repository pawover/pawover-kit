import { ArrayUtil, ObjectUtil, StringUtil } from "@pawover/kit-utils";
import type { AnyFunction } from "@pawover/kit-types";
import { isEqual } from "es-toolkit";
import { useLayoutEffect, useMemo, useState } from "react";
import type { TupleToUnion } from "type-fest";

type Breakpoint = TupleToUnion<typeof BREAK_POINTS>;
type ResponsiveValues = Record<Breakpoint, boolean>;
export type BreakPointTokens = Record<keyof typeof BREAK_POINT_TOKEN, number>;

/** 屏幕响应断点 token 默认表（不可变，实例在此基础上做覆盖合并） */
export const BREAK_POINT_TOKEN = Object.freeze({
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
} as const);

const BREAK_POINTS = ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"] as const;
const DEFAULT_VALUES: ResponsiveValues = Object.freeze(ArrayUtil.zipToObject(BREAK_POINTS, false));

interface ResponsiveEntry {
  tokens: BreakPointTokens;
  values: ResponsiveValues;
  subscribers: Set<AnyFunction>;
}

const ENTRY_MAP = new Map<string, ResponsiveEntry>();

export interface ResponsiveHookOptions {
  /** 屏幕响应断点 token 覆盖配置（在默认表之上合并） */
  breakPointTokens?: Partial<BreakPointTokens>;
}

/**
 * 屏幕响应式 Hook，监听窗口尺寸变化并返回各断点命中状态
 * - 全局仅注册一个 resize 监听器，按「断点 token 签名」共享计算结果：token 相同的实例共享一次计算与状态
 * - 实例通过 options 覆盖断点 token，覆盖仅作用于该实例，不会改写默认表
 * - 断点 token 变化时自动重新订阅
 *
 * @param options 配置项
 * @returns 响应式状态（各断点是否命中）、当前断点、合并后的断点 token
 * @example
 * // 默认断点表
 * const { responsive, current } = useResponsive();
 *
 * // 覆盖部分断点（仅当前实例生效）
 * const { responsive } = useResponsive({ breakPointTokens: { XS: 100, XL: 99999 } });
 */
export function useResponsive (options?: ResponsiveHookOptions | undefined) {
  const { breakPointTokens = {} } = options || {};
  const tokens = useMemo<BreakPointTokens>(() => ({ ...BREAK_POINT_TOKEN, ...breakPointTokens }), [breakPointTokens]);
  const signature = useMemo(() => JSON.stringify(tokens), [tokens]);
  const [responsive, setResponsive] = useState<ResponsiveValues>(() => calculateResponsive(tokens));
  const current = ObjectUtil.keys(DEFAULT_VALUES).find((key) => responsive[key] === true) || "xs";

  useLayoutEffect(() => {
    let entry = ENTRY_MAP.get(signature);

    if (!entry) {
      entry = { tokens, values: calculateResponsive(tokens), subscribers: new Set() };
      ENTRY_MAP.set(signature, entry);
    }

    const activeEntry = entry;
    const subscriber: AnyFunction = () => setResponsive(activeEntry.values);

    activeEntry.subscribers.add(subscriber);
    window.addEventListener("resize", resizeListener);

    return () => {
      activeEntry.subscribers.delete(subscriber);

      if (!activeEntry.subscribers.size) {
        ENTRY_MAP.delete(signature);
      }

      if (!ENTRY_MAP.size) {
        window.removeEventListener("resize", resizeListener);
      }
    };
  }, [signature, tokens]);

  return { responsive, current, breakPointTokens: tokens };
}

function resizeListener () {
  const width = window.innerWidth;

  for (const entry of ENTRY_MAP.values()) {
    const newValues = calculateResponsive(entry.tokens, width);

    if (!isEqual(entry.values, newValues)) {
      entry.values = newValues;

      for (const subscriber of entry.subscribers) {
        subscriber();
      }
    }
  }
}

function calculateResponsive (tokens: BreakPointTokens, width = window.innerWidth): ResponsiveValues {
  const config = ArrayUtil.zipToObject(
    BREAK_POINTS,
    BREAK_POINTS.map((t) => tokens[StringUtil.toUpperCase(t)]),
  );

  return ObjectUtil.entriesMap(DEFAULT_VALUES, (key) => [key, width >= config[key]]);
}