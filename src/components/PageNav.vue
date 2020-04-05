<template>
  <section class="page-nav">
    <select v-if="pageSizes">
      <option v-for="option in pageSizes" :value="option">{{ option }}</option>
    </select>
    <ul class="article-tags">
      <li-item
        v-for="(page, index) in pages"
        :key="'page_' + index"
        @click.native="emitCurrentChange(page, index, $event)"
        :bgColor="bgColors[index]"
      >
        <router-link
          :tag="['<<', '>>'].includes(page) ? 'span' : 'a'"
          :to="page === 1 ? path.slice(0, path.length-1) : path + 'page/' + page"
          :title="page"
          class="inline-a"
        >
          {{ page }}
        </router-link>
      </li-item>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import LiItem from '../components/LiItem';
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
      return pagination(5, true)(this.totalPages, this.currentPage);
    },
    routerPathComp() {
      return this.$parent.$parent;
    },
    path() {
      const { currentPage = '' } = this.routerPathComp.$route.params || {};
      const { path = '/' } = this.$route;
      const mainPath = path.replace('/page/' + currentPage, '');
      return mainPath.length > 1 && mainPath.slice(-1) === '/'
        ? mainPath
        : mainPath.length > 1
        ? mainPath + '/'
        : '/';
    },
  },
  methods: {
    emitCurrentChange(page) {
      this.$emit('current-change', page);
    },
  },
};
</script>
