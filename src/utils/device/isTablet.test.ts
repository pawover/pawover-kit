import { describe, it, expect } from "vitest";
import { isTablet } from "./isTablet";

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

describe("isTablet", () => {
  // ==================== 核心理念：至少是平板 ====================

  describe("核心理念：识别'至少是平板'的设备", () => {
    it("默认参数下，1024px 应识别为平板（典型平板宽度）", () => {
      expect(isTablet()).toBe(true);
    });

    it("768px (最小值) 应识别为平板", () => {
      withWindowProperty(window, "innerWidth", 768, () => {
        expect(isTablet()).toBe(true);
      });
    });

    it("1200px (最大值) 应识别为平板", () => {
      withWindowProperty(window, "innerWidth", 1200, () => {
        expect(isTablet()).toBe(true);
      });
    });

    it("767px 应识别为非平板（小于平板最小宽度且屏幕小）", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 767,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(375, 667), // iPhone SE 尺寸
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 2,
          configurable: true,
        });

        expect(isTablet()).toBe(false);
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

    it("1201px 应识别为平板（大于平板范围，但可能是更大设备）", () => {
      withWindowProperty(window, "innerWidth", 1201, () => {
        expect(isTablet()).toBe(true);
      });
    });

    it("极小宽度（如 100px）应识别为非平板（移动设备）", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 100,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(320, 480), // 老式手机
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        expect(isTablet()).toBe(false);
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

    it("极大宽度（如 1920px）应识别为平板（桌面设备）", () => {
      withWindowProperty(window, "innerWidth", 1920, () => {
        expect(isTablet()).toBe(true);
      });
    });
  });

  // ==================== 参数验证测试 ====================

  describe("参数验证：isPositiveInteger 集成", () => {
    it("minWidth 为 0 时应返回 false", () => {
      expect(isTablet(0)).toBe(false);
    });

    it("minWidth 为负数时应返回 false", () => {
      expect(isTablet(-1)).toBe(false);
    });

    it("minWidth 为浮点数时应返回 false", () => {
      expect(isTablet(768.5)).toBe(false);
    });

    it("maxWidth 为 0 时应返回 false", () => {
      expect(isTablet(768, 0)).toBe(false);
    });

    it("两个参数都无效时应返回 false", () => {
      expect(isTablet(0, 0)).toBe(false);
    });

    it("自定义有效范围应正常工作", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 600,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(375, 667), // 小屏幕
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 2,
          configurable: true,
        });

        expect(isTablet(500, 700)).toBe(true);
        expect(isTablet(700, 800)).toBe(false);
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

  // ==================== 屏幕尺寸计算测试 ====================

  describe("屏幕尺寸计算：OR 逻辑（宽度范围 || 屏幕尺寸）", () => {
    it("宽度在范围内但屏幕<7英寸应返回 true（宽度满足）", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1000,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(400, 600), // ~4.6英寸
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        // 宽度在范围内，即使屏幕小也返回 true
        expect(isTablet()).toBe(true);
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

    it("宽度不在范围内但屏幕>=7英寸应返回 true（屏幕满足）", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 600, // 低于范围
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

        // 宽度不在范围内，但屏幕大也返回 true
        expect(isTablet()).toBe(true);
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

    it("宽度在范围内且屏幕>=7英寸应返回 true", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 1000,
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

        expect(isTablet()).toBe(true);
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

    it("7英寸屏幕且宽度在范围内应识别为平板", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 800, // 在范围内
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

        expect(isTablet()).toBe(true);
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

    it("5英寸屏幕即使宽度在范围内也应识别为平板（宽度满足）", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 800, // 在范围内
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(400, 700), // ~5英寸
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        // 宽度在范围内，即使屏幕小也返回 true
        expect(isTablet()).toBe(true);
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

    it("小宽度且小屏幕应识别为非平板", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 400, // 低于范围
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(400, 700), // ~5英寸
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        expect(isTablet()).toBe(false);
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
          value: 600, // 低于范围
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(1600, 2560),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 2,
          configurable: true,
        });

        // 逻辑像素: 800x1280 @ 160 DPI = ~9.7英寸
        expect(isTablet()).toBe(true);
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
          value: 600, // 低于范围
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(800, 1280),
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 1,
          configurable: true,
        });

        // 160 DPI: 800/160=5", 1280/160=8" -> ~9.7英寸
        expect(isTablet(768, 1200, 160)).toBe(true);

        // 320 DPI: 800/320=2.5", 1280/320=4" -> ~4.7英寸
        expect(isTablet(768, 1200, 320)).toBe(false);
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
          value: 1000,
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

        expect(isTablet()).toBe(true);
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

    it("降级时宽度不在范围内应返回 false", () => {
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 600,
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

        expect(isTablet()).toBe(false);
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
      const hasWindow = typeof window !== "undefined";

      if (!hasWindow) {
        expect(isTablet()).toBe(false);
      }
    });
  });

  // ==================== 真实设备场景测试 ====================

  describe("真实设备场景：isTablet 识别'至少是平板'的设备", () => {
    const testCases = [
      // 移动设备（应返回 false）
      { name: "iPhone 14 Pro", width: 393, screenW: 393, screenH: 852, dpr: 3, expected: false },
      { name: "iPhone SE", width: 375, screenW: 375, screenH: 667, dpr: 2, expected: false },
      { name: "Galaxy S23", width: 360, screenW: 360, screenH: 800, dpr: 3, expected: false },

      // 平板设备（应返回 true）
      { name: "iPad (1024x768)", width: 1024, screenW: 1024, screenH: 768, dpr: 1, expected: true },
      { name: "iPad Pro (1366x1024)", width: 1366, screenW: 1366, screenH: 1024, dpr: 1, expected: true },
      { name: "Galaxy Tab S8", width: 800, screenW: 800, screenH: 1280, dpr: 1, expected: true },

      // 笔记本/桌面设备（应返回 true，因为至少是平板）
      { name: "MacBook Pro 13\"", width: 1440, screenW: 1440, screenH: 900, dpr: 1, expected: true },
      { name: "MacBook Air 13\"", width: 1440, screenW: 1440, screenH: 900, dpr: 1, expected: true },
      { name: "Surface Pro", width: 1368, screenW: 2736, screenH: 1824, dpr: 2, expected: true },
      { name: "Dell XPS 13\"", width: 1920, screenW: 1920, screenH: 1080, dpr: 1, expected: true },
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

          expect(isTablet()).toBe(expected);
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

  // ==================== 响应式设计模式测试 ====================

  describe("响应式设计模式：isTablet 与 isMobile 的关系", () => {
    it("isTablet 应排除 isMobile（小屏幕设备）", () => {
      // 典型移动设备宽度 + 小屏幕
      const originalInnerWidth = window.innerWidth;
      const originalScreen = window.screen;
      const originalDPR = window.devicePixelRatio;

      try {
        Object.defineProperty(window, "innerWidth", {
          value: 375,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(375, 812), // iPhone X
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 3,
          configurable: true,
        });

        expect(isTablet()).toBe(false);

        // 测试另一个移动设备
        Object.defineProperty(window, "innerWidth", {
          value: 414,
          configurable: true,
        });
        Object.defineProperty(window, "screen", {
          value: createMockScreen(414, 896), // iPhone 11 Pro Max
          configurable: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
          value: 3,
          configurable: true,
        });

        expect(isTablet()).toBe(false);
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

    // ... 其他测试保持不变
  });

  // ==================== 性能测试 ====================

  describe("性能", () => {
    it("重复调用应保持高性能", () => {
      const iterations = 1000;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        isTablet();
      }

      const end = performance.now();
      const avgTime = (end - start) / iterations;

      expect(avgTime).toBeLessThan(0.1);
    });
  });
});
