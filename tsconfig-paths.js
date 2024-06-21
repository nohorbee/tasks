/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// tsconfig-paths.js

const tsConfig = require("./tsconfig.json");
const tsConfigPaths = require("tsconfig-paths");

let { baseUrl, paths } = tsConfig.compilerOptions;

// Replacing "src" by "dist" in typescript paths map
for (let path in paths) {
  paths[path] = paths[path].map((path) => path.replace("src", "dist/src"));
}

tsConfigPaths.register({ baseUrl, paths });
