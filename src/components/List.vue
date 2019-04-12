<template>
  <div class="index">
    <div class="post-list">
      <postBrief v-for="(item, index) in list" :key="'list-' + index" :data="item"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import postBrief from './PostBrief.vue';

export default {
  componentName: '$list',
  asyncData({ store, route }) {
    return store.dispatch('_getList');
  },
  components: {
    postBrief,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['list']),
  },
};
</script>
