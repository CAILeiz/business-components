// import _ from "lodash";

// function getAdd(a, b) {
//   return _.add(a, b);
// }

// console.log(getAdd(1, 2));

import comp from "./components/text-tooltips/index";
import { createApp } from "vue";

const app = document.createElement("div");
app.id = "app";
document.body.appendChild(app);

createApp(comp).mount("#app");
