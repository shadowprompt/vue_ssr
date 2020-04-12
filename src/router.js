import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'base',
        component: () => import('./views/layout.vue'),
        redirect:  'indexList',
        children: [
          {
            path: '/',
            name: 'indexList',
            component: () => import('./views/indexPostList.vue'),
          },
          {
            path: '/page/:currentPage',
            name: 'indexListPage',
            component: () => import('./views/indexPostList.vue'),
          },
          {
            path: '/:id.html',
            name: 'detail',
            component: () => import('./views/postDetail.vue'),
          },
          {
            path: '/category/:slug',
            name: 'categoryList',
            component: () => import('./views/categoryPostList.vue'),
          },
          {
            path: '/category/:slug/page/:currentPage',
            name: 'categoryListPage',
            component: () => import('./views/categoryPostList.vue'),
          },
          {
            path: '/tag/:slug',
            name: 'tagList',
            component: () => import('./views/tagPostList.vue'),
          },
          {
            path: '/tag/:slug/page/:currentPage',
            name: 'tagListPage',
            component: () => import('./views/tagPostList.vue'),
          },
          {
            path: '/date/:year',
            name: 'dateListYear',
            component: () => import('./views/datePostList.vue'),
          },
          {
            path: '/date/:year/:month/',
            name: 'dateListYearMonth',
            component: () => import('./views/datePostList.vue'),
          },
          {
            path: '/date/:year/:month/:day',
            name: 'dateListYearMonthDay',
            component: () => import('./views/datePostList.vue'),
          },
        ],
      },
    ],
  });
}
