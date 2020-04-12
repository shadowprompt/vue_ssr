<template>
  <section class="page-nav">
    <select v-if="pageSizes">
      <option v-for="option in pageSizes" :value="option">{{ option }}</option>
    </select>
    <ul class="article-tags" v-if="pages.length > 1">
      <li-item
        v-for="(page, index) in pages"
        :key="'page_' + index"
        class="page-item"
        @click.native="emitCurrentChange(page)"
        :bg-color="bgColors[index]"
        :is-active="currentPage === page"
      >
        <template v-if="['<<', '>>'].includes(page)">
          <span
            :title="page"
          >
            {{ page }}
          </span>
        </template>
        <template v-else>
          <a
            :href="page === 1 ? ((path.slice(0, path.length-1) || '/') + keyword) : (path + 'page/' + page + keyword)"
            :title="page"
            class="inline-a"
          >
            {{ page }}
          </a>
        </template>
      </li-item>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { pagination } from '../utils';
export default {
  name: 'PageNav',
  props: ['currentPage', 'pageSize', 'pageSizes', 'total'],
  components: {
    LiItem,
  },
  computed: {
    ...mapState(['bgColors']),
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    pages() {
      return pagination(3, true)(this.totalPages, this.currentPage);
    },
    routerPathComp() {
      return this.$parent.$parent;
    },
    path() {
      const { currentPage = '' } = this.$route.params || {};
      const { path = '/' } = this.$route;
      const mainPath = path.replace('/page/' + currentPage, '');
      return mainPath.length > 1 && mainPath.slice(-1) === '/'
        ? mainPath
        : mainPath.length > 1
        ? mainPath + '/'
        : '/';
    },
    keyword() {
      const { s } = this.$route.query;
      return s ? `?s=${s}` : '';
    },
  },
  methods: {
    emitCurrentChange(page) {
      this.$emit('current-change', page);
    },
  },
};
</script>
