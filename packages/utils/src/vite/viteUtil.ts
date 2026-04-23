import type { ProxyOptions } from "vite";

/**
 * Vite 工具类
 */
export class ViteUtil {
  /**
   * 开发服务器反向代理配置
   *
   * @param proxyList 代理配置项
   */
  static toProxy<L extends [string, string][]>(proxyList: L, options?: ProxyOptions | undefined): Record<string, ProxyOptions> {
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
