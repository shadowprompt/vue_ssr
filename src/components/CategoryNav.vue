<template>
  <Nav>
    <div class="category-item" v-for="(item, index) in categories" @click="handleClick(item.slug)">{{item.name}}</div>
  </Nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      categories: 'categories4Nav',
    }),
  },
  methods: {
    handleClick(path) {
      if (path) {
        this.$router.push(`/${path}`);
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>
