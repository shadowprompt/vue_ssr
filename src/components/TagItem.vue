<template>
  <li class="tag-item" :item="item">
    <router-link :to="'/tag/' + item.slug">{{item.name}}</router-link>
  </li>
</template>

<script>
  export default {
    name: 'TagItem',
    props: ['item'],
  }
</script>

<style scoped>

</style>
