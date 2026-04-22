import { TypeUtil } from "../type";
import type { BaseCallbackMeta, BaseInnerOptions } from "./index.type";

export function getFinalChildrenKey<T, CK extends string> (tree: T, meta: BaseCallbackMeta<T>, options: BaseInnerOptions<T, CK>): CK {
  if (TypeUtil.isFunction(options.getChildrenKey)) {
    const dynamicChildrenKey = options.getChildrenKey(tree, meta);
    if (dynamicChildrenKey && dynamicChildrenKey !== null) {
      return dynamicChildrenKey;
    }
  }

  return options.childrenKey;
}
