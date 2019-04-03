/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { axios } from './config/index';

import categoriesQuery from './schema/category';
import listQuery from './schema/list';
import utils from './utils/index';

export function createStore() {
  return new Vuex.Store({
    state: {
      categories: [],
      list: [],
      isLoading: false,
      isCollapsed: true, // 侧边菜单是否折叠
      detail: {},
    },
    mutations: {
      SET_CATEGORIES(state, payload = []) {
        state.categories = payload;
      },
      SET_LIST(state, payload = []) {
        state.list = payload.map((item) => ({
          ...item,
          date: utils.timeStampFormat(item.post_date, 'yyyy-MM-dd'),
        }));
      },
      SET_DETAIL(state, payload) {
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
    },
    actions: {
      async _getCategories(context, params) {
        const res = await axios.post('/graphql', {
          query: categoriesQuery,
        });
        if (utils.httpSuccess(res)) {
          context.commit('SET_CATEGORIES', res.data.data.data);
        }
      },
      async _getList(context, params) {
        const res = await axios.post('/graphql', {
          query: listQuery,
        });
        if (utils.httpSuccess(res)) {
          context.commit('SET_LIST', res.data.data.data);
        }
        return res;
      },
      toggleLoading(context, params) {
        context.commit('TOGGLE_LOADING', params);
      },
      async _getDetail(context, params) {
        const res = await axios.post('/graphql', params);
        if (utils.httpSuccess(res)) {
          context.commit('SET_DETAIL', res.data.data.data);
        }
        return res;
      },
    },
    getters: {
      categories4Nav(state, getters) {
        return [
          {
            description: '首页',
            name: '首页',
            slug: '',
          },
        ].concat(state.categories);
      },
    },
  });
}
