import { describe, expect, it } from "vitest";
import { ValidateUtil } from "@pawover/kit/utils";

describe("ValidateUtil", () => {
  describe("isPhone", () => {
    it("should validate correct phone numbers", () => {
      expect(ValidateUtil.isPhone("13800138000")).toBe(true);
      expect(ValidateUtil.isPhone("15912345678")).toBe(true);
      expect(ValidateUtil.isPhone("19900001111")).toBe(true);
    });

    it("should reject invalid phone numbers", () => {
      expect(ValidateUtil.isPhone("123")).toBe(false);
      expect(ValidateUtil.isPhone("123456789012345")).toBe(false);
      expect(ValidateUtil.isPhone("abc")).toBe(false);
    });
  });

  describe("isTelephone", () => {
    it("should validate correct telephone numbers", () => {
      expect(ValidateUtil.isTelephone("010-12345678")).toBe(true);
      expect(ValidateUtil.isTelephone("0755-12345678")).toBe(true);
      expect(ValidateUtil.isTelephone("4001234567")).toBe(true);
    });

    it("should reject invalid telephone numbers", () => {
      expect(ValidateUtil.isTelephone("123")).toBe(false);
    });
  });

  describe("isIMEI", () => {
    it("should validate correct IMEI", () => {
      expect(ValidateUtil.isIMEI("490154203237518")).toBe(true);
      expect(ValidateUtil.isIMEI("12345678901234567")).toBe(true);
    });

    it("should reject invalid IMEI", () => {
      expect(ValidateUtil.isIMEI("123")).toBe(false);
    });
  });

  describe("isEmail", () => {
    it("should validate correct emails", () => {
      expect(ValidateUtil.isEmail("dev@example.com")).toBe(true);
      expect(ValidateUtil.isEmail("user.name+tag@domain.co.uk")).toBe(true);
    });

    it("should reject invalid emails", () => {
      expect(ValidateUtil.isEmail("notanemail")).toBe(false);
      expect(ValidateUtil.isEmail("")).toBe(false);
    });
  });

  describe("isHttpLink", () => {
    it("should validate correct http links", () => {
      expect(ValidateUtil.isHttpLink("https://example.com/path")).toBe(true);
      expect(ValidateUtil.isHttpLink("http://example.com")).toBe(true);
      expect(ValidateUtil.isHttpLink("example.com")).toBe(true);
    });

    it("should reject invalid links", () => {
      expect(ValidateUtil.isHttpLink("")).toBe(false);
    });
  });

  describe("isPortLink", () => {
    it("should validate correct port links", () => {
      expect(ValidateUtil.isPortLink("http://example.com:8080")).toBe(true);
      expect(ValidateUtil.isPortLink("example.com:3000")).toBe(true);
    });

    it("should reject missing port", () => {
      expect(ValidateUtil.isPortLink("http://example.com")).toBe(false);
    });
  });

  describe("isThunderLink", () => {
    it("should validate correct thunder links", () => {
      expect(ValidateUtil.isThunderLink("thunder://QUFodHRw=")).toBe(true);
      expect(ValidateUtil.isThunderLink("thunderx://abc123=")).toBe(true);
    });

    it("should reject non-thunder links", () => {
      expect(ValidateUtil.isThunderLink("http://example.com")).toBe(false);
    });
  });

  describe("isUSCC", () => {
    it("should validate correct USCC", () => {
      expect(ValidateUtil.isUSCC("91350100M000100Y43")).toBe(true);
    });

    it("should reject invalid USCC", () => {
      expect(ValidateUtil.isUSCC("123")).toBe(false);
    });
  });

  describe("isUSCCS", () => {
    it("should validate correct USCCS", () => {
      expect(ValidateUtil.isUSCCS("91350100M000100Y43")).toBe(true);
    });

    it("should reject invalid USCCS", () => {
      expect(ValidateUtil.isUSCCS("123")).toBe(false);
    });
  });

  describe("isDirPathWindows", () => {
    it("should validate correct Windows dir paths", () => {
      expect(ValidateUtil.isDirPathWindows("C:\\Users\\pawover\\")).toBe(true);
      expect(ValidateUtil.isDirPathWindows("D:\\temp\\")).toBe(true);
    });

    it("should reject invalid paths", () => {
      expect(ValidateUtil.isDirPathWindows("/usr/local/")).toBe(false);
    });
  });

  describe("isFilePathWindows", () => {
    it("should validate correct Windows file paths", () => {
      expect(ValidateUtil.isFilePathWindows("C:\\Users\\pawover\\a.txt")).toBe(true);
    });

    it("should reject invalid paths", () => {
      expect(ValidateUtil.isFilePathWindows("C:\\Users\\")).toBe(false);
      expect(ValidateUtil.isFilePathWindows("/usr/local/file.txt")).toBe(false);
    });
  });

  describe("isDirPathLinux", () => {
    it("should validate correct Linux dir paths", () => {
      expect(ValidateUtil.isDirPathLinux("/usr/local/")).toBe(true);
      expect(ValidateUtil.isDirPathLinux("/")).toBe(true);
    });

    it("should reject invalid paths", () => {
      expect(ValidateUtil.isDirPathLinux("C:\\Users\\")).toBe(false);
    });
  });

  describe("isFilePathLinux", () => {
    it("should validate correct Linux file paths", () => {
      expect(ValidateUtil.isFilePathLinux("/usr/local/bin/node")).toBe(true);
      expect(ValidateUtil.isFilePathLinux("/")).toBe(true);
    });

    it("should reject invalid paths", () => {
      expect(ValidateUtil.isFilePathLinux("C:\\Users\\a.txt")).toBe(false);
    });
  });

  describe("isEVCarNumber", () => {
    it("should validate correct EV car numbers", () => {
      expect(ValidateUtil.isEVCarNumber("粤AD12345")).toBe(true);
    });

    it("should reject invalid EV car numbers", () => {
      expect(ValidateUtil.isEVCarNumber("粤B12345")).toBe(false);
    });
  });

  describe("isGVCarNumber", () => {
    it("should validate correct GV car numbers", () => {
      expect(ValidateUtil.isGVCarNumber("粤B12345")).toBe(true);
    });

    it("should reject invalid car numbers", () => {
      expect(ValidateUtil.isGVCarNumber("粤A")).toBe(false);
    });
  });

  describe("isChineseName", () => {
    it("should validate correct Chinese names", () => {
      expect(ValidateUtil.isChineseName("张三")).toBe(true);
      expect(ValidateUtil.isChineseName("李四")).toBe(true);
    });

    it("should reject invalid names", () => {
      expect(ValidateUtil.isChineseName("John")).toBe(false);
    });
  });

  describe("isChineseID", () => {
    it("should validate correct Chinese ID", () => {
      expect(ValidateUtil.isChineseID("11010519491231002X")).toBe(true);
      expect(ValidateUtil.isChineseID("11010519491231002x")).toBe(true);
    });

    it("should reject invalid ID", () => {
      expect(ValidateUtil.isChineseID("123")).toBe(false);
    });
  });

  describe("isChineseProvince", () => {
    it("should validate correct provinces", () => {
      expect(ValidateUtil.isChineseProvince("浙江")).toBe(true);
      expect(ValidateUtil.isChineseProvince("北京")).toBe(true);
    });

    it("should reject invalid provinces", () => {
      expect(ValidateUtil.isChineseProvince("Unknown")).toBe(false);
    });
  });

  describe("isChineseNation", () => {
    it("should validate correct nationalities", () => {
      expect(ValidateUtil.isChineseNation("汉族")).toBe(true);
      expect(ValidateUtil.isChineseNation("蒙古族")).toBe(true);
    });

    it("should reject invalid nationalities", () => {
      expect(ValidateUtil.isChineseNation("Unknown")).toBe(false);
    });
  });

  describe("isLetter", () => {
    it("should validate letter-only strings", () => {
      expect(ValidateUtil.isLetter("abcDEF")).toBe(true);
    });

    it("should reject strings with numbers", () => {
      expect(ValidateUtil.isLetter("abc123")).toBe(false);
    });
  });

  describe("isLetterLowercase", () => {
    it("should validate lowercase-only strings", () => {
      expect(ValidateUtil.isLetterLowercase("abc")).toBe(true);
    });

    it("should reject uppercase", () => {
      expect(ValidateUtil.isLetterLowercase("ABC")).toBe(false);
    });
  });

  describe("isLetterUppercase", () => {
    it("should validate uppercase-only strings", () => {
      expect(ValidateUtil.isLetterUppercase("ABC")).toBe(true);
    });

    it("should reject lowercase", () => {
      expect(ValidateUtil.isLetterUppercase("abc")).toBe(false);
    });
  });

  describe("isLetterOmit", () => {
    it("should validate strings without letters", () => {
      expect(ValidateUtil.isLetterOmit("123_-")).toBe(true);
    });

    it("should reject strings with letters", () => {
      expect(ValidateUtil.isLetterOmit("abc")).toBe(false);
    });
  });

  describe("isLetterAndNumber", () => {
    it("should validate alphanumeric strings", () => {
      expect(ValidateUtil.isLetterAndNumber("A1B2")).toBe(true);
    });

    it("should reject strings with special chars", () => {
      expect(ValidateUtil.isLetterAndNumber("A1_B2")).toBe(false);
    });
  });

  describe("isSignedFloat", () => {
    it("should validate signed floats", () => {
      expect(ValidateUtil.isSignedFloat("-12.34")).toBe(true);
      expect(ValidateUtil.isSignedFloat("+3.14")).toBe(true);
      expect(ValidateUtil.isSignedFloat("123")).toBe(true);
    });

    it("should reject non-numeric strings", () => {
      expect(ValidateUtil.isSignedFloat("abc")).toBe(false);
    });
  });

  describe("isUnsignedFloat", () => {
    it("should validate unsigned floats", () => {
      expect(ValidateUtil.isUnsignedFloat("12.34")).toBe(true);
      expect(ValidateUtil.isUnsignedFloat("+5")).toBe(true);
    });

    it("should reject negative numbers", () => {
      expect(ValidateUtil.isUnsignedFloat("-12.34")).toBe(false);
    });
  });

  describe("isSignedInteger", () => {
    it("should validate signed integers", () => {
      expect(ValidateUtil.isSignedInteger("-12")).toBe(true);
      expect(ValidateUtil.isSignedInteger("+5")).toBe(true);
      expect(ValidateUtil.isSignedInteger("0")).toBe(true);
    });

    it("should reject floats", () => {
      expect(ValidateUtil.isSignedInteger("12.34")).toBe(false);
    });
  });

  describe("isUnsignedInteger", () => {
    it("should validate unsigned integers", () => {
      expect(ValidateUtil.isUnsignedInteger("12")).toBe(true);
      expect(ValidateUtil.isUnsignedInteger("+5")).toBe(true);
    });

    it("should reject negative integers", () => {
      expect(ValidateUtil.isUnsignedInteger("-12")).toBe(false);
    });
  });

  describe("isSpaceInclude", () => {
    it("should detect strings with spaces", () => {
      expect(ValidateUtil.isSpaceInclude("a b")).toBe(true);
    });

    it("should reject strings without spaces", () => {
      expect(ValidateUtil.isSpaceInclude("ab")).toBe(false);
    });
  });

  describe("isSpaceStart", () => {
    it("should detect strings starting with space", () => {
      expect(ValidateUtil.isSpaceStart(" abc")).toBe(true);
    });

    it("should reject strings without leading space", () => {
      expect(ValidateUtil.isSpaceStart("abc ")).toBe(false);
    });
  });

  describe("isSpaceEnd", () => {
    it("should detect strings ending with space", () => {
      expect(ValidateUtil.isSpaceEnd("abc ")).toBe(true);
    });

    it("should reject strings without trailing space", () => {
      expect(ValidateUtil.isSpaceEnd(" abc")).toBe(false);
    });
  });

  describe("isSpaceStartOrEnd", () => {
    it("should detect leading or trailing spaces", () => {
      expect(ValidateUtil.isSpaceStartOrEnd(" abc")).toBe(true);
      expect(ValidateUtil.isSpaceStartOrEnd("abc ")).toBe(true);
      expect(ValidateUtil.isSpaceStartOrEnd(" abc ")).toBe(true);
    });

    it("should reject strings without boundary spaces", () => {
      expect(ValidateUtil.isSpaceStartOrEnd("a b")).toBe(false);
      expect(ValidateUtil.isSpaceStartOrEnd("abc")).toBe(false);
    });
  });
});
