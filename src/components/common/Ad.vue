<template>
  <div class="ad-container" :style="adInfo.style" v-if="adInfo._ad" v-html="adInfo._ad">
  </div>
</template>

<script>
export default {
  name: 'Ad',
  props: {
    type: {
      required: true,
    }
  },
  computed: {
    adInfo() {
      const adMap = this.$store.state.adMap || {};
      return adMap[this.type] || {};
    }
  }
}
</script>
