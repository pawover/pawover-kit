/**
 * 获取当前时区信息
 *
 * @returns 时区信息对象 (UTC偏移和时区名称)
 * @example
 * ```ts
 * getTimeZone(); // { UTC: "UTC+8", timeZone: "Asia/Shanghai" }
 * ```
 */
export function getTimeZone () {
  const hour = 0 - new Date().getTimezoneOffset() / 60;

  return {
    UTC: "UTC" + (hour >= 0 ? "+" + hour : hour),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}
