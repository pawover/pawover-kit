import { visualizer } from "rollup-plugin-visualizer";
import type { TsdownPluginOption } from "tsdown";

/**
 * 按需启用 rollup-plugin-visualizer 构建分析插件。
 *
 * 仅当环境变量 `VISUALIZER=1` 时启用，正常构建（`pnpm build`）不受影响；分析报告输出到各包 `dist/stats.html`。
 *
 * @returns 构建分析插件数组；未开启分析时返回空数组
 *
 * @example
 * ```bash
 * pnpm build:analyze
 * ```
 */
export function tsdownVisualizerPlugins (): TsdownPluginOption {
  if (process.env["VISUALIZER"] !== "1") {
    return [];
  }

  return [
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: true,
      filename: "stats.html",
      title: "pawover-kit Bundle Analysis",
    }),
  ] as unknown as TsdownPluginOption;
}
