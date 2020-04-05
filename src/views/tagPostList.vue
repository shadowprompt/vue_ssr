<template>
  <div class="post-list-container tag">
    <post-list></post-list>
  </div>
</template>

<script>
  import PostList from '../components/PostList';
  import listQuery from '../schema/list';
  export default {
    name: 'tagPostList',
    asyncData({ store, route, vm }) {
      const slug = encodeURI(route.params.slug);
      const currentPage = Number(route.params.currentPage) || 1;
      return store.dispatch('_getList', {
        query: listQuery,
        variables: {
          currentPage,
          slug,
        },
      });
    },
    components: {
      PostList,
    },
  };
</script>
