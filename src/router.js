import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Detail from "./views/Detail.vue";
import List from "./components/List.vue";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "index",
        component: () => import("./views/Index.vue")
      },
      {
        path: "/page/:currentPage",
        name: "indexPage",
        component: () => import("./views/Index.vue")
      },
      {
        path: "/:id.html",
        name: "detail",
        component: () => import("./views/Detail.vue")
      },
      {
        path: "/category/:slug",
        name: "categoryDetail",
        component: () => import("./views/Category.vue")
      },
      {
        path: "/category/:slug/page/:currentPage",
        name: "categoryDetailPage",
        component: () => import("./views/Category.vue")
      },
      {
        path: "/tag/:slug",
        name: "tagDetail",
        component: () => import("./views/Tag.vue")
      },
      {
        path: "/tag/:slug/page/:currentPage",
        name: "tagDetailPage",
        component: () => import("./views/Tag.vue")
      },
    ]
  });
}
