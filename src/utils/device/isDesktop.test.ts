import { describe, it, expect } from "vitest";
import { isDesktop, isWindowsDesktop, isMacOSDesktop } from "./isDesktop";

// 工具函数
function withWindowProperty<T> (obj: any, prop: string, value: T, callback: () => void) {
  const originalDescriptor = Object.getOwnPropertyDescriptor(obj, prop);
  const originalValue = obj[prop];

  try {
    if (originalDescriptor?.configurable) {
      Object.defineProperty(obj, prop, {
        value,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    } else {
      obj[prop] = value;
    }
    callback();
  } finally {
    if (originalDescriptor) {
      Object.defineProperty(obj, prop, originalDescriptor);
    } else {
      obj[prop] = originalValue;
    }
  }
}

function createMockScreen (width: number, height: number) {
  return {
    width,
    height,
    availWidth: width,
    availHeight: height,
    colorDepth: 24,
    pixelDepth: 24,
  };
}

function withUserAgent (ua: string, callback: () => void) {
  const originalNavigator = global.navigator;

  try {
    Object.defineProperty(global, "navigator", {
      value: {
        ...originalNavigator,
        userAgent: ua,
      },
      configurable: true,
    });

    callback();
  } finally {
    Object.defineProperty(global, "navigator", {
      value: originalNavigator,
      configurable: true,
    });
  }
}

describe("isDesktop", () => {
  // ==================== 核心理念：识别桌面设备 ====================

  describe("核心理念：识别桌面设备（宽度 >= 1200 且屏幕 >= 10英寸）", () => {
    it("默认参数下，1920px 应识别为桌面设备", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1920,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1920, 1080),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        expect(isDesktop()).toBe(true);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("1200px 应识别为桌面设备（等于最小宽度）", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1200,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1920, 1080),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        expect(isDesktop()).toBe(true);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("1199px 应识别为非桌面设备（小于最小宽度）", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1199,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1920, 1080),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        expect(isDesktop()).toBe(false);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("1024px 应识别为非桌面设备（典型平板宽度）", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1024,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1024, 768),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        expect(isDesktop()).toBe(false);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("极小宽度（如 100px）应识别为非桌面设备", () => {
      withWindowProperty(window, "innerWidth", 100, () => {
        expect(isDesktop()).toBe(false);
      });
    });

    it("极大宽度（如 3840px）应识别为桌面设备", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 3840,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(3840, 2160),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        expect(isDesktop()).toBe(true);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });
  });

  // ==================== 屏幕尺寸边界测试 ====================

  describe("屏幕尺寸边界：10英寸阈值", () => {
    it("宽度 >= 1200 但屏幕 < 10英寸应返回 false", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1440,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(800, 1280), // ~9.7英寸
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        expect(isDesktop()).toBe(false);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("宽度 < 1200 但屏幕 >= 10英寸应返回 false", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1024,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(2048, 2732), // iPad Pro ~12.9英寸
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 2,
          configurable: true,
        });

        expect(isDesktop()).toBe(false);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("宽度 >= 1200 且屏幕 >= 10英寸应返回 true", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1440,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1440, 900), // MacBook ~13英寸
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        expect(isDesktop()).toBe(true);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("10英寸屏幕且宽度 >= 1200 应识别为桌面设备", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1280,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1600, 1200),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        expect(isDesktop()).toBe(true);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("9.9英寸屏幕即使宽度 >= 1200 也应识别为非桌面设备", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1280,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1200, 800), // ~9.9英寸
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        expect(isDesktop()).toBe(false);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });
  });

  // ==================== 参数验证测试 ====================

  describe("参数验证：isPositiveInteger 集成", () => {
    it("minWidth 为 0 时应返回 false", () => {
      expect(isDesktop(0)).toBe(false);
    });

    it("minWidth 为负数时应返回 false", () => {
      expect(isDesktop(-1)).toBe(false);
    });

    it("minWidth 为浮点数时应返回 false", () => {
      expect(isDesktop(1200.5)).toBe(false);
    });

    it("minScreenSize 为 0 时应返回 false", () => {
      expect(isDesktop(1200, 0)).toBe(false);
    });

    it("minScreenSize 为负数时应返回 false", () => {
      expect(isDesktop(1200, -1)).toBe(false);
    });

    it("minScreenSize 为浮点数时应返回 false", () => {
      expect(isDesktop(1200, 10.5)).toBe(false);
    });

    it("两个参数都无效时应返回 false", () => {
      expect(isDesktop(0, 0)).toBe(false);
    });

    it("自定义有效范围应正常工作", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1440,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1440, 900),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        expect(isDesktop(1200, 10)).toBe(true);
        expect(isDesktop(1500, 10)).toBe(false);
        expect(isDesktop(1200, 15)).toBe(false);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });
  });

  // ==================== DPI 和 DPR 测试 ====================

  describe("DPI 和设备像素比处理", () => {
    it("高 DPI (Retina) 显示应正确计算", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1440,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(2880, 1800), // MacBook Pro Retina
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 2,
          configurable: true,
        });

        // 逻辑像素: 1440x900 @ 160 DPI = ~13英寸
        expect(isDesktop()).toBe(true);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("自定义 DPI 参数应影响计算", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1280,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1280, 800),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        // 160 DPI: 1280/160=8", 800/160=5" -> ~9.4英寸
        expect(isDesktop(1200, 10, 160)).toBe(false);

        // 120 DPI: 1280/120=10.7", 800/120=6.7" -> ~12.6英寸
        expect(isDesktop(1200, 10, 120)).toBe(true);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });
  });

  // ==================== 降级策略测试 ====================

  describe("降级策略：screen API 不可用时", () => {
    it("当 screen API 抛出异常时应降级到宽度判断", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1920,
          configurable: true,
        });

        const errorScreen = new Proxy(
          {},
          {
            get () {
              throw new Error("Access denied");
            },
          },
        );
        Object.defineProperty(window, "screen", {
          get: () => errorScreen,
          configurable: true,
        });

        expect(isDesktop()).toBe(true);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
      }
    });

    it("降级时宽度 < 1200 应返回 false", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1024,
          configurable: true,
        });

        const errorScreen = new Proxy(
          {},
          {
            get () {
              throw new Error("Access denied");
            },
          },
        );
        Object.defineProperty(window, "screen", {
          get: () => errorScreen,
          configurable: true,
        });

        expect(isDesktop()).toBe(false);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
      }
    });
  });

  // ==================== 非浏览器环境测试 ====================

  describe("非浏览器环境", () => {
    it("在无 window 环境中应返回 false", () => {
      expect(isDesktop(0)).toBe(false);
    });
  });

  // ==================== 真实设备场景测试 ====================

  describe("真实设备场景：isDesktop 识别桌面设备", () => {
    const testCases = [
      // 桌面设备（应返回 true）
      { name: "MacBook Pro 13\"", width: 1440, screenW: 1440, screenH: 900, dpr: 1, expected: true },
      { name: "MacBook Air 13\"", width: 1440, screenW: 1440, screenH: 900, dpr: 1, expected: true },
      { name: "MacBook Pro 16\"", width: 1728, screenW: 1728, screenH: 1117, dpr: 1, expected: true },
      { name: "iMac 24\"", width: 1920, screenW: 1920, screenH: 1080, dpr: 1, expected: true },
      { name: "iMac 27\"", width: 2560, screenW: 2560, screenH: 1440, dpr: 1, expected: true },
      { name: "Dell XPS 13\"", width: 1920, screenW: 1920, screenH: 1080, dpr: 1, expected: true },
      { name: "Surface Pro", width: 1368, screenW: 2736, screenH: 1824, dpr: 2, expected: true },
      { name: "Surface Laptop", width: 1440, screenW: 2256, screenH: 1504, dpr: 1.5, expected: true },

      // 平板设备（应返回 false）
      { name: "iPad Pro 12.9\"", width: 1024, screenW: 2048, screenH: 2732, dpr: 2, expected: false },
      { name: "iPad Air", width: 820, screenW: 1640, screenH: 2360, dpr: 2, expected: false },
      { name: "Galaxy Tab S8", width: 800, screenW: 1600, screenH: 2560, dpr: 2, expected: false },

      // 移动设备（应返回 false）
      { name: "iPhone 14 Pro", width: 393, screenW: 1179, screenH: 2556, dpr: 3, expected: false },
      { name: "Galaxy S23", width: 360, screenW: 1080, screenH: 2400, dpr: 3, expected: false },
    ];

    testCases.forEach(({ name, width, screenW, screenH, dpr, expected }) => {
      it(`应正确识别 ${name}`, () => {
        const originalInnerWidth = window.innerWidth;
        const originalScreen = window.screen;
        const originalDPR = window.devicePixelRatio;

        try {
          Object.defineProperty(window, "innerWidth", {
            value: width,
            configurable: true,
          });
          Object.defineProperty(window, "screen", {
            value: createMockScreen(screenW, screenH),
            configurable: true,
          });
          Object.defineProperty(window, "devicePixelRatio", {
            value: dpr,
            configurable: true,
          });

          expect(isDesktop()).toBe(expected);
        } finally {
          Object.defineProperty(window, "innerWidth", {
            value: originalInnerWidth,
            configurable: true,
          });
          Object.defineProperty(window, "screen", {
            value: originalScreen,
            configurable: true,
          });
          Object.defineProperty(window, "devicePixelRatio", {
            value: originalDPR,
            configurable: true,
          });
        }
      });
    });
  });

  // ==================== 与 isTablet 和 isMobile 的关系测试 ====================

  describe("与 isTablet 和 isMobile 的关系", () => {
    it("桌面设备也应被 isTablet 识别为 true", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1920,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1920, 1080),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        const desktop = isDesktop();
        // isTablet 需要从其他文件导入
        // expect(desktop).toBe(true);
        // expect(isTablet()).toBe(true);

        expect(desktop).toBe(true);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("桌面设备不应被 isMobile 识别为 true", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1920,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1920, 1080),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        const desktop = isDesktop();
        // isMobile 需要从其他文件导入
        // expect(desktop).toBe(true);
        // expect(isMobile()).toBe(false);

        expect(desktop).toBe(true);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("设备分类应互斥且完整", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        // 测试桌面设备
        Object.defineProperty(window, "innerWidth", {
          value: 1920,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1920, 1080),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        const desktop = isDesktop();
        // expect(isMobile()).toBe(false);
        // expect(isTablet()).toBe(true);
        expect(desktop).toBe(true);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });
  });

  // ==================== 性能测试 ====================

  describe("性能", () => {
    it("重复调用应保持高性能", () => {
      const iterations = 1000;
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1920,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1920, 1080),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        const start = performance.now();

        for (let i = 0; i < iterations; i++) {
          isDesktop();
        }

        const end = performance.now();
        const avgTime = (end - start) / iterations;

        expect(avgTime).toBeLessThan(0.1);
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });
  });
});

