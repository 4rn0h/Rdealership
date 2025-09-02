import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
import path from "path"; // ✅ missing import

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: 4028, // ✅ number not string
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [".amazonaws.com"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ now works
    },
  },
});
