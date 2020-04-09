<template>
  <div class="post-list">
    <template v-if="list.length > 0">
      <post-brief
        v-for="(item, index) in list"
        :key="'list-' + index"
        :data="item"
      />
      <page-nav
        :current-page="currentPage"
        :total="listTotal"
        :page-size="pageSize"
        @current-change="onCurrentChange"
      ></page-nav>
    </template>
    <template v-else>
      <p>没有符合您条件的结果。请换关键词搜索试试。</p>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import postBrief from './PostBrief.vue';
import PageNav from './PageNav.vue';

export default {
  name: 'List',
  componentName: '$list',
  components: {
    postBrief,
    PageNav,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    ...mapState(['list']),
    ...mapGetters(['listTotal']),
  },
  methods: {
    onCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler(val) {
        if (val && val.currentPage) {
          this.onCurrentChange(val.currentPage * 1);
        }
      },
    },
  },
};
</script>
