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
        <h1 class="title">道招</h1>
        <h5 class="subtitle"></h5>
      </div>
    </header>
    <aside id="menu" :class="{ show: !isCollapsed }">
      <div class="inner flex-row-vertical">
        <!--<a href="javascript: void 0;" class="header-icon waves-effect waves-circle waves-light" id="menu-off">-->
        <!--<i class="icon icon-lg icon-close"></i>-->
        <!--</a>-->
        <div class="brand-wrap" style="background-image:url('/brand.jpg')">
          <div class="brand">
            <a href="/" class="avatar waves-effect waves-circle waves-light">
              <img :src="avatarUrl" />
            </a>
            <hgroup class="introduce">
              <h5 class="nickname">普若木特</h5>
              <a
                href="mailto:634206017@qq.com"
                title="634206017@qq.com"
                class="mail"
                >634206017@qq.com</a
              >
            </hgroup>
          </div>
        </div>
        <div class="scroll-wrap flex-col">
          <ul class="nav">
            <li
              v-for="(item, index) in asides"
              class="waves-block waves-effect"
            >
              <a
                :href="item.path"
                :target="item.target ? item.target : '_self'"
              >
                <i :class="['fa', 'fa-' + item.icon]"></i>
                <span class="name">{{ item.name }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <div
      class="mask"
      id="mask"
      :class="{ show: !isCollapsed }"
      @click="TOGGLE_COLLAPSE(true)"
    ></div>
    <div id="goto" @click="handleGoto"><i class="fa fa-arrow-up"></i></div>
    <!--<header id="nav">-->
    <!--<category-nav></category-nav>-->
    <!--</header>-->
    <section class="container body-wrapper"><router-view /></section>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import CategoryNav from './components/CategoryNav';
import { config } from './config';

export default {
  components: {
    CategoryNav,
  },
  data() {
    return {
      config,
      // avatarUrl: require('./img/avatar.jpg'),
      brandStyle: {
        // backgroundImage: require('../public/brand.jpg'),
      },
      body: null,
      goto: null,
      prevTime: null,
      topFixed: false,
      asides: [
        {
          icon: 'home',
          path: '/',
          name: '主页',
        },
        {
          icon: 'archive',
          path: '/archive',
          name: '存档',
        },
        {
          icon: 'tag',
          path: '/tag',
          name: '标签',
        },
        {
          icon: 'github',
          path: 'https://shadowprompt.github.com',
          target: '_blank',
          name: 'Github',
        },
      ],
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
    this._getCategories();
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
