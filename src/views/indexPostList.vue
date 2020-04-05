<template>
  <div class="post-list-container index">
    <post-list></post-list>
  </div>
</template>
<script>
import PostList from '../components/PostList.vue';
import listQuery from '../schema/list';
export default {
  name: 'indexPostList',
  asyncData({ store, route }) {
    const currentPage = Number(route.params.currentPage) || 1;
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
    PostList,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
    };
  },
};
</script>
