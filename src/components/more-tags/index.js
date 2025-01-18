import Lib from "./src/index.vue";

Lib.install = function (Vue) {
  Vue.component(Lib.name, Lib);
};

export default Lib;
