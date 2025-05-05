import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/ResultadosMiddleware": {
          target: env.VITE_APIQA_MIDDLEWARE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ResultadosMiddleware/, ""),
        },
        "/PlatformModuleSAP": {
          target: env.VITE_APIQA_PLATFORM_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/PlatformModuleSAP/, ""),
        },
        "/InterfazPacienteFDH": {
          target: env.VITE_APIQA_FDH_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/InterfazPacienteFDH/, ""),
        },
        "/InterfazPacienteHIS": {
          target: env.VITE_APIQA_HIS_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/InterfazPacienteHIS/, ""),
        },
        "/obtener": {
          target: env.VITE_MARKEY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/obtener/, ""),
        },
      },
    },
  };
});
