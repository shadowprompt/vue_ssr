/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';
export function createApp(ssrContext) {
  // 创建 router 和 store 实例
  const router = createRouter();

  router.beforeEach((to, from, next) => {
    // 上报PV至百度统计代码
    if (typeof _hmt !== 'undefined') {
      _hmt.push(['_trackPageview', to.fullPath]) // 必须是以"/"（斜杠）开头的相对路径
    }
    next()
  })

  const store = createStore();
  // 同步路由状态(route state)到 store
  sync(store, router);
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    ssrContext,
    render: (h) => h(App),
  });
  // 暴露 app, router 和 store。
  return { app, router, store };
}
