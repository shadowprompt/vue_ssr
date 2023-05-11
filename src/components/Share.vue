<template>
  <span class="top-icon share-wrap">
    <i class="fa fa-share-alt"></i>
  </span>
</template>

<script>
  export default {
    name: 'Share',
    mounted() {
      this.$el.addEventListener('click', () => {
        if (navigator.share) {
          navigator.share({
            title: document.title,
            text: '关注互联网',
            url: location.href
          }).then(res => {
            console.log(' res-> ', res);
          }).catch(() => {});
        }
      });
    }
  };
</script>

<style scoped>

</style>
