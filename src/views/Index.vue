<template>
  <div class="index">
    <list></list>
  </div>
</template>
<script>
import List from '../components/List.vue';
export default {
  components: {
    List,
  },
  asyncData({ store, route }) {
    console.log('list -> asyncData', route);
    // 触发 action 后，会返回 Promise
    return store.dispatch('_getList');
  },
};
</script>