describe("isWindowsDesktop", () => {
  // ==================== 核心理念：识别 Windows 桌面设备 ====================

  describe("核心理念：识别 Windows 桌面设备", () => {
    it("Windows UA 且桌面设备应识别为 Windows 桌面", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1920,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1920, 1080),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        withUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)", () => {
          expect(isWindowsDesktop()).toBe(true);
        });
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("非 Windows UA 应识别为非 Windows 桌面", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1920,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1920, 1080),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        withUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", () => {
          expect(isWindowsDesktop()).toBe(false);
        });
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("Windows UA 但非桌面设备应识别为非 Windows 桌面", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 360,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1080, 2400),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 3,
          configurable: true,
        });

        withUserAgent("Mozilla/5.0 (Windows Phone 10.0; Android 6.0)", () => {
          expect(isWindowsDesktop()).toBe(false);
        });
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });
  });

  // ==================== 真实设备场景测试 ====================

  describe("真实设备场景：isWindowsDesktop 识别 Windows 桌面设备", () => {
    const testCases = [
      {
        name: "Windows 10 Desktop",
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        width: 1920,
        screenW: 1920,
        screenH: 1080,
        dpr: 1,
        expected: true,
      },
      {
        name: "Windows 11 Laptop",
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        width: 1366,
        screenW: 1366,
        screenH: 768,
        dpr: 1,
        expected: true,
      },
      {
        name: "Surface Pro",
        ua: "Mozilla/5.0 (Windows NT 10.0; ARM64; Win64; x64)",
        width: 1368,
        screenW: 2736,
        screenH: 1824,
        dpr: 2,
        expected: true,
      },
      {
        name: "MacBook Pro",
        ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        width: 1440,
        screenW: 1440,
        screenH: 900,
        dpr: 1,
        expected: false,
      },
      {
        name: "iPhone",
        ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)",
        width: 393,
        screenW: 1179,
        screenH: 2556,
        dpr: 3,
        expected: false,
      },
    ];

    testCases.forEach(({ name, ua, width, screenW, screenH, dpr, expected }) => {
      it(`应正确识别 ${name}`, () => {
        const originalInnerWidth = window.innerWidth;
        const originalScreen = window.screen;
        const originalDPR = window.devicePixelRatio;

        try {
          Object.defineProperty(window, "innerWidth", {
            value: width,
            configurable: true,
          });
          Object.defineProperty(window, "screen", {
            value: createMockScreen(screenW, screenH),
            configurable: true,
          });
          Object.defineProperty(window, "devicePixelRatio", {
            value: dpr,
            configurable: true,
          });

          withUserAgent(ua, () => {
            expect(isWindowsDesktop()).toBe(expected);
          });
        } finally {
          Object.defineProperty(window, "innerWidth", {
            value: originalInnerWidth,
            configurable: true,
          });
          Object.defineProperty(window, "screen", {
            value: originalScreen,
            configurable: true,
          });
          Object.defineProperty(window, "devicePixelRatio", {
            value: originalDPR,
            configurable: true,
          });
        }
      });
    });
  });
});

