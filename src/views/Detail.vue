<template>
  <div class="post-content-detail">
    <section class="post-detail-item fade" :class="$store.state.isLoading? 'in': ''">
      <h1>{{detail.post_title}}
      </h1>
      <article v-html="briefContent">
      </article>
    </section>
  </div>
</template>

<script>
import queryStr from '../schema/detail';

export default {
  data() {
    return {
      detail: {},
    };
  },
  computed: {
    briefContent() {
      return this.detail.post_content;
    },
  },
  async created() {
    const res = await this.$http.post('/graphql', {
      query: queryStr,
      variables: {
        id: this.$route.params.id,
      },
    });
    const {
      data: { data },
    } = res;
    this.detail = data.post;
  },
  beforeRouteLeave(to, from, next) {
    setTimeout(() => {
      next(); // 避免loading效果过快消失
    }, 400);
  },
};
</script>
