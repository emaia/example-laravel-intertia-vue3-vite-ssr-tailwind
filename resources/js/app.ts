import {createApp, h} from "vue"
import {createInertiaApp} from "@inertiajs/inertia-vue3"
import "@/../css/app.css"

let asyncViews = () => {
  return import.meta.glob("./Pages/**/*.vue")
}

createInertiaApp({
  resolve: async (name) => {
    if (import.meta.env.DEV) {
      return (await import(`./Pages/${name}.vue`)).default
    } else {
      let pages = asyncViews()
      const importPage = pages[`./Pages/${name}.vue`]
      return importPage().then(module => module.default)
    }
  },
  title: title => title ? `${title} - My App` : "My App",
  setup({el, app, props, plugin}) {
    createApp({render: () => h(app, props)})
      .use(plugin)
      .mount(el)
  },
}).then()
