<template>
  <card :content="blockData"></card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'RelatedBlock',
  computed: {
    ...mapState(['relatedList']),
    blockData() {
      const result = [];
      for (let i = 0; i < this.relatedList.length; i = i + 3) {
        result.push(this.relatedList.slice(i, i + 3));
      }
      return {
        title: '相关文章',
        list: result,
      };
    },
  },
};
</script>
