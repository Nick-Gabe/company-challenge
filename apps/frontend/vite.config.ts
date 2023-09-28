/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { readdirSync } from "fs";
import path from "path";
import { defineConfig } from "vite";
import tsPaths from "vite-tsconfig-paths";

const absolutePathAliases: { [key: string]: string } = {};
const srcPath = path.resolve("./src/");
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map(
  (dirent) => dirent.name.replace(/(\.ts){1}(x?)/, ""),
);

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

export default defineConfig({
  resolve: {
    alias: {
      ...absolutePathAliases,
    },
  },
  plugins: [react(), tsPaths({})],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
