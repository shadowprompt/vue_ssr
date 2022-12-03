/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import defaultAxios from 'axios';
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
      relatedList: [], // 相关文章
      recentList: [], // 最近文章
      adMap: {}, // 广告信息
      isGrayDay: false, // 是否是重大悲伤日（比如512），需要网站置灰
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
          date: utils.timeStampFormat(payload.post_date, 'yyyy-MM-dd HH:mm'),
          dateUrl: utils.timeStampFormat(payload.post_date, 'yyyy/MM/dd'),
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
      SET_RELATED_LIST(state, payload) {
        state.relatedList = payload.map(item => ({
          title: item.post_title,
          content: utils.getSafeHtml(item.post_content, 100),
          href: `/${item.ID}.html`
        }));
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
      SET_AD_MAP(state, payload) {
        state.adMap = payload;
      },
      SET_GRAY_DAY(state, payload) {
        state.isGrayDay = payload;
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
      async _getRelated(context, params) {
        const res = await axios.post('/graphql', params);
        if (utils.httpSuccess(res)) {
          const relatedList = res.data.data.data || [];
          context.commit('SET_RELATED_LIST', relatedList);
        }
        return res;
      },
      async _getAllAds(context) {
        const port = process.env.PORT || 8899;
        const res = await defaultAxios.get(`http://localhost:${port}/_res/ad.json`);
        if (utils.httpSuccess(res)) {
          context.commit('SET_AD_MAP', res.data);
        }
      },
      // 是否是重大悲伤日，需要网站置灰的
      async _getGrayDay(context) {
        const port = process.env.PORT || 8899;
        const res = await axios.post('https://gateway.daozhao.com.cn/daozhao/grayDays', {
          days: [],
        });
        if (utils.httpSuccess(res)) {
          const list = res.data.newDays || [];
          const hasGrayDay = list.some(item => Date.now() < new Date(item).getTime())
          context.commit('SET_GRAY_DAY', hasGrayDay);
        }
      }
    },
    getters: {
      listTotal(state) {
        const [{ total = 0 } = {}] = state.list;
        return total;
      },
    },
  });
}
