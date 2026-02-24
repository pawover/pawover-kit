export type BREAK_POINT_TOKEN_TYPE = Record<keyof typeof BREAK_POINT_TOKEN_ENUM, number>;
/** 屏幕响应断点 token 配置 */
export const BREAK_POINT_TOKEN_ENUM = {
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
