<template>
  <div class="index">
    <list></list>
  </div>
</template>
<script>
import List from '../components/List.vue';
import listQuery from '../schema/list';
export default {
  name: 'Index',
  asyncData({ store, route, vm }) {
    const currentPage = Number(route.params.currentPage) || 1;
    console.log('this.currentPage -> ', vm);
    return store.dispatch('_getList', {
      query: listQuery,
      variables: {
        currentPage: currentPage,
        // pageSize: this.pageSize || 4,
        // post_type: "post",
        // post_status: "publish",
      },
    });
  },
  components: {
    List,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
    };
  },
};
</script>
