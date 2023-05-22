<template>
  <card :content="blockData"></card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'RelatedBlock',
  computed: {
    ...mapState(['relatedList', 'adMap']),
    blockData() {
      const result = [];
      const relatedList = [...this.relatedList];
      // 插入相关文章的广告位置
      const relatedAd = this.adMap['related'];
      if (relatedAd && relatedAd.html) {
        // 广告位的位置不能太靠前
        if (relatedList.length > 2) {
          relatedList.splice(-1, 0, {
            _isAd: true,
            type: 'related',
            ...relatedAd
          });
        } else {
          relatedList.push({
            _isAd: true,
            type: 'related',
            ...relatedAd
          });
        }
      }
      for (let i = 0; i < relatedList.length; i = i + 3) {
        result.push(relatedList.slice(i, i + 3));
      }
      return {
        title: '相关文章',
        list: result,
      };
    },
  },
};
</script>
