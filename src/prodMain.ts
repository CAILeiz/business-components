import textTooltips from "./components/text-tooltips/index";
import * as utils from "./utils/index";

export * from "./utils/index";
export { textTooltips };

const Libs = [textTooltips];
const install = function (Vue: any) {
  Libs.forEach((lib: any) => {
    lib.install(Vue);
  });
};

const BussinessComponents = {
  install,
  ...Libs,
  Libs,
  version: "1.0.0",
  name: "@lego/bussinessComponents",
};

Object.keys(utils).forEach((key) => {
  const fn = utils[key];
  if (BussinessComponents[key]) {
    console.error("utils方法出现重名");
  }
  BussinessComponents[key] = fn;
});

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(BussinessComponents);
}

export default BussinessComponents;
