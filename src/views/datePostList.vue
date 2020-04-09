<template>
  <div class="post-list-container date">
    <post-list></post-list>
  </div>
</template>

<script>
  import PostList from '../components/PostList';
  import listQuery from '../schema/list';
  export default {
    name: 'datePostList',
    asyncData({ store, route }) {
      const { year, month, day } = route.params;
      const currentPage = Number(route.params.currentPage) || 1;
      return store.dispatch('_getList', {
        query: listQuery,
        variables: {
          currentPage,
          year,
          month,
          day,
        },
      });
    },
    components: {
      PostList,
    },
  };
</script>
