"use strict";
var vue = require("vue");
var serverRenderer = require("@vue/server-renderer");
var inertiaVue3 = require("@inertiajs/inertia-vue3");
var createServer = require("@inertiajs/server");
var serverRenderer$1 = require("vue/server-renderer");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var createServer__default = /* @__PURE__ */ _interopDefaultLegacy(createServer);
function withVite(pages, name) {
  for (const path in pages) {
    if (path.endsWith(`${name.replace(".", "/")}.vue`)) {
      return typeof pages[path] === "function" ? pages[path]() : pages[path];
    }
  }
  throw new Error("Page not found: " + name);
}
createServer__default["default"]((page) => inertiaVue3.createInertiaApp({
  page,
  render: serverRenderer.renderToString,
  resolve: (name) => withVite({ "./Pages/Welcome.vue": () => Promise.resolve().then(function() {
    return Welcome;
  }) }, name),
  title: (title) => title ? `${title} - My App` : "My App",
  setup: ({ app, props, plugin }) => vue.createSSRApp({
    render: () => vue.h(app, props)
  }).use(plugin)
}));
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer$1.ssrRenderAttrs(vue.mergeProps({ class: "min-h-screen bg-blue-500 text-white flex items-center justify-center" }, _attrs))}>`);
      _push(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Head), { title: "Welcome" }, null, _parent));
      _push(`<h1 class="text-3xl font-bold underline"> Welcome! </h1></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Welcome = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
