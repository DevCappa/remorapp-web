import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv'

dotenv.config() // load env vars from .env

export default defineConfig(({ command, mode }) =>{
  const env = loadEnv(mode, process.cwd(), '')
  return{
    plugins: [react()],
    resolve: {
      alias: [{ find: "@", replacement: "/src" }],
    },
    define: {
      __APP_ENV__: JSON.stringify(env.ID_PROYECT),
      __ADDRESS__: JSON.stringify(env.ADDRESS),
    },
    build: {
      target: "es2020"
    },
    optimizeDeps: {
      esbuildOptions: {
          // Limit target browsers due to issue: Big integer literals are not available in the configured target environment ("chrome87", "edge88", "es2020", "firefox78", "safari13" + 2 overrides)'
          target: "es2020",
              // Node.js global to browser globalThis
              define: {
                global: 'globalThis'
            },

      }
    }}
});
