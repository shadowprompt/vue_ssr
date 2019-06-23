<template>
  <div id="app">
    <div id="loading" :class="$store.state.isLoading ? 'active' : ''"></div>
    <header id="header" class="top-header" :class="{ fixed: topFixed }">
      <div class="flex-row">
        <span class="top-icon bars-wrap" @click="TOGGLE_COLLAPSE()">
          <i class="fa fa-bars"></i>
        </span>
        <div class="flex-col header-title ellipsis">
          {{ config.static.websiteName }}
        </div>

        <span class="top-icon search-wrap"> <i class="fa fa-search"></i> </span>
        <span class="top-icon share-wrap">
          <i class="fa fa-share-alt"></i>
        </span>
      </div>
    </header>
    <header class="index-header">
      <div class="container fade-scale in">
        <h1 class="title"><span class="pointer" @click="$router.push('/')">道招</span></h1>
        <h5 class="subtitle"></h5>
      </div>
    </header>
    <aside-menu :show="!isCollapsed"></aside-menu>
    <d-z-mask :visible="!isCollapsed"></d-z-mask>
    <div id="goto" @click="handleGoto"><i class="fa fa-arrow-up"></i></div>
    <!--<header id="nav">-->
    <!--<category-nav></category-nav>-->
    <!--</header>-->
    <section class="container body-wrapper">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import DZMask from './components/common/Mask';
import CategoryNav from './components/CategoryNav';
import asideMenu from './components/aside/Menu';
import { config } from './config';

export default {
  components: {
    DZMask,
    CategoryNav,
    asideMenu,
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
    ...mapState(['categories', 'isCollapsed']),
  },
  async created() {
    // 将this传入并设置axios拦截器
    this.$http.setConfig(this);
    this.$store.commit('GEN_BG_COLORS');
    // this._getCategories();
    this.scrollFn = this.createDebounce(900, this.cal);
  },
  mounted() {
    this.body = document.querySelector('body');
    this.goto = document.querySelector('#goto');
    window.document.addEventListener('scroll', this.scrollFn);
    window.vm = this;
  },
  beforeDestroy() {
    window.document.removeEventListener('scroll', this.scrollFn);
  },
  methods: {
    ...mapMutations(['TOGGLE_LOADING', 'TOGGLE_COLLAPSE']),
    ...mapActions(['_getCategories']),
    cal() {
      this.topFixed = !!(window.scrollY > 72);
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
    handleGoto() {
      window.scrollTo(0, 0);
    },
  },
  watch: {
    $route(to, from) {
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
