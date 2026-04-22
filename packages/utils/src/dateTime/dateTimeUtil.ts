/**
 * 日期工具类
 */
export class DateTimeUtil {
  /**
   * 每秒的毫秒数
   */
  static readonly MILLISECONDS_PER_SECOND: number = 1000;

  /**
   * 每分钟的秒数
   */
  static readonly SECOND_PER_MINUTE: number = 60;

  /**
   * 每小时的分钟数
   */
  static readonly MINUTE_PER_HOUR: number = 60;

  /**
   * 每小时的秒数
   */
  static readonly SECOND_PER_HOUR: number = this.SECOND_PER_MINUTE ** 2;

  /**
   * 每天小时数
   */
  static readonly HOUR_PER_DAY: number = 24;

  /**
   * 每天秒数
   */
  static readonly SECOND_PER_DAY: number = this.SECOND_PER_HOUR * this.HOUR_PER_DAY;

  /**
   * 每周天数
   */
  static readonly DAY_PER_WEEK: number = 7;

  /**
   * 每月天数
   */
  static readonly DAY_PER_MONTH: number = 30;

  /**
   * 每年天数
   */
  static readonly DAY_PER_YEAR: number = 365;

  /**
   * 每年月数
   */
  static readonly MONTH_PER_YEAR: number = 12;

  /**
   * 每年平均周
   */
  static readonly WEEK_PER_YEAR: number = 52;

  /**
   * 每月平均周
   */
  static readonly WEEK_PER_MONTH: number = 4;

  static readonly FORMAT = {
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

  /**
   * 获取当前时区信息
   *
   * @returns 时区信息对象 (UTC偏移和时区名称)
   * @example
   * ```ts
   * DateTimeUtil.getTimeZone(); // { UTC: "UTC+8", timeZone: "Asia/Shanghai" }
   * ```
   */
  static getTimeZone () {
    const hour = 0 - new Date().getTimezoneOffset() / this.MINUTE_PER_HOUR;

    return {
      UTC: "UTC" + (hour >= 0 ? "+" + hour : hour),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }
}
