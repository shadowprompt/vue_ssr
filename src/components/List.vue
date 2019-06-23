<template>
  <div class="index">
    <div class="post-list">
      <post-brief
        v-for="(item, index) in list"
        :key="'list-' + index"
        :data="item"
      />
    </div>
    <page-nav
      :current-page="currentPage"
      :total="listTotal"
      :page-size="pageSize"
      @current-change="onCurrentChange"
    ></page-nav>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import postBrief from './PostBrief.vue';
import PageNav from './PageNav.vue';

export default {
  componentName: '$list',
  components: {
    postBrief,
    PageNav,
  },
  data() {
    return  {
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
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler(val) {
        if (val && val.currentPage) {
          this.onCurrentChange(val.currentPage * 1);
        }
      }
    }
  }
};
</script>
