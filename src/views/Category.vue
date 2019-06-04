<template>
  <div class="category">
    <list></list>
  </div>
</template>

<script>
  import List from '../components/List';
  import listQuery from '../schema/list';
export default {
  name: 'Category',
  asyncData({ store, route, vm }) {
    console.log(' vm -> ', vm.currentPage, vm);
    const slug = encodeURI(route.params.slug);
    const currentPage = Number(route.params.currentPage) || 1;
    return store.dispatch('_getList', {
      query: listQuery,
      variables: {
        currentPage,
        slug,
        // ID: `IN (SELECT object_id from wp_term_relationships WHERE term_taxonomy_id = (SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE term_id = (SELECT term_id FROM wp_terms WHERE slug = '${slug}')))`
      },
    });
  },
  components: {
    List,
  },
};
</script>
