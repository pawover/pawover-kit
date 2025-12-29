export function getTimeZone() {
  const hour = 0 - new Date().getTimezoneOffset() / 60;

  return {
    UTC: "UTC" + (hour >= 0 ? "+" + hour : hour),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}
