import comp from "@/components/test/index.vue";

import { createApp } from "vue";

setInterval(() => {
  if (document.getElementById("webpack-dev-server-client-overlay"))
    document.getElementById("webpack-dev-server-client-overlay").style.display =
      "none";
}, 1000);
const app = document.createElement("div");
app.id = "app";
document.body.appendChild(app);

createApp(comp).mount("#app");
