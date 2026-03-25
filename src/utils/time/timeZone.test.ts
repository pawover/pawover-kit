import { describe, it, expect } from "vitest";
import { getTimeZone } from "./timeZone";

describe("getTimeZone", () => {
  it("should return an object with UTC offset and timeZone properties", () => {
    const result = getTimeZone();

    expect(result).toHaveProperty("UTC");
    expect(result).toHaveProperty("timeZone");

    // Assert types
    expect(typeof result.UTC).toBe("string");
    expect(typeof result.timeZone).toBe("string");

    // Basic format check for UTC string (e.g., "UTC+8", "UTC-5")
    expect(result.UTC).toMatch(/^UTC[+-]\d+(\.\d+)?$/);

    // Basic format check for timeZone string (e.g., "Europe/London", "America/New_York")
    // IANA timezones generally follow this pattern
    expect(result.timeZone).toMatch(/^[A-Za-z_]+\/[A-Za-z_]+$/);
  });

  it("should return a valid IANA time zone identifier", () => {
    const { timeZone } = getTimeZone();

    // Attempt to create a DateTimeFormat with the returned timeZone
    // This will throw an error if the timeZone string is invalid
    expect(() => {
      // eslint-disable-next-line no-new
      new Intl.DateTimeFormat("en-US", { timeZone });
    }).not.toThrow();
  });

  // Note: Testing the exact UTC offset and timeZone name is challenging because they depend on the
  // system running the test. The tests above focus on the format and validity.
  // For example, in a CI environment, the timezone might be UTC (0), or it could be different.
  // The following is an example of how you might test a fixed scenario if needed.
  // it('should calculate UTC offset correctly (example for UTC+8)', () => {
  //   // This test is environment-specific and would only pass if the system is in UTC+8
  //   // Mocking the timezone offset is complex and outside the scope of simple unit tests.
  //   const result = getTimeZone();
  //   // This assertion would only be true in certain timezones.
  //   // expect(result.UTC).toBe('UTC+8'); // Example assertion
  // });
});
