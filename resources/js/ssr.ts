import {createSSRApp, h} from "vue"
import {renderToString} from "@vue/server-renderer"
import {createInertiaApp} from "@inertiajs/inertia-vue3"
import createServer from "@inertiajs/server"

function withVite(pages: Record<string, any>, name: string) {
  for (const path in pages) {
    if (path.endsWith(`${name.replace(".", "/")}.vue`)) {
      return typeof pages[path] === "function"
        ? pages[path]()
        : pages[path]
    }
  }

  throw new Error("Page not found: " + name)
}

createServer((page) => createInertiaApp({
  page,
  render: renderToString,
  resolve: (name) => withVite(import.meta.glob("./Pages/**/*.vue"), name),
  title: title => title ? `${title} - My App` : "My App",
  setup: ({app, props, plugin}) => createSSRApp({
    render: () => h(app, props),
  })
    .use(plugin)
}))
