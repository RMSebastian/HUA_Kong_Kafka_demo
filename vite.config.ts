import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: true, // escucha en 0.0.0.0 para que Docker pueda acceder
      port: 5556, // asegurate de que sea el correcto si lo usás explícitamente
      allowedHosts: ['frontend-app'], // 👈 permite conexiones desde el contenedor
      proxy: {
        "/services": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/services/, ""),
        },
      },
    },
  };
});