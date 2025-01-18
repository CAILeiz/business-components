import comp from "@/components/text-tooltips/index";
import { createApp } from "vue";

setInterval(() => {
  if (document.querySelector("#webpack-dev-server-client-overlay"))
    document.querySelector("#webpack-dev-server-client-overlay").style.display =
      "none";
}, 2000);
const app = document.createElement("div");
app.id = "app";
document.body.appendChild(app);

createApp(comp).mount("#app");
