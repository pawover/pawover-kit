export type MatchFunction<T, R = unknown> = (row: T, index: number) => R;

/**
 * `ArrayUtil.zip` / `ArrayUtil.unzip` 的配置项
 * - `truncate`: 为 `true` 时按最短数组截断
 */
export interface ZipOptions {
  truncate?: boolean | undefined;
}
