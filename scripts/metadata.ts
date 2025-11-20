/* eslint-disable antfu/no-import-dist */

import fse from "fs-extra";
import * as moduleEnums from "../dist/enums.js";
import * as moduleHooksAlova from "../dist/hooks-alova.js";
import * as moduleHooksReact from "../dist/hooks-react.js";
import * as moduleIndex from "../dist/index.js";
import * as moduleZod from "../dist/zod.js";

interface Metadata {
  index: string[];
  zod: string[];
  enums: string[];
  hooks: {
    alova: string[];
    react: string[];
  };
}
async function generateMetadata() {
  try {
    const metadata: Metadata = {
      index: Object.keys(moduleIndex),
      zod: Object.keys(moduleZod),
      enums: Object.keys(moduleEnums),
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
