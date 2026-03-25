export const DATE_FORMAT = {
  // ISO 8601
  ISO_DATE: "yyyy-MM-dd",
  ISO_TIME: "HH:mm:ss",
  ISO_DATE_TIME: "yyyy-MM-dd HH:mm:ss",
  ISO_DATE_TIME_MS: "yyyy-MM-dd HH:mm:ss.SSS",
  ISO_DATETIME_TZ: "yyyy-MM-dd'T'HH:mm:ssXXX",
  ISO_DATETIME_TZ_MS: "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",

  // US
  US_DATE: "MM/dd/yyyy",
  US_DATE_TIME: "MM/dd/yyyy HH:mm:ss",
  US_DATE_SHORT_YEAR: "MM/dd/yy",

  // EU
  EU_DATE: "dd/MM/yyyy",
  EU_DATE_TIME: "dd/MM/yyyy HH:mm:ss",

  // CN
  CN_DATE: "yyyy年MM月dd日",
  CN_DATE_TIME: "yyyy年MM月dd日 HH时mm分ss秒",
  CN_DATE_WEEKDAY: "yyyy年MM月dd日 EEE",
  CN_WEEKDAY_FULL: "EEEE",

  // 简洁
  SHORT_DATE: "yy-MM-dd",
  SHORT_DATE_SLASH: "yy/MM/dd",
  MONTH_DAY: "MM-dd",
  MONTH_DAY_CN: "MM月dd日",

  // 带星期
  DATE_WITH_WEEKDAY_SHORT: "yyyy-MM-dd (EEE)",
  DATE_WITH_WEEKDAY_FULL: "yyyy-MM-dd (EEEE)",

  // 时间
  TIME_24: "HH:mm:ss",
  TIME_24_NO_SEC: "HH:mm",
  TIME_12: "hh:mm:ss a",
  TIME_12_NO_SEC: "hh:mm a",

  // 时间戳
  TIMESTAMP: "yyyyMMddHHmmss",
  TIMESTAMP_MS: "yyyyMMddHHmmssSSS",

  // RFC
  RFC2822: "EEE, dd MMM yyyy HH:mm:ss xxx",

  // 其他
  READABLE_DATE: "MMM dd, yyyy",
  READABLE_DATE_TIME: "MMM dd, yyyy HH:mm",
  COMPACT_DATETIME: "yyyyMMdd_HHmmss",
} as const;
