import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'vant/lib/index.css';
import { Button } from 'vant';

const app = createApp(App);
app.use(router);
app.use(Button); // 注册需要使用的Vant组件

app.mount('#app');