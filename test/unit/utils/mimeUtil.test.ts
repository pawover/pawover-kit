import { describe, expect, it } from "vitest";
import { MimeUtil } from "@pawover/kit/utils";

describe("MimeUtil", () => {
  describe("FILE_MIME", () => {
    it("should have common MIME types", () => {
      expect(MimeUtil.FILE_MIME.JSON).toBe("application/json");
      expect(MimeUtil.FILE_MIME.HTML).toBe("text/html");
      expect(MimeUtil.FILE_MIME.PNG).toBe("image/png");
      expect(MimeUtil.FILE_MIME.PDF).toBe("application/pdf");
    });

    it("should have legacy variants", () => {
      expect(MimeUtil.FILE_MIME.XML_LEGACY).toBe("text/xml");
      expect(MimeUtil.FILE_MIME.ICO_LEGACY).toBe("image/x-icon");
    });
  });

  describe("PROTOCOL_MIME", () => {
    it("should have protocol MIME types", () => {
      expect(MimeUtil.PROTOCOL_MIME.OCTET_STREAM).toBe("application/octet-stream");
      expect(MimeUtil.PROTOCOL_MIME.FORM_DATA).toBe("multipart/form-data");
    });
  });

  describe("fromExtension", () => {
    it("should return MIME for known extensions with dot", () => {
      const result = MimeUtil.fromExtension(".png");
      expect(result).toBeDefined();
      expect(result![0]).toBe("image/png");
    });

    it("should return MIME for known extensions without dot", () => {
      const result = MimeUtil.fromExtension("png");
      expect(result![0]).toBe("image/png");
    });

    it("should return multiple MIMEs for extensions with legacy", () => {
      const result = MimeUtil.fromExtension(".xml");
      expect(result).toEqual(["application/xml", "text/xml"]);
    });

    it("should return undefined for unknown extensions", () => {
      expect(MimeUtil.fromExtension(".xyz")).toBeUndefined();
    });

    it("should be case-insensitive", () => {
      expect(MimeUtil.fromExtension(".PNG")![0]).toBe("image/png");
      expect(MimeUtil.fromExtension(".XML")![0]).toBe("application/xml");
    });
  });

  describe("toExtension", () => {
    it("should return extension for known MIME", () => {
      const result = MimeUtil.toExtension("image/png");
      expect(result).toBeDefined();
      expect(result![0]).toBe(".png");
    });

    it("should return multiple extensions when MIME maps to several", () => {
      const result = MimeUtil.toExtension("text/html");
      expect(result).toContain(".html");
      expect(result).toContain(".htm");
    });

    it("should be case-insensitive", () => {
      const result = MimeUtil.toExtension("IMAGE/PNG");
      expect(result![0]).toBe(".png");
    });

    it("should return undefined for protocol MIME", () => {
      expect(MimeUtil.toExtension("application/octet-stream")).toBeUndefined();
    });
  });
});
