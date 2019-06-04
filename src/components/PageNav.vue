<template>
  <section>
    <select>
      <option v-for="option in pageSizes" :value="option">{{ option }}</option>
    </select>
    <ul class="article-tags">
      <li class="tag-item" v-for="(page, index) in pages">
        <router-link :to="path + (index === 0 ? '' : 'page/' + (index + 1)) ">{{page}}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'PageNav',
  props: ['currentPage', 'pageSize', 'pageSizes', 'total'],
  computed: {
    pages() {
      return Math.ceil(this.total / this.pageSize);
    },
    routerPathComp() {
      return this.$parent.$parent;
    },
    path() {
      const {currentPage = '' } = this.routerPathComp.$route.params || {};
      const { path = '/' } = this.$route;
      return path.replace('/page/' + currentPage, '') || '/';
    },
  },
};
</script>
