/* eslint-disable */
import Vue from 'vue';
import { createApp } from './app';
import { axios } from './config/index';
Vue.prototype.$http = axios;
import './assets/font-awesome/scss/font-awesome.scss';
import './assets/bootstrap.min.css';
import './assets/style.scss';

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context);
    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      console.log('++matchedComponents -> ', matchedComponents.length);

      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(
        matchedComponents.map((Component) => {
          if (Component.asyncData) {
            console.log(' -> ', );
            // console.log('entry-server 有asyncData -> ');
            return Component.asyncData({
              store,
              route: router.currentRoute,
            });
          }
        }),
      )
        .then((result) => {
          // 在所有预取钩子(preFetch hook) resolve 后，
          // 我们的 store 现在已经填充入渲染应用程序所需的状态。
          // 当我们将状态附加到上下文，
          // 并且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
          context.state = store.state;
          // Promise 应该 resolve 应用程序实例，以便它可以渲染
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
