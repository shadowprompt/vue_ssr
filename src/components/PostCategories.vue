<template>
  <ul class="article-categories">
    <span v-if="text">{{text}}</span>
    <li-item v-for="item in data" class="category-item" :item="item" :key="item.term_id">
      <a :href="'/category/' + item.slug" class="inline-a">{{item.name}}</a>
    </li-item>
  </ul>
</template>

<script>
  export default {
    name: 'PostCategories',
    props: ['data', 'text'],
  };
</script>
