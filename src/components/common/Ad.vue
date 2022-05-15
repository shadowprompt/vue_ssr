<template>
  <div class="ad-container" :style="adInfo.style" v-if="adInfo.html" v-html="adHtml">
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
    },
    adHtml() {
      return decodeURIComponent(this.adInfo.html || '')
    }
  }
}
</script>
