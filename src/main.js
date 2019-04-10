/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
Vue.config.devtools = true;

import { createRouter } from "./router";
import { createStore } from "./store";
import { axios } from "./config/index";


Vue.prototype.$http = axios;


Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      console.log("async", asyncData);
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      });
    }
  }
});
const router = createRouter();
const store = createStore();
let main = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
