<template>
  <div class="tag">
    <list></list>
  </div>
</template>

<script>
  import List from '../components/List';
  import listQuery from '../schema/list';
  export default {
    name: 'Tag',
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
      List,
    },
  };
</script>
