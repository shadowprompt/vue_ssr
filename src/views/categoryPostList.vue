<template>
  <div class="post-list-container category">
    <post-list></post-list>
  </div>
</template>

<script>
  import PostList from '../components/PostList';
  import listQuery from '../schema/list';
export default {
  name: 'categoryPostList',
  asyncData({ store, route }) {
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
    PostList,
  },
};
</script>
