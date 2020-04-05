<template>
  <li class="category-item" :item="item">
    <router-link :to="'/category/' + item.slug" class="inline-a">{{item.name}}</router-link>
  </li>
</template>

<script>
  export default {
    name: 'CategoryItem',
    props: ['item'],
  }
</script>
