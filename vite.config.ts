import { qwikVite } from "@qwik.dev/core/optimizer";
import { defineConfig } from "vite";
import pkg from "./package.json";
import tsconfigPaths from "vite-tsconfig-paths";

import packageJson from './package.json'
const { dependencies = {}, peerDependencies = {} } = pkg as any;
const makeRegex = (dep) => new RegExp(`^${dep}(/.*)?$`);
const excludeAll = (obj) => Object.keys(obj).map(makeRegex);

export default defineConfig(() => {
  return {

    build: {
      outDir: "lib",
      target: "es2020",
      lib: {
        entry: "./src/index",
        formats: ["es", "cjs"] as const,
        fileName: (format, entryName) =>
          `${entryName}.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        output: {
          preserveModules: true,
          preserveModulesRoot: "src",
        },
        external: [
          /^node:.*/,
          ...excludeAll(dependencies),
          ...excludeAll(peerDependencies),
        ],
      },
    },
    test: {
      name: packageJson.name,
      dir: './src',
      watch: false,
      environment: 'node',
      setupFiles: ['test-setup.ts'],
      coverage: { enabled: true, provider: 'istanbul', include: ['src/**/*'] },
      typecheck: { enabled: true },
      testTimeout: 30000,
      onConsoleLog: function (log) {
        if (log.includes('Download the Vue Devtools extension')) {
          return false
        }
        return undefined
      },
    },
    plugins: [qwikVite({debug: true}), tsconfigPaths({ root: "." })],
  };

});
