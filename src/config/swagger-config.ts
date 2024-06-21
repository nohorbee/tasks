import path from "path";
import fs from "fs";

import YAML from "yaml";

const swaggerDocument = YAML.parse(
  fs.readFileSync(path.join(__dirname, "api.yaml"), "utf8")
);
const swaggerConfig = {
  customJs: "/custom.js",
};

export { swaggerDocument, swaggerConfig };
