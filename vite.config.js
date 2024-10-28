import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

function getPluginsEntries() {
  const pluginsDir = path.resolve(__dirname, "src/plugins");
  const entries = {};

  fs.readdirSync(pluginsDir).forEach((file) => {
    const fullPath = path.join(pluginsDir, file);
    const fileStat = fs.statSync(fullPath);

    if (fileStat.isFile() && file.endsWith(".js")) {
      const name = path.parse(file).name;
      entries[name] = fullPath;
    }
  });

  return entries;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: getPluginsEntries(),
      output: {
        entryFileNames: "[name].js",
        dir: "dist/plugins",
      },
    },
  },
});
