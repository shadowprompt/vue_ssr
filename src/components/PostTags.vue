<template>
  <ul class="article-tags">
    <span v-if="text">{{text}}</span>
    <li-item v-for="(item, index) in data" class="page-item" :key="item.term_id" :bgColor="bgColors[index]">
      <a :href="'/tag/' + item.slug" class="inline-a">{{item.name}}</a>
    </li-item>
  </ul>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'PostTags',
    props: ['data', 'text'],
    computed: {
      ...mapState(['bgColors']),
    }
  };
</script>
