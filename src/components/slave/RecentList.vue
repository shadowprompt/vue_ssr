<template>
  <block :content="recentData"></block>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'RecentList',
    computed: {
      ...mapState(['recentList']),
      recentData() {
        return {
          list: this.recentList,
        }
      },
    }
  };
</script>
