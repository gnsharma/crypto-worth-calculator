import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import Icons from "unplugin-icons/vite";

const commonConfig = {
  plugins: [
    react(),
    Icons({
      compiler: "jsx",
      jsx: "react",
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
};

const proxyConfig = {
  server: {
    proxy: {
      "^/.netlify/functions/*": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "production") return commonConfig;
  return { ...commonConfig, ...proxyConfig };
});
