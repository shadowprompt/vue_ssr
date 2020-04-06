/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { axios } from './config/index';

import * as utils from './utils/index';

import categoriesQuery from '../src/schema/category';

export function createStore() {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      categories: [],
      list: [],
      isLoading: false,
      isCollapsed: true, // 侧边菜单是否折叠
      detail: {},
      bgColors: [],
    },
    mutations: {
      SET_CATEGORIES(state, payload) {
        state.categories = payload || [];
      },
      SET_LIST(state, payload) {
        payload = (payload || []).filter(item => item);
        state.list = payload.map((item) => ({
          ...item,
          date: utils.timeStampFormat(item.post_date, 'yyyy-MM-dd'),
        }));
      },
      SET_DETAIL(state, payload = {}) {
        state.detail = {
          ...payload,
          date: utils.timeStampFormat(payload.post_date, 'yyyy-MM-dd'),
        };
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
      }
    },
    actions: {
      _getAllCategories(context) {
        return axios
          .post('/graphql', {
            query: categoriesQuery,
            variables: {
              currentPage: 1,
              pageSize: 20,
              taxonomy: 'category',
            },
          })
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
          // console.log('_getList res-> ', res);
          if (utils.httpSuccess(res)) {
            context.commit('SET_LIST', res.data.data.data);
          }
        });
      },
      toggleLoading(context, params) {
        context.commit('TOGGLE_LOADING', params);
      },
      async _getDetail(context, params) {
        const res = await axios.post('/graphql', params);
        if (utils.httpSuccess(res)) {
          context.commit('SET_DETAIL', res.data.data.data || {});
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
