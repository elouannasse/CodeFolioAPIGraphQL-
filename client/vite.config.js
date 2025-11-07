import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@graphql": path.resolve(__dirname, "./src/graphql"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },
  server: {
    port: 3000,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/graphql": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
