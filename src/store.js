/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { axios } from './config/index';

import * as utils from './utils/index';

export function createStore() {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      categories: [],
      list: [],
      archiveList: [], // 归档的列表
      isLoading: false,
      isCollapsed: true, // 侧边菜单是否折叠
      detail: {},
      bgColors: [],
      searchWord: '', // 当前的搜索/分类关键字
      prevNext: { // 当前文章的上一篇、下一篇
        prev: {},
        next: {},
      },
      recentList: [], // 最近文章
    },
    mutations: {
      SET_CATEGORIES(state, payload) {
        state.categories = payload || [];
      },
      SET_LIST(state, payload) {
        payload = (payload || []).filter((item) => item);
        state.list = payload.map((item) => ({
          ...item,
          date: utils.timeStampFormat(item.post_date, 'yyyy-MM-dd'),
          dateUrl: utils.timeStampFormat(item.post_date, 'yyyy/MM/dd'),
        }));
      },
      SET_ARCHIVE_LIST(state, payload) {
        state.archiveList = payload.map((item) => ({
          href: `/date/${item.year}/${item.month.padStart(2, '0')}`, // 保持稳定的两位
          title: `${item.year}年${item.month}日`,
        }));
      },
      SET_DETAIL(state, payload = {}) {
        state.detail = {
          ...payload,
          date: utils.timeStampFormat(payload.post_date, 'yyyy-MM-dd'),
        };
      },
      SET_PREV_NEXT(state, [prev = {}, next = {}]) {
        state.prevNext= {
          prev: {
            title: prev.post_title || '到底了',
            href: prev.ID ? `/${prev.ID}.html` : '',
          },
          next: {
            title: next.post_title || '到顶了',
            href: next.ID ? `/${next.ID}.html` : '',
          }
        };
      },
      SET_RECENT_LIST(state, payload) {
        state.recentList = payload.map(item => ({
          title: item.post_title,
          href: `/${item.ID}.html`
        }));
      },
      TOGGLE_LOADING(state, payload) {
        state.isLoading = payload === undefined ? !state.isLoading : payload;
      },
      TOGGLE_COLLAPSE(state, payload) {
        state.isCollapsed =
          payload === undefined ? !state.isCollapsed : payload;
      },
      GEN_BG_COLORS(state) {
        state.bgColors = new Array(10).fill(1).map(() => utils.genColor());
      },
      SET_SEARCH(state, payload) {
        state.searchWord = payload;
      },
    },
    actions: {
      _getAllCategories(context, params) {
        return axios
          .post('/graphql', params)
          .then((res) => {
            if (utils.httpSuccess(res)) {
              const fetchedCategories = res.data.data.data || [];
              const allCategories = [
                {
                  description: '首页',
                  name: '首页',
                  slug: '',
                },
                ...fetchedCategories,
              ];
              context.commit('SET_CATEGORIES', allCategories);
            }
          });
      },
      async _getCategories(context, params) {
        const res = await axios.post('/graphql', params);
        if (utils.httpSuccess(res)) {
          const fetchedCategories = res.data.data.data || [];
          const allCategories = [
            {
              description: '首页',
              name: '首页',
              slug: '',
            },
            ...fetchedCategories,
          ];
          context.commit('SET_CATEGORIES', allCategories);
        }
      },
      async _getList(context, params) {
        return axios.post('/graphql', params).then((res) => {
          if (utils.httpSuccess(res)) {
            const data = res.data.data.data;
            const list = data.list || [];
            const condition = data.condition || {};
            context.commit('SET_LIST', list);
            context.commit('SET_SEARCH', condition.name);
          }
        });
      },
      async _getArchiveList(context, params) {
        return axios
          .post('/graphql', params)
          .then((res) => {
            if (utils.httpSuccess(res)) {
              const list = res.data.data.data || [];
              context.commit('SET_ARCHIVE_LIST', list);
            }
          });
      },
      _getRecentList(context, params) {
        return axios.post('/graphql', params)
          .then((res) => {
            if (utils.httpSuccess(res)) {
              const data = res.data.data.data;
              const list = data.list || [];
              // console.log(' listlist-> ', list);
              context.commit('SET_RECENT_LIST', list);
            }
          });
      },
      toggleLoading(context, params) {
        context.commit('TOGGLE_LOADING', params);
      },
      async _getDetail(context, params) {
        const res = await axios.post('/graphql', params);
        if (utils.httpSuccess(res)) {
          const detail = res.data.data.data || {};
          context.commit('SET_DETAIL', detail);
          context.commit('SET_SEARCH', detail.post_title);
        }
        return res;
      },
      async _getPrevNext(context, params) {
        const res = await axios.post('/graphql', params);
        if (utils.httpSuccess(res)) {
          const [prevList, nextList] = res.data.data.data;
          context.commit('SET_PREV_NEXT', [prevList[0], nextList[0]]);
        }
        return res;
      },
    },
    getters: {
      listTotal(state) {
        const [{ total = 0 } = {}] = state.list;
        return total;
      },
    },
  });
}
