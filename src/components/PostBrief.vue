<template>
  <section class="post-item">
    <div class="post-meta">
      <time>{{data.date}}</time>
      <ul class="article-categories">
        <category-item v-for="item in data.categories" :item="item" :key="item.term_id"></category-item>
      </ul>
    </div>
    <a  class="post-title" :href="'/' + data.ID + '.html'">{{data.post_title}}</a>
    <article>{{briefContent}}</article>
    <section class="post-footer">
      <ul class="article-tags">
        <li-item v-for="(item, index) in data.tags" :key="item.term_id" :bgColor="bgColors[index]">
          <a :href="'/tag/' + item.slug" class="inline-a">{{item.name}}</a>
        </li-item>
      </ul>
    </section>
  </section>
</template>

<script>
  import {mapState} from 'vuex';
  import { getSafeHtml } from '../utils';
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
      return getSafeHtml(this.data.post_content);
    },
  },
  data() {
    return {};
  },
};
</script>

