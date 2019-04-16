<template>
  <aside id="menu" :class="{ show }">
    <div class="inner flex-row-vertical">
      <profile></profile>
      <links :data="asides"></links>
    </div>
  </aside>
</template>

<script>
  import profile from './Profile';
  import links from './Links';
export default {
  name: 'DZAsideMenu',
  props: ['show'],
  components: {
    profile,
    links,
  },
  data() {
    return {
      asides: [
        {
          icon: 'home',
          path: '/',
          name: '主页',
        },
        {
          icon: 'archive',
          path: '/archive',
          name: '存档',
        },
        {
          icon: 'tag',
          path: '/tag',
          name: '标签',
        },
        {
          icon: 'github',
          path: 'https://shadowprompt.github.com',
          target: '_blank',
          name: 'Github',
        },
      ],
    };
  }
};
</script>

<style scoped></style>
