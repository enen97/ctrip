import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 引入iconfont图标
import "./assets/fonts/iconfont.css";

// 引入路由
import router from "./router";

// 清空默认样式
import "./styles/reset.css";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
