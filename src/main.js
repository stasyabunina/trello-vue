import { createApp } from "vue";
import "./style.scss";
import store from "./app/store.js";
import App from "./App.vue";

const app = createApp(App);
app.use(store);
app.mount("#app");
