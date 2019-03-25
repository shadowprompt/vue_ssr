<template>
  <section class="post-item">
    <div class="post-meta">
      <time>{{data.date}}</time>
      <ul class="article-categories">
        <li class="category-item" v-for="item in data.categories">{{item.name}}</li>
      </ul>
    </div>
    <router-link  class="post-title" :to="'/' + data.ID">{{data.post_title}}</router-link>
    <article v-html="briefContent"></article>
    <div class="post-footer">
      <ul class="article-tags">
        <li class="tag-item" v-for="item in data.tags">{{item.name}}</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
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

