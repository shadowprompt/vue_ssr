<template>
  <Nav id="nav">
    <a
      class="category-item"
      v-for="(item, index) in categories"
      :key="item.slug + '/' + index"
      :href="item.slug ? '/category/' + item.slug : '/'"
    >
      {{ item.name }}
    </a>
  </Nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import categoriesQuery from '../schema/category';
export default {
  name: 'CategoryNav',
  // asyncData({ store }) {
  //   return store.dispatch('_getCategories', {
  //     query: categoriesQuery,
  //     variables: {
  //       currentPage: 1,
  //       pageSize: 20,
  //       taxonomy: 'category',
  //     },
  //   });
  // },
  computed: {
    ...mapState({
      categories: 'categories',
    }),
  },
  mounted() {
    // this.$store.dispatch('_getCategories', {
    //   query: categoriesQuery,
    //   variables: {
    //     currentPage: 1,
    //     pageSize: 20,
    //     taxonomy: 'category',
    //   },
    // });
  },
  methods: {
    ...mapActions(['_getCategories']),
  },
};
</script>
