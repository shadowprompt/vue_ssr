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
        // component: Index,
        component: () => import("./views/Index.vue")
      },
      {
        path: "/:id",
        name: "detail",
        // component: Detail,
        component: () => import("./views/Detail.vue")
      },
      {
        path: "/list",
        name: "list",
        // component: List,
        component: () => import("./components/List.vue")
      }
    ]
  });
}
