<template>
  <div class="index">
    <div class="post-list">
      <post-brief v-for="(item, index) in list" :key="'list-' + index" :data="item"/>
    </div>
    <div class="nav">
      <page-nav :page-sizes="[10, 20, 30]" :current-page="currentPage" :total="listTotal" :page-size="pageSize"></page-nav>
    </div>
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
};
</script>
