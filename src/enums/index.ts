export interface BreakPointTokens {
  XS: number;
  XSMin: number;
  XSMax: number;
  SM: number;
  SMMin: number;
  SMMax: number;
  MD: number;
  MDMin: number;
  MDMax: number;
  LG: number;
  LGMin: number;
  LGMax: number;
  XL: number;
  XLMin: number;
  XLMax: number;
  XXL: number;
  XXLMin: number;
}

/** 屏幕响应断点 token 配置 */
export const BREAK_POINT_TOKENS: BreakPointTokens = {
  XS: 576,
  XSMin: 576,
  XSMax: 767,
  SM: 768,
  SMMin: 768,
  SMMax: 991,
  MD: 992,
  MDMin: 992,
  MDMax: 1199,
  LG: 1200,
  LGMin: 1200,
  LGMax: 1599,
  XL: 1600,
  XLMin: 1600,
  XLMax: 1919,
  XXL: 1920,
  XXLMin: 1920,
};
