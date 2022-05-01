/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { axios } from './config/index';

import * as utils from './utils/index';

// 映射wp-json数组为graphql使用字段
function mapPostItem(item,  total) {
  const categories = item.categories || [];
  const tags = item.tags || [];
  const { author: [aut = {}] = [], 'wp:term': wpTerm = []} = item._embedded || {};
  const wpTermList = wpTerm.flat();
  return {
    ID: item.id,
    post_title: item.title.rendered,
    post_content: item.content.rendered,
    user: {
      display_name: aut.name
    },
    categories: categories.map(item => {
      return wpTermList.find(it => it.id === item);
    }),
    tags: tags.map(item => {
      return wpTermList.find(it => it.id === item);
    }),
    total,
  }
}

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
    },
    actions: {
      _getAllCategories(context, params) {
        return axios
          .get('/wp-json/wp/v2/categories?_embed=1', params)
          .then((res) => {
            // console.log('_getAllCategories -> ', res.data);
            if (utils.httpSuccess(res)) {
              const fetchedCategories = (res.data || []).map(item => ({
                description: item.description,
                name: item.name,
                slug: item.slug,
              }));
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
        const res = await axios.get('/wp-json/wp/v2/categories?_embed=1', params);
        if (utils.httpSuccess(res)) {
          const fetchedCategories = (res.data || []).map(item => ({
            description: item.description,
            name: item.name,
            slug: item.slug,
          }));
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
        const currentPage = params.variables && params.variables.currentPage || 1;
        return axios.get(`/wp-json/wp/v2/posts?_embed=1&orderby=date&order=desc&page=${currentPage}`, params).then((res) => {
          if (utils.httpSuccess(res)) {
            const total = res.headers['x-wp-total'];
            const totalPages = res.headers['x-wp-totalpages'];
            // const data = res.data.data.data;
            // const list = data.list || [];
            const list = (res.data || []).map((item) => mapPostItem(item, total, totalPages));
            // const condition = data.condition || {};
            context.commit('SET_LIST', list);
            // context.commit('SET_SEARCH', condition.name);
          }
        });
      },
      async _getArchiveList(context, params) {
        return [];
        // return axios
        //   .post('/graphql', params)
        //   .then((res) => {
        //     if (utils.httpSuccess(res)) {
        //       const list = res.data.data.data || [];
        //       context.commit('SET_ARCHIVE_LIST', list);
        //     }
        //   });
      },
      _getRecentList(context, params) {
        return axios.get('/wp-json/wp/v2/posts?_embed=1&orderby=date&order=desc', params)
          .then((res) => {
            if (utils.httpSuccess(res)) {
              // const data = res.data.data.data;
              // const list = data.list || [];
              const list = (res.data || []).map((item => {
                mapPostItem(item, 0)
              });
              context.commit('SET_RECENT_LIST', list);
            }
          });
      },
      toggleLoading(context, params) {
        context.commit('TOGGLE_LOADING', params);
      },
      async _getDetail(context, params) {
        const id = params.variables && params.variables.id;
        const res = await axios.get(`/wp-json/wp/v2/posts/${id}?_embed=1`, params);
        if (utils.httpSuccess(res)) {
          const detail = mapPostItem(res.data, 0);
          context.commit('SET_DETAIL', detail);
          context.commit('SET_SEARCH', detail.post_title);
        }
        return res;
      },
      async _getPrevNext(context, params) {
        const res = await axios.post('/wp-json/wp/v2/posts?_embed=1', params);
        if (utils.httpSuccess(res)) {
          const [prevList, nextList] = res.data.data.data;
          context.commit('SET_PREV_NEXT', [prevList[0], nextList[0]]);
        }
        return res;
      },
      async _getRelated(context, params) {
        const res = await axios.get('/wp-json/wp/v2/posts?_embed=1', params);
        if (utils.httpSuccess(res)) {
          const relatedList = res.data.data.data || [];
          context.commit('SET_RELATED_LIST', relatedList);
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
