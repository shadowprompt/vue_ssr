<template>
  <div id="app-container">
    <div id="loading" :class="isLoading ? 'active' : ''"></div>
    <div class="main-con">
      <header class="top-header" :class="{ fixed: topFixed }">
        <div class="flex-row">
          <span class="top-icon bars-wrap" @click="TOGGLE_COLLAPSE()">
            <i class="fa fa-bars"></i>
          </span>
          <div class="flex-col header-title ellipsis">
            {{ config.static.siteName }}
          </div>
          <search></search>
          <share></share>
        </div>
      </header>
      <section class="main-header">
        <header class="banner-header">
          <div class="media-container fade-scale in">
            <h1 class="title">
              <a class="pointer inline-contrast" href="/">
                {{ config.static.siteName }}
              </a>
            </h1>
            <h5 class="subtitle">{{ config.static.siteDes }}</h5>
          </div>
        </header>
        <category-nav></category-nav>
      </section>

      <section style="display: flex">
        <section class="media-container body-wrapper">
          <router-view></router-view>
        </section>
        <slave-list></slave-list>
      </section>

      <jumper />
      <statement />
      <footer-block></footer-block>
    </div>
    <div class="left-con">
      <aside-menu :show="!isCollapsed"></aside-menu>
      <d-z-mask :visible="!isCollapsed"></d-z-mask>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';
  import DZMask from '../components/common/Mask';
  import Jumper from '../components/common/Jumper';
  import Statement from '../components/Statement';
  import FooterBlock from '../components/FooterBlock';
  import CategoryNav from '../components/CategoryNav';
  import AsideMenu from '../components/aside/Menu';
  import SlaveList from '../components/slave/SlaveList';
  import Search from '../components/Search';
  import Share from '../components/Share';
  import { config } from '../config';

  import categoriesQuery from '../schema/category';
  import archiveListQuery from '../schema/archiveList';
  import recentListQuery from '../schema/recentList';

  export default {
    name: 'Layout',
    components: {
      FooterBlock,
      SlaveList,
      Statement,
      Jumper,
      DZMask,
      CategoryNav,
      AsideMenu,
      Search,
      Share,
    },
    asyncData({ store, route }) {
      // 触发 action 后，会返回 Promise
      return Promise.all([
        store.dispatch('_getAllCategories', {
          query: categoriesQuery,
          variables: {
            currentPage: 1,
            pageSize: 20,
            taxonomy: 'category',
          },
        }),
        store.dispatch('_getArchiveList', {
          query: archiveListQuery,
        }),
        store.dispatch('_getRecentList', {
          query: recentListQuery,
        }),
      ]);
    },
    data() {
      return {
        config,
        body: null,
        goto: null,
        prevTime: null,
        topFixed: false,
      };
    },
    provide() {
      return config;
    },
    computed: {
      ...mapState(['isLoading', 'categories', 'isCollapsed']),
    },
    async created() {
      // 将this传入并设置axios拦截器
      this.$http.setConfig(this);
      this.$store.commit('GEN_BG_COLORS');
      this.scrollFn = this.createDebounce(100, this.cal);
    },
    mounted() {
      this.body = document.querySelector('body');
      this.goto = document.querySelector('#goto');
      // window.document.addEventListener('scroll', this.scrollFn);
      window.vm = this;
    },
    beforeDestroy() {
      // window.document.removeEventListener('scroll', this.scrollFn);
    },
    methods: {
      ...mapMutations(['TOGGLE_LOADING', 'TOGGLE_COLLAPSE']),
      ...mapActions(['_getCategories']),
      cal() {
        if (!this.goto) {
          return;
        }
        this.topFixed = window.scrollY > 72;
        if (window.scrollY > 210) {
          this.goto.classList.add('show');
        } else {
          this.goto.classList.remove('show');
        }
      },
      createDebounce(ms, fn) {
        let prevTime;
        return () => {
          if (prevTime) {
            if (Date.now() - prevTime >= ms) {
              fn();
              prevTime = null;
            }
          } else {
            prevTime = Date.now();
          }
        };
      },
    },
    watch: {
      $route() {
        // 页面跳转就开启loading效果
        this.TOGGLE_LOADING(true);
      },
      isCollapsed(val) {
        if (val) {
          this.body.classList.remove('lock');
        } else {
          this.body.classList.add('lock');
        }
      },
    },
  };
</script>
