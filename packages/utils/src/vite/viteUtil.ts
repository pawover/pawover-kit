import type { ProxyOptions } from "vite";

/**
 * Vite 工具类
 */
export class ViteUtil {
  /**
   * 开发服务器反向代理配置
   *
   * @param proxyList 代理配置项
   * @param options 追加到每个代理项的 Vite `ProxyOptions`
   * @returns Vite `server.proxy` 可直接使用的配置对象
   * @example
   * ```ts
   * ViteUtil.toProxy([
   *   ["/api", "http://localhost:3000"],
   *   ["/mock", "https://example.com"],
   * ]);
   * // {
   * //   "/api": { target: "http://localhost:3000", changeOrigin: true, ws: true, rewrite: [Function] },
   * //   "/mock": { target: "https://example.com", changeOrigin: true, ws: true, secure: false, rewrite: [Function] }
   * // }
   * ```
   */
  static toProxy<L extends [string, string][]> (proxyList: L, options?: ProxyOptions | undefined): Record<string, ProxyOptions> {
    const httpsRE = /^https:\/\//;
    const result: Record<string, ProxyOptions> = {};

    if (typeof proxyList === "object") {
      for (const [prefix, target] of proxyList) {
        const isHttps = httpsRE.test(target);

        // https://github.com/http-party/node-http-proxy#options
        result[prefix] = {
          target,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
          // https 需要开启 secure = false
          ...(isHttps ? { secure: false } : {}),
          ...options,
        };
      }
    }

    return result;
  }
}
