<template>
  <li class="category-item" :item="item">
    <a :href="'/category/' + item.slug" class="inline-a">{{item.name}}</a>
  </li>
</template>

<script>
  export default {
    name: 'CategoryItem',
    props: ['item'],
  }
</script>
