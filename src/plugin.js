import Vue from 'vue';

import { axios } from './config/index';

Vue.prototype.$http = axios;
import './assets/font-awesome/scss/font-awesome.scss';
import './assets/bootstrap.min.css';
import './assets/style.scss';

import config from './pluginConfig';
import LiItem from './components/common/LiItem';
import Links from './components/common/Links';
import Block from './components/common/Block';
import SpanA from './components/common/SpanA';

import PrevNext from './components/detail/PrevNext';
import PostCategories from './components/PostCategories';
import PostTags from './components/PostTags';
import PostTime from './components/PostTime';
import PostAuthor from './components/PostAuthor';

import RecentList from './components/slave/RecentList';

Vue.component('li-item', LiItem);
Vue.component('links', Links);
Vue.component('block', Block);
Vue.component('span-a', SpanA);
Vue.component('prev-next', PrevNext);
Vue.component('post-categories', PostCategories);
Vue.component('post-tags', PostTags);
Vue.component('post-time', PostTime);
Vue.component('post-author', PostAuthor);
Vue.component('recent-list', RecentList);


export default {
  install: (Vue) => {
    Object.entries(config).forEach(([key, value]) => {
      // Vue.component(key, () => import(value));
    });
  },
}
