<template>
  <section class="post-item">
    <div class="post-meta">
      <time>{{data.date}}</time>
      <ul class="article-categories">
        <category-item v-for="item in data.categories" :item="item" :key="item.term_id"></category-item>
      </ul>
    </div>
    <router-link  class="post-title" :to="'/' + data.ID + '.html'">{{data.post_title}}</router-link>
    <article v-html="briefContent"></article>
    <div class="post-footer">
      <ul class="article-tags">
        <tag-item v-for="item in data.tags" :item="item" :key="item.term_id"></tag-item>
      </ul>
    </div>
  </section>
</template>

<script>
  import CategoryItem from '../components/CategoryItem';
  import TagItem from '../components/TagItem';

export default {
  name: 'PostBrief',
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CategoryItem,
    TagItem,
  },
  computed: {
    briefContent() {
      return this.data.post_content.slice(0, 200);
    },
  },
  data() {
    return {};
  },
};
</script>

