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
    meta: { title: "主页" },
    redirect: "/allTrends", // 设置默认打开的页面 全部动态
    children: [
      {
        path: "/allTrends",
        name: "AllTrends",
        component: () => import("./components/pages/AllTrends.vue"),
        meta: { title: "全部动态" },
      },
      {
        path: "/careAbout",
        name: "CareAbout",
        component: () => import("./components/pages/CareAbout.vue"),
        meta: { title: "我关注的" },
      },
      {
        path: "/privateLetter",
        name: "PrivateLetter",
        component: () => import("./components/pages/PrivateLetter.vue"),
        meta: { title: "私信" },
      },
      {
        path: "/storage",
        name: "Storage",
        component: () => import("./components/pages/Storage.vue"),
        meta: { title: "我的收藏" },
      },
      {
        path: "/concernedPeople",
        name: "ConcernedPeople",
        component: () => import("./components/pages/ConcernedPeople.vue"),
        meta: { title: "我关注的人" },
      },
      {
        path: "/myProduct",
        name: "MyProduct",
        component: () => import("./components/pages/MyProduct.vue"),
        meta: { title: "我的创作" },
      },
      {
        path: "/topic_circle",
        name: "Topic_Circle",
        component: () => import("./components/pages/Topic_Circle.vue"),
        meta: { title: "话题圈" },
      },
      {
        path: "/topic_circle_join",
        name: "Topic_Circle_Join",
        component: () => import("./components/pages/Topic_Circle_Join.vue"),
        meta: { title: "我参与的话题" },
      },
      {
        path: "/peopleFollowMe",
        name: "PeopleFollowMe",
        component: () => import("./components/pages/PeopleFollowMe.vue"),
        meta: { title: "我参与的话题" },
      },
    ],
  },

  {
    path: "/user",
    name: "User",
    component: () => import("./components/user/User.vue"),
    meta: { title: "用户详情页" },
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
