import { createApp } from "vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import comp from "./components/test/index.vue";

// setInterval(() => {
//   if (document.getElementById("webpack-dev-server-client-overlay"))
//     document.getElementById("webpack-dev-server-client-overlay").style.display =
//       "none";
// }, 1000);

const app = document.createElement("div");
app.id = "app";
document.body.appendChild(app);

const newApp = createApp(comp);

console.log(ElementPlus);

newApp.use(ElementPlus);
newApp.mount("#app");
