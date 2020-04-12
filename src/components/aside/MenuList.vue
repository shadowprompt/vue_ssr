<template>
  <links :data="asides" class="hover"></links>
</template>

<script>
  export default {
    name: 'MenuList',
    data() {
      return {
        asides: [
          {
            icon: 'home',
            href: '/',
            title: '主页',
          },
          {
            icon: 'archive',
            href: '/#',
            title: '存档',
          },
          {
            icon: 'tag',
            href: '/#',
            title: '标签',
          },
          {
            icon: 'github',
            href: 'https://github.com/shadowprompt/',
            target: '_blank',
            title: 'Github',
          },
        ],
      }
    },
  };
</script>

<style scoped>

</style>
