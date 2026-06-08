import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig(({ envMode }) => {
  const { publicVars } = loadEnv({ prefixes: ["VITE_"], mode: envMode });
  const apiTarget = process.env.VITE_API_PROXY_TARGET ?? "http://localhost:13100";

  return {
    plugins: [pluginReact()],
    html: { template: "./index.html" },
    source: {
      entry: { index: "./src/main.tsx" },
      define: publicVars,
    },
    server: {
      port: 5180,
      historyApiFallback: true,
      proxy: {
        "/api": { target: apiTarget, changeOrigin: true },
      },
    },
  };
});
