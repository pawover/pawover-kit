import { describe, expect, it } from "vitest";
import { DateTimeUtil } from "@pawover/kit/utils";

describe("DateTimeUtil", () => {
  describe("time constants", () => {
    it("MILLISECONDS_PER_SECOND should be 1000", () => {
      expect(DateTimeUtil.MILLISECONDS_PER_SECOND).toBe(1000);
    });

    it("SECOND_PER_MINUTE should be 60", () => {
      expect(DateTimeUtil.SECOND_PER_MINUTE).toBe(60);
    });

    it("MINUTE_PER_HOUR should be 60", () => {
      expect(DateTimeUtil.MINUTE_PER_HOUR).toBe(60);
    });

    it("SECOND_PER_HOUR should be 3600", () => {
      expect(DateTimeUtil.SECOND_PER_HOUR).toBe(3600);
    });

    it("HOUR_PER_DAY should be 24", () => {
      expect(DateTimeUtil.HOUR_PER_DAY).toBe(24);
    });

    it("SECOND_PER_DAY should be 86400", () => {
      expect(DateTimeUtil.SECOND_PER_DAY).toBe(86400);
    });

    it("DAY_PER_WEEK should be 7", () => {
      expect(DateTimeUtil.DAY_PER_WEEK).toBe(7);
    });

    it("DAY_PER_MONTH should be 30", () => {
      expect(DateTimeUtil.DAY_PER_MONTH).toBe(30);
    });

    it("DAY_PER_YEAR should be 365", () => {
      expect(DateTimeUtil.DAY_PER_YEAR).toBe(365);
    });

    it("MONTH_PER_YEAR should be 12", () => {
      expect(DateTimeUtil.MONTH_PER_YEAR).toBe(12);
    });

    it("WEEK_PER_YEAR should be 52", () => {
      expect(DateTimeUtil.WEEK_PER_YEAR).toBe(52);
    });

    it("WEEK_PER_MONTH should be 4", () => {
      expect(DateTimeUtil.WEEK_PER_MONTH).toBe(4);
    });
  });

  describe("FORMAT", () => {
    it("should have common format templates", () => {
      expect(DateTimeUtil.FORMAT.ISO_DATE).toBe("yyyy-MM-dd");
      expect(DateTimeUtil.FORMAT.ISO_DATE_TIME).toBe("yyyy-MM-dd HH:mm:ss");
      expect(DateTimeUtil.FORMAT.CN_DATE).toBe("yyyy年MM月dd日");
      expect(DateTimeUtil.FORMAT.US_DATE).toBe("MM/dd/yyyy");
      expect(DateTimeUtil.FORMAT.TIMESTAMP).toBe("yyyyMMddHHmmss");
    });
  });

  describe("getTimeZone", () => {
    it("should return an object with UTC and timeZone", () => {
      const tz = DateTimeUtil.getTimeZone();
      expect(tz).toHaveProperty("UTC");
      expect(tz).toHaveProperty("timeZone");
      expect(typeof tz.UTC).toBe("string");
      expect(typeof tz.timeZone).toBe("string");
    });

    it("should format UTC offset with colon for half-hour timezones", () => {
      expect(DateTimeUtil.getTimeZone().UTC).toMatch(/^UTC[+-]\d{1,2}(:\d{2})?$/);
    });
  });
});
