import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss(), svgr()],
    base: env.VITE_BASE_PATH || "/personal-finance-tracker",
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
    preview: {
      port: 3001,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("react-dom")) {
                return "react-vendor";
              }
              if (id.includes("flowbite")) {
                return "flowbite-vendor";
              }
              if (id.includes("lottie-web")) {
                return "lottie-vendor";
              }
              return "vendor";
            }
          },
        },
      },
      chunkSizeWarningLimit: 1500, // hilangin warning chunk > 500kb
    },
  };
});
