/// <reference types="vite-plugin-svgr/client" />

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: { plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"] },
    }),
    react(),
  ],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@", replacement: "/src" },
    ],
  },
});
