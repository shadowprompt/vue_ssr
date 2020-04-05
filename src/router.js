import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "index",
        component: () => import("./views/indexPostList.vue")
      },
      {
        path: "/page/:currentPage",
        name: "indexPage",
        component: () => import("./views/indexPostList.vue")
      },
      {
        path: "/:id.html",
        name: "detail",
        component: () => import("./views/postDetail.vue")
      },
      {
        path: "/category/:slug",
        name: "categoryDetail",
        component: () => import("./views/categoryPostList.vue")
      },
      {
        path: "/category/:slug/page/:currentPage",
        name: "categoryDetailPage",
        component: () => import("./views/categoryPostList.vue")
      },
      {
        path: "/tag/:slug",
        name: "tagDetail",
        component: () => import("./views/tagPostList.vue")
      },
      {
        path: "/tag/:slug/page/:currentPage",
        name: "tagDetailPage",
        component: () => import("./views/tagPostList.vue")
      },
    ]
  });
}
