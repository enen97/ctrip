import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router';
import './assets/main.css'; // 在这里覆盖变量

const app = createApp(App);
app.use(Vant);
app.use(router);

app.mount('#app')
