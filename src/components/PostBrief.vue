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
    <section class="post-footer">
      <ul class="article-tags">
        <li-item v-for="(item, index) in data.tags" :key="item.term_id" :bgColor="bgColors[index]">
          <router-link :to="'/tag/' + item.slug">{{item.name}}</router-link>
        </li-item>
      </ul>
    </section>
  </section>
</template>

<script>
  import {mapState} from 'vuex';
  import CategoryItem from '../components/CategoryItem';
  import LiItem from '../components/LiItem';

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
    LiItem,
  },
  computed: {
    ...mapState(['bgColors']),
    briefContent() {
      return this.data.post_content.slice(0, 200);
    },
  },
  data() {
    return {};
  },
};
</script>

