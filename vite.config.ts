import {resolve} from "path"
import {ConfigEnv, defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig(({command}: ConfigEnv) => {
  return {
    base: command === "build" ? "/dist/" : "",
    publicDir: false,
    build: {
      manifest: true,
      outDir: "public/dist",
      rollupOptions: {
        input: {
          app: "resources/js/app.ts",
        },
        output: {
          entryFileNames: "[name].js"
        }
      },
    },
    server: {
      host: "127.0.0.1",
      strictPort: true,
      port: 3030,
      // https: true,
      hmr: {
        host: "127.0.0.1",
      },
    },
    plugins: [
      vue()
    ],
    resolve: {
      alias: {
        "@": resolve("./resources/js"),
      },
    },
    optimizeDeps: {
      include: [
        "@inertiajs/inertia",
        "@inertiajs/inertia-vue3",
        "axios",
        "vue"
      ],
    },
  }
})
