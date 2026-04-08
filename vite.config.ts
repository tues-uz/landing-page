import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    host: "localhost",
    port: 8085,
    hmr: {
      host: "localhost",
      port: 8085,
      protocol: "ws",
    },
    watch: {
      usePolling: true,
      interval: 200,
    },
    proxy: {
      "/api": {
        target: "http://localhost:8085",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
      },
    },
    // Pre-warm the app entry so dependency optimization finishes before first page load (avoids 504 on deps)
    warmup: {
      clientFiles: ["./index.html", "./src/main.tsx", "./src/App.tsx"],
    },
  },
  optimizeDeps: {
    // Explicit entry so optimizer runs at startup and is ready before first browser request
    entries: ["index.html"],
    // Force pre-bundle React and key deps so they're ready immediately (avoids timeout on first load)
    include: ["react", "react-dom", "react-router-dom"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
});
