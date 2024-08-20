import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: false,
  },
  optimizeDeps: {
    include: ["three"],
  },
});
