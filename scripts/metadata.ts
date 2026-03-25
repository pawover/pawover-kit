/* eslint-disable antfu/no-import-dist */

import fse from "fs-extra";
import * as moduleHooksAlova from "../dist/hooks-alova.js";
import * as moduleHooksReact from "../dist/hooks-react.js";
import * as moduleIndex from "../dist/index.js";
import * as moduleVite from "../dist/vite.js";
import * as moduleZod from "../dist/zod.js";

interface Metadata {
  index: string[];
  vite: string[];
  zod: string[];
  hooks: {
    alova: string[];
    react: string[];
  };
}
async function generateMetadata () {
  try {
    const metadata: Metadata = {
      index: Object.keys(moduleIndex),
      vite: Object.keys(moduleVite),
      zod: Object.keys(moduleZod),
      hooks: {
        alova: Object.keys(moduleHooksAlova),
        react: Object.keys(moduleHooksReact),
      },
    };
    await fse.writeJson("metadata.json", metadata, { spaces: 2 });
  } catch (error) {
    throw new Error("generate metadata failed");
  }
}

generateMetadata();
