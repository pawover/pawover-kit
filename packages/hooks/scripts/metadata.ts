import fse from "fs-extra";

import * as moduleAlova from "../dist/alova.js";
import * as moduleReact from "../dist/react.js";

async function generateMetadata () {
  try {
    const metadata = {
      alova: Object.keys(moduleAlova),
      react: Object.keys(moduleReact),
    };

    await fse.writeJson("dist/metadata.json", metadata, { spaces: 2 });
  } catch (error) {
    throw new Error("generate metadata failed");
  }
}

generateMetadata();
