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
          ssr: "resources/js/ssr.ts",
        },
        output: {
          entryFileNames: "[name].js"
        }
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
