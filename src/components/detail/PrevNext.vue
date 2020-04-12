<template>
  <div class="post-detail-prev-next">
    <span class="pn-item">上一篇：<span-a :data="prevNext.prev"></span-a></span>
    <span class="pn-item">下一篇：<span-a :data="prevNext.next"></span-a></span>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'PrevNext',
    computed: {
      ...mapState(['prevNext']),
    }
  };
</script>
