import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "remixicon/fonts/remixicon.css";

import "./assets/main.css";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

app.use(router);

app.mount("#app");
