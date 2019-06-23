<template>
  <Nav id="nav">
    <router-link
      class="category-item"
      v-for="(item, index) in categories4Nav"
      :key="item.slug + '/' + index"
      :to="item.slug ? '/category/' + item.slug : '/'"
    >
      {{ item.name }}
    </router-link>
  </Nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import categoriesQuery from '../schema/category';
export default {
  asyncData({ store }) {
    return store.dispatch('_getCategories', {
      query: categoriesQuery,
      variables: {
        currentPage: 1,
        pageSize: 20,
        taxonomy: 'category',
      },
    });
  },
  created() {
    this._getCategories({
      query: categoriesQuery,
      variables: {
        currentPage: 1,
        pageSize: 20,
        taxonomy: 'category',
      },
    });
  },
  computed: {
    ...mapGetters({
      categories4Nav: 'categories4Nav',
    }),
  },
  methods: {
    ...mapActions(['_getCategories']),
  },
};
</script>
