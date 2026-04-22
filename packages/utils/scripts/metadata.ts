import fse from "fs-extra";

import * as module from "../dist/index.js";

async function generateMetadata () {
  try {
    const metadata = Object.keys(module);
    await fse.writeJson("dist/metadata.json", metadata, { spaces: 2 });
  } catch (error) {
    throw new Error("generate metadata failed");
  }
}

generateMetadata();
