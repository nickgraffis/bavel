"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var node_path = require("node:path");
var serverRenderer = require("vue/server-renderer");
var vue = require("vue");
var runtimeCore = require("@vue/runtime-core");
var SimplexNoise = require("simplex-noise");
var vueRouter = require("vue-router");
var vuex = require("vuex");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var SimplexNoise__default = /* @__PURE__ */ _interopDefaultLegacy(SimplexNoise);
const __ssr_vue_processAssetPath = (url) => "/test/" + url;
var _imports_0$1 = "/test/assets/logo.abd9cb13.svg";
function formatPoints(points, close) {
  points = [...points];
  if (!Array.isArray(points[0])) {
    points = points.map(({ x, y }) => [x, y]);
  }
  if (close) {
    const lastPoint = points[points.length - 1];
    const secondToLastPoint = points[points.length - 2];
    const firstPoint = points[0];
    const secondPoint = points[1];
    points.unshift(lastPoint);
    points.unshift(secondToLastPoint);
    points.push(firstPoint);
    points.push(secondPoint);
  }
  return points.flat();
}
function spline(points = [], tension = 1, close = false, cb) {
  points = formatPoints(points, close);
  const size = points.length;
  const last = size - 4;
  const startPointX = close ? points[2] : points[0];
  const startPointY = close ? points[3] : points[1];
  let path = "M" + [startPointX, startPointY];
  cb && cb("MOVE", [startPointX, startPointY]);
  const startIteration = close ? 2 : 0;
  const maxIteration = close ? size - 4 : size - 2;
  const inc = 2;
  for (let i = startIteration; i < maxIteration; i += inc) {
    const x0 = i ? points[i - 2] : points[0];
    const y0 = i ? points[i - 1] : points[1];
    const x1 = points[i + 0];
    const y1 = points[i + 1];
    const x2 = points[i + 2];
    const y2 = points[i + 3];
    const x3 = i !== last ? points[i + 4] : x2;
    const y3 = i !== last ? points[i + 5] : y2;
    const cp1x = x1 + (x2 - x0) / 6 * tension;
    const cp1y = y1 + (y2 - y0) / 6 * tension;
    const cp2x = x2 - (x3 - x1) / 6 * tension;
    const cp2y = y2 - (y3 - y1) / 6 * tension;
    path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];
    cb && cb("CURVE", [cp1x, cp1y, cp2x, cp2y, x2, y2]);
  }
  return path;
}
var background_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$6 = {
  __name: "background",
  __ssrInlineRender: true,
  setup(__props) {
    runtimeCore.onMounted(() => {
      const path = document.querySelector("path");
      const root = document.documentElement;
      let hueNoiseOffset = 0;
      let noiseStep = 5e-3;
      const simplex = new SimplexNoise__default["default"]();
      const points = createPoints();
      (function animate() {
        path.setAttribute("d", spline(points, 1, true));
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
          const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
          const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
          const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);
          point.x = x;
          point.y = y;
          point.noiseOffsetX += noiseStep;
          point.noiseOffsetY += noiseStep;
        }
        const hueNoise = noise(hueNoiseOffset, hueNoiseOffset);
        const hue = map(hueNoise, -1, 1, 0, 360);
        root.style.setProperty("--startColor", `hsl(${hue}, 100%, 75%)`);
        root.style.setProperty("--stopColor", `hsl(${hue + 60}, 100%, 75%)`);
        hueNoiseOffset += noiseStep / 6;
        requestAnimationFrame(animate);
      })();
      function map(n, start1, end1, start2, end2) {
        return (n - start1) / (end1 - start1) * (end2 - start2) + start2;
      }
      function noise(x, y) {
        return simplex.noise2D(x, y);
      }
      function createPoints() {
        const points2 = [];
        const numPoints = 8;
        const angleStep = Math.PI * 2 / numPoints;
        const rad = 90;
        for (let i = 1; i <= numPoints; i++) {
          const theta = i * angleStep;
          const x = 100 + Math.cos(theta) * rad;
          const y = 100 + Math.sin(theta) * rad;
          points2.push({
            x,
            y,
            originX: x,
            originY: y,
            noiseOffsetX: Math.random() * 1e3,
            noiseOffsetY: Math.random() * 1e3
          });
        }
        return points2;
      }
      document.querySelector("path").addEventListener("mouseover", () => {
        noiseStep = 0.01;
      });
      document.querySelector("path").addEventListener("mouseleave", () => {
        noiseStep = 5e-3;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${serverRenderer.ssrRenderAttrs(vue.mergeProps({ viewBox: "0 0 200 200" }, _attrs))} data-v-340bd9f0><defs data-v-340bd9f0><linearGradient id="gradient" gradientTransform="rotate(90)" data-v-340bd9f0><stop id="gradientStop1" offset="0%" stop-color="var(--startColor)" data-v-340bd9f0></stop><stop id="gradientStop2 " offset="100%" stop-color="var(--stopColor)" data-v-340bd9f0></stop></linearGradient></defs><path d="" fill="url(&#39;#gradient&#39;)" data-v-340bd9f0></path></svg>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/background.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var Background = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-340bd9f0"]]);
const _sfc_main$5 = {
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_view = vue.resolveComponent("router-view");
      _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}><div class="w-screen h-screen absolute">`);
      _push(serverRenderer.ssrRenderComponent(Background, null, null, _parent));
      _push(`</div><div class="w-screen sticky z-50 top-0 backdrop-blur-sm"><div class="max-w-4xl mx-auto lg:px-0 px-2"><div class="py-4 flex items-center space-x-2"><img${serverRenderer.ssrRenderAttr("src", _imports_0$1)} alt="Bavel" class="w-16 h-16"><h3 style="${serverRenderer.ssrRenderStyle({ "font-weight": "bold" })}" class="dank text-5xl italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-800 to-purple-900"> Bavel </h3></div></div></div>`);
      _push(serverRenderer.ssrRenderComponent(_component_router_view, null, {
        default: vue.withCtx(({ Component }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            serverRenderer.ssrRenderSuspense(_push2, {
              default: () => {
                _push2(`<div class="relative"${_scopeId}>`);
                serverRenderer.ssrRenderVNode(_push2, vue.createVNode(vue.resolveDynamicComponent(Component), null, null), _parent2, _scopeId);
                _push2(`</div>`);
              },
              _: 2
            });
          } else {
            return [
              (vue.openBlock(), vue.createBlock(vue.Suspense, null, {
                default: vue.withCtx(() => [
                  vue.createVNode("div", { class: "relative" }, [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(Component)))
                  ])
                ]),
                _: 2
              }, 1024))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const pages = { "./pages/About.vue": () => Promise.resolve().then(function() {
  return About$1;
}), "./pages/External.vue": () => Promise.resolve().then(function() {
  return External$1;
}), "./pages/Home.vue": () => Promise.resolve().then(function() {
  return Home$1;
}), "./pages/Store.vue": () => Promise.resolve().then(function() {
  return Store$1;
}) };
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase();
  return {
    path: name === "/home" ? "/" : name,
    component: pages[path]
  };
});
function createRouter() {
  return vueRouter.createRouter({
    history: vueRouter.createMemoryHistory("/test/"),
    routes
  });
}
var index = "";
function createApp() {
  const app = vue.createSSRApp(_sfc_main$5);
  const router = createRouter();
  app.use(router);
  return { app, router };
}
async function render(url, manifest) {
  const { app, router } = createApp();
  router.push(url);
  await router.isReady();
  const ctx = {};
  const html = await serverRenderer.renderToString(app, ctx);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return [html, preloadLinks];
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = /* @__PURE__ */ new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = node_path.basename(file);
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    return "";
  }
}
var button = "";
var Button = vue.defineComponent({
  setup() {
    return () => {
      return vue.createVNode("div", {
        class: "btn"
      }, "dynamicBtn");
    };
  }
});
var About_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$4 = {
  async setup() {
    const url = typeof document === "undefined" ? new (require("url")).URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("entry-server.js", document.baseURI).href;
    return {
      msg: "About",
      url
    };
  },
  components: {
    Button
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Button = vue.resolveComponent("Button");
  _push(`<!--[--><h1 data-v-2a3effee>${serverRenderer.ssrInterpolate($setup.msg)}</h1><p class="import-meta-url" data-v-2a3effee>${serverRenderer.ssrInterpolate($setup.url)}</p>`);
  _push(serverRenderer.ssrRenderComponent(_component_Button, null, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`CommonButton`);
      } else {
        return [
          vue.createTextVNode("CommonButton")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/About.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var About = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-2a3effee"]]);
var About$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": About
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}>Example external component content</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/example-external-component/ExampleExternalComponent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ExampleExternalComponent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$2 = {
  components: {
    ExampleExternalComponent
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ExampleExternalComponent = vue.resolveComponent("ExampleExternalComponent");
  _push(serverRenderer.ssrRenderComponent(_component_ExampleExternalComponent, _attrs, null, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/External.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var External = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
var External$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": External
}, Symbol.toStringTag, { value: "Module" }));
var _imports_0 = "/test/assets/landing.b3a58a84.png";
var _imports_1 = "/test/assets/blog.eed5cae8.png";
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><div class="w-screen max-w-4xl mx-auto lg:px-0 px-2"><div class="py-4"><h1 class="font-extrabold text-transparent py-2 text-8xl bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-800 to-purple-900"> A hands on team for apps, websites, tools, and ideas. </h1></div><p class="py-4 text-3xl font-semibold dank"> We love code, and spend a ton of time developing and designing software. Sometimes we also surf \u{1F3C4}\u200D\u2642\uFE0F, drink beer \u{1F37A}, and play video games \u{1F3AE}. We occasionally accept <a class="underline cursor-pointer transition-colors duration-150 hover:text-indigo-400">freelance work</a>, but also work full time on <a class="underline cursor-pointer transition-colors duration-150 hover:text-indigo-400">several projects</a>. </p></div><div class="py-16 w-full overflow-hidden"><div class="w-full overflow-x-scroll flex space-x-4 scrollbar-hide"><div class="bg-transparent w-[325px] flex-shrink-0"></div><img${serverRenderer.ssrRenderAttr("src", _imports_0)} class="w-[700px] object-cover flex-shrink-0 rounded-xl"><img${serverRenderer.ssrRenderAttr("src", _imports_1)} class="w-[700px] object-cover flex-shrink-0 rounded-xl"></div><h1 class="w-screen py-4 max-w-4xl mx-auto lg:px-0 px-2 font-extrabold text-slate-700 text-5xl">The Event Community</h1></div><!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Home.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Home = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
var Home$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": Home
}, Symbol.toStringTag, { value: "Module" }));
var Store_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  async setup() {
    const store = vuex.createStore({
      state: {
        foo: "bar"
      }
    });
    return store.state;
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<h1${serverRenderer.ssrRenderAttrs(_attrs)} data-v-056cb602>${serverRenderer.ssrInterpolate(_ctx.foo)}</h1>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Store.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Store = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-056cb602"]]);
var Store$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": Store
}, Symbol.toStringTag, { value: "Module" }));
exports.render = render;
