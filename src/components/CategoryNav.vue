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
  name: 'CategoryNav',
  asyncData({ store }) {
    // return store.dispatch('_getCategories', {
    //   query: categoriesQuery,
    //   variables: {
    //     currentPage: 1,
    //     pageSize: 20,
    //     taxonomy: 'category',
    //   },
    // });
  },
  computed: {
    ...mapGetters({
      categories4Nav: 'categories4Nav',
    }),
  },
  mounted() {
    this.$store.dispatch('_getCategories', {
      query: categoriesQuery,
      variables: {
        currentPage: 1,
        pageSize: 20,
        taxonomy: 'category',
      },
    });
  },
  methods: {
    ...mapActions(['_getCategories']),
  },
};
</script>
