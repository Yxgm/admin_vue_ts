import { createApp } from "vue";
import "normalize.css";
import "element-plus/dist/index.css";
import "./assets/css/index.less";

import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { setupStore } from "./store";
import { globalRegister } from "@/global";
const app = createApp(App);

app.use(store);
app.use(ElementPlus);
setupStore();
app.use(router);
app.use(globalRegister);
app.mount("#app");
