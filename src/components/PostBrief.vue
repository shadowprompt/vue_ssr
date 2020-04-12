<template>
  <section class="post-item">
    <div class="post-meta">
      <post-time :date="data.date" :date-url="data.dateUrl"></post-time>
      <post-categories :data="data.categories"></post-categories>
      <post-author :data="data.user"></post-author>
    </div>
    <a  class="post-title" :href="'/' + data.ID + '.html'">{{data.post_title}}</a>
    <article>{{briefContent}}</article>
    <section class="post-footer">
      <post-tags :data="data.tags"></post-tags>
    </section>
  </section>
</template>

<script>
  import { getSafeHtml } from '../utils';

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
  computed: {
    briefContent() {
      return getSafeHtml(this.data.post_content);
    },
  },
  data() {
    return {};
  },
};
</script>

