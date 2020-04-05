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
  name: 'AsideMenu',
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
          path: '/#',
          name: '存档',
        },
        {
          icon: 'tag',
          path: '/#',
          name: '标签',
        },
        {
          icon: 'github',
          path: 'https://github.com/shadowprompt/',
          target: '_blank',
          name: 'Github',
        },
      ],
    };
  }
};
</script>
