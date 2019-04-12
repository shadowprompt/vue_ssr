<template>
  <div class="post-content-detail">
    <section class="post-detail-item anim" :class="$store.state.isLoading? 'in': ''">
      <h1>{{detail.post_title}}
      </h1>
      <article v-html="briefContent">
      </article>
    </section>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
import queryStr from '../schema/detail';

export default {
  componentName: '$detail',
  data() {
    return {
      // detail: {},
    };
  },
  computed: {
    ...mapState(['detail']),
    briefContent() {
      return this.detail.post_content;
    },
  },
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('_getDetail', {
      query: queryStr,
      variables: {
        id: route.params.id,
      },
    });
  },
  beforeRouteLeave(to, from, next) {
    setTimeout(() => {
      next(); // 避免loading效果过快消失
    }, 400);
  },
};
</script>
