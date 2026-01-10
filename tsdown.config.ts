import { defineConfig, type UserConfig } from "tsdown";

const defaultUserConfig: UserConfig = {
  dts: {
    resolve: ["radashi", "type-fest", "@pawover/types", "ts-toolbelt"],
  },
  target: "es2020",
  platform: "neutral",
  tsconfig: "tsconfig.build.json",
};

export default defineConfig([
  {
    entry: {
      index: "src/utils/index.ts",
      enums: "src/enums/index.ts",
      vite: "src/vite/index.ts",
      zod: "src/zod/index.ts",
    },
    ...defaultUserConfig,
  },
  {
    entry: {
      "hooks-alova": "src/hooks/alova/index.ts",
      "hooks-react": "src/hooks/react/index.ts",
    },
    ...defaultUserConfig,
  },
  {
    entry: {
      "patches-fetchEventSource": "src/patches/fetchEventSource/index.ts",
    },
    ...defaultUserConfig,
  },
]);
