import { createRouter, createWebHistory } from 'vue-router';
import FirstVue from '../components/FirstVue.vue';
import UserCenter from '../components/UserCenter.vue';
import CreateCrowdfuning from "../components/CreateCrowdfunding.vue"
const routes = [
  {
    path: '/',
    name: 'FirstVue',
    component: FirstVue,
  },
  {
    path: '/usercenter',
    name: 'UserCenter',
    component: UserCenter,
  },
  {
    path: '/createcrowdfunding',
    name: 'CreateCrowdfunding',
    component: CreateCrowdfuning,
  },
  // 其他路由配置...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;