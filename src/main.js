import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";


Vue.use(VueRouter);
Vue.use(ElementUI);


const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("./components/Login.vue"),
    meta: { title: "首页" },
  },
  {
    path: "/ground",
    name: "Ground",
    component: () => import("./components/Ground.vue"),
    meta: { title: "One页" },
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("./components/Main.vue"),
    meta: { title: "main页" },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");
