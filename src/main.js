import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
// import Vuex from "vuex";
// import store from "./store";

Vue.use(VueRouter);
Vue.use(ElementUI);
// Vue.use(Vuex);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("./components/Login.vue"),
    meta: {
      title: "首页",
      notRequireAuth: true, //不用登录
    },
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("./components/Login.vue"),
    meta: {
      title: "首页",
      notRequireAuth: true, //不用登录
    },
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
        meta: {
          title: "全部动态",
          notRequireAuth: true,
        },
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
        meta: {
          title: "话题圈",
          notRequireAuth: true,
        },
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
  // store,
}).$mount("#app");

router.beforeEach((to, from, next) => {
  //已经登录了
  if (to.path == "/Login" || to.path == "/") {
    var s = window.localStorage.getItem("AuthToken");
    if (s != null && s != "") {
      alert("已经登录了");
      return;
    }
  }

  // var user = store.state.user;
  console.log(
    " window.localStorage['user'] " + window.localStorage.getItem("user")
  );
  var user = null;
  if (window.localStorage["user"]) {
    user = JSON.parse(window.localStorage.getItem("user"));
  }
  if (to.matched.some((m) => m.meta.notRequireAuth)) {
    //不需要登录
    next();
  } else {
    // 对路由进行验证
    if (user != null) {
      // 已经登陆
      next(); // 正常跳转到你设置好的页面
    } else {
      console.log("main.js " + user);
      // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
      Vue.prototype
        .$confirm("还未登录，是否登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          next({ path: "/Login" });
        });
    }
  }
});

import request from "./utils/request";

//响应拦截
request.interceptors.response.use(
  (res) => {
    console.log("response interceptor ");
    console.log(res);
    return res.data;
  },
  (err) => {
    // 如果 401 状态码
    if (err.response && err.response.status === 401) {
      console.log("response interceptor ");
      console.log(err.response);
      window.localStorage.removeItem("AuthToken");
      window.localStorage.removeItem("user");
      router.push("/login"); //引入 router 模块
    }
    return Promise.reject(err);
  }
);
