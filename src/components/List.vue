<template>
  <div class="post-list">
    <postBrief v-for="(item, index) in list" :key="'list-' + index" :data="item"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import postBrief from './PostBrief.vue';

export default {
  components: {
    postBrief,
  },
  // asyncData({ store, route }) {
  //   console.log('list -> asyncData');
  //   // 触发 action 后，会返回 Promise
  //   return store.dispatch('_getList');
  // },
  data() {
    return {};
  },
  computed: {
    ...mapState(['list']),
  },
  methods: {
    ...mapActions(['_getList']),
  },

  async created() {
    // this._getList();
  },
};
</script>
