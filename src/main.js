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
        children: [
          {
            path: "/letter_Panel",
            name: "Letter_Panel",
            component: () => import("./components/Letter_Panel.vue"),
            meta: { title: "全部动态" },
          },
        ],
      },
      {
        path: "/storage",
        name: "Storage",
        component: () => import("./components/pages/Storage.vue"),
        meta: { title: "我的收藏" },
        children: [
          {
            path: "/storage_Dynamic",
            name: "Storage_Dynamic",
            component: () => import("./components/Storage_List.vue"),
            meta: { title: "收藏的动态" },
          },
          {
            path: "/storage_Article",
            name: "Storage_Article",
            component: () => import("./components/Storage_List.vue"),
            meta: { title: "收藏的文章" },
          },
          {
            //动态路由匹配
            path: "/storage_Dir/*",
            name: "Storage_Dir",
            component: () => import("./components/Storage_List.vue"),
            meta: { title: "收藏的文件夹" },
          },
        ],
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
        children: [
          {
            path: "/Product_Dynamic",
            name: "Product_Dynamic",
            component: () => import("./components/product/Product_List.vue"),
            meta: { title: "创作的动态" },
          },
          {
            path: "/Product_Article",
            name: "Product_Article",
            component: () => import("./components/product/Product_List.vue"),
            meta: { title: "创作的文章" },
          },
        ],
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
      {
        path: "/personalCenter",
        name: "PersonalCenter",
        component: () => import("./components/pages/PersonalCenter.vue"),
        meta: { title: "我参与的话题" },
      },
    ],
  },

  {
    path: "/user",
    name: "User",
    component: () => import("./components/user/User.vue"),
    meta: { title: "新开用户详情页" },
  },
  {
    path: "/storage/dynamic/detail/",
    name: "Storage_Dynamic_Detail",
    component: () => import("./components/detail/Storage_Dynamic.vue"),
    meta: { title: "新开收藏动态详情页" },
  },
  {
    path: "/storage/article/detail/",
    name: "Storage_Article_Detail",
    component: () => import("./components/detail/Storage_Article.vue"),
    meta: { title: "新开收藏文章详情页" },
  },
  {
    path: "/storage/dir/detail",
    name: "Storage_Dir_Detail",
    component: () => import("./components/detail/Storage_Dynamic.vue"),
    meta: { title: "新开收藏文件夹详情页" },
  },
  {
    path: "/product/dynamic/detail/",
    name: "Product_Dynamic_Detail",
    component: () => import("./components/product/Product_Dynamic.vue"),
    meta: { title: "新开创作动态详情页" },
  },
  {
    path: "/product/article/detail/",
    name: "Product_Article_Detail",
    component: () => import("./components/product/Product_Article.vue"),
    meta: { title: "新开创作文章详情页" },
  },
  {
    path: "/circle",
    name: "Circle",
    component: () => import("./components/topic_circle/Circle_Detail.vue"),
    meta: { title: "新开话题圈详情页" },
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