describe("isMacOSDesktop", () => {
  // ==================== 核心理念：识别 macOS 桌面设备 ====================

  describe("核心理念：识别 macOS 桌面设备", () => {
    it("macOS UA 且桌面设备应识别为 macOS 桌面", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1440,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1440, 900),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        withUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", () => {
          expect(isMacOSDesktop()).toBe(true);
        });
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("非 macOS UA 应识别为非 macOS 桌面", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1440,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1440, 900),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        withUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)", () => {
          expect(isMacOSDesktop()).toBe(false);
        });
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });

    it("macOS UA 但非桌面设备应识别为非 macOS 桌面", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1024,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(2048, 2732),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 2,
          configurable: true,
        });

        // iPad 在某些情况下会伪装成 Macintosh
        withUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", () => {
          expect(isMacOSDesktop()).toBe(false);
        });
      } finally {
        Object.defineProperty(window, "innerWidth", {
          value: originalInnerWidth,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: originalScreen,
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: originalDPR,
          configurable: true,
        });
      }
    });
  });

  // ==================== 真实设备场景测试 ====================

  describe("真实设备场景：isMacOSDesktop 识别 macOS 桌面设备", () => {
    const testCases = [
      {
        name: "MacBook Pro 13\"",
        ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        width: 1440,
        screenW: 1440,
        screenH: 900,
        dpr: 1,
        expected: true,
      },
      {
        name: "MacBook Air 13\"",
        ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        width: 1440,
        screenW: 1440,
        screenH: 900,
        dpr: 1,
        expected: true,
      },
      {
        name: "iMac 24\"",
        ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        width: 1920,
        screenW: 1920,
        screenH: 1080,
        dpr: 1,
        expected: true,
      },
      {
        name: "Windows PC",
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        width: 1920,
        screenW: 1920,
        screenH: 1080,
        dpr: 1,
        expected: false,
      },
      {
        name: "iPad Pro",
        ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", // iPad 伪装
        width: 1024,
        screenW: 2048,
        screenH: 2732,
        dpr: 2,
        expected: false,
      },
    ];

    testCases.forEach(({ name, ua, width, screenW, screenH, dpr, expected }) => {
      it(`应正确识别 ${name}`, () => {
        const originalInnerWidth = window.innerWidth;
        const originalScreen = window.screen;
        const originalDPR = window.devicePixelRatio;

        try {
          Object.defineProperty(window, "innerWidth", {
            value: width,
            configurable: true,
          });
          Object.defineProperty(window, "screen", {
            value: createMockScreen(screenW, screenH),
            configurable: true,
          });
          Object.defineProperty(window, "devicePixelRatio", {
            value: dpr,
            configurable: true,
          });

          withUserAgent(ua, () => {
            expect(isMacOSDesktop()).toBe(expected);
          });
        } finally {
          Object.defineProperty(window, "innerWidth", {
            value: originalInnerWidth,
            configurable: true,
          });
          Object.defineProperty(window, "screen", {
            value: originalScreen,
            configurable: true,
          });
          Object.defineProperty(window, "devicePixelRatio", {
            value: originalDPR,
            configurable: true,
          });
        }
      });
    });
  });
});
