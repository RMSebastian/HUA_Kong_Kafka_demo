import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      // proxy: {
      //   "/services": {
      //     target: env.VITE_API_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/services/, ""),
      //   },
      // },
    },
  };
});
