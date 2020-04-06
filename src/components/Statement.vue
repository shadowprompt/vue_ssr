<template>
  <footer class="statements">
    <div class="left-state">
      <template v-for="item in leftStatements">
        <a
          v-if="item.href"
          :href="item.href"
          :title="item.title"
          class="state-item inline-a"
          >{{ item.title }}</a
        >
        <span v-else>{{ item.title }}</span>
      </template>
    </div>
    <div class="right-state">
      <template v-for="item in rightStatements">
        <a
          v-if="item.href"
          :href="item.href"
          :title="item.title"
          class="state-item inline-a"
          >{{ item.title }}</a
        >
        <span v-else>{{ item.title }}</span>
      </template>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Statement',
  data() {
    return {
      statements: [
        {
          title: '订阅',
          href: 'https://www.daozhao.com/feed',
          position: 'left',
        },
        {
          title: '道招网',
          href: 'https://www.daozhao.com/sitemap.xml',
          position: 'left',
        },
        {
          title: 'Draw lessons from hexo-theme-material-indigo',
          href: 'https://github.com/yscoder/hexo-theme-indigo',
          position: 'right',
        },
        {
          title: 'Redesigned by Shadow Prompt',
          position: 'right',
        },
      ],
    };
  },
  computed: {
    leftStatements() {
      return this.statements.filter((item) => item.position === 'left');
    },
    rightStatements() {
      return this.statements.filter((item) => item.position !== 'left');
    },
  },
};
</script>
