import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
import path from "path"; //

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 5000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: 4028, // 
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [".amazonaws.com"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
