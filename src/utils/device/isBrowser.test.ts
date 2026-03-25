import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isBrowser, isWebWorker } from "./index";

describe("Environment Detection", () => {
  describe("isBrowser", () => {
    // Mock global properties for testing
    let originalWindow: any;
    let originalDocument: any;

    beforeEach(() => {
      originalWindow = global.window;
      originalDocument = global.document;
    });

    afterEach(() => {
      // Restore original globals after each test
      if (originalWindow === undefined) {
        delete (global as any).window;
      } else {
        (global as any).window = originalWindow;
      }
      if (originalDocument === undefined) {
        delete (global as any).document;
      } else {
        (global as any).document = originalDocument;
      }
      vi.restoreAllMocks();
    });

    it("should return true in a browser-like environment with window and document.createElement", () => {
      (global as any).window = { document: { createElement: () => {} } };
      expect(isBrowser()).toBe(true);
    });

    it("should return false if window is undefined", () => {
      delete (global as any).window;
      expect(isBrowser()).toBe(false);
    });

    it("should return false if window exists but document does not", () => {
      (global as any).window = {};
      expect(isBrowser()).toBe(false);
    });

    it("should return false if document exists but createElement is not a function", () => {
      (global as any).window = { document: { createElement: null } };
      expect(isBrowser()).toBe(false);

      (global as any).window = { document: {} };
      expect(isBrowser()).toBe(false);
    });
  });

  describe("isWebWorker", () => {
    let originalWindow: any;
    let originalSelf: any;
    let originalImportScripts: any;

    beforeEach(() => {
      originalWindow = (global as any).window;
      originalSelf = (global as any).self;
      originalImportScripts = (global as any).importScripts;
    });

    afterEach(() => {
      if (originalWindow === undefined) {
        delete (global as any).window;
      } else {
        (global as any).window = originalWindow;
      }
      if (originalSelf === undefined) {
        delete (global as any).self;
      } else {
        (global as any).self = originalSelf;
      }
      if (originalImportScripts === undefined) {
        delete (global as any).importScripts;
      } else {
        (global as any).importScripts = originalImportScripts;
      }
      vi.restoreAllMocks();
    });

    it("should return true in a Web Worker-like environment", () => {
      delete (global as any).window; // No window
      (global as any).self = { importScripts: () => {} }; // Has self with importScripts
      expect(isWebWorker()).toBe(true);
    });

    it("should return false if window exists (e.g., browser)", () => {
      (global as any).window = {};
      (global as any).self = { importScripts: () => {} };
      expect(isWebWorker()).toBe(false);
    });

    it("should return false if self is undefined", () => {
      delete (global as any).window;
      delete (global as any).self;
      expect(isWebWorker()).toBe(false);
    });

    it("should return false if importScripts is not in self", () => {
      delete (global as any).window;
      (global as any).self = { postMessage: () => {} }; // Some other property, but no importScripts
      expect(isWebWorker()).toBe(false);
    });
  });
});
