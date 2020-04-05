<template>
  <section class="slave-container" :class="isOpen ? 'open' : ''">
    <i class="arrow-right" @click="onClick"></i>
    <block :content="recommend"></block>
    <block :content="qr"></block>
  </section>
</template>

<script>
import Block from '../common/Block';
export default {
  name: 'SlaveList',
  components: {
    Block,
  },
  data() {
    return {
      isOpen: true,
      styles: [
        {
          transform: 'translateX(147%)',
        },
        {
          transform: 'translateX(0)',
          right: 0,
        },
      ],
      recommend: {
        list: [
          {
            title:
              'webpack笔记——在html-webpack-plugin插件中提供给其它插件是使用的hooks',
            href: 'https://www.daozhao.com/8851.html',
          },
          {
            title: '从vuecli3学习webpack记录（四）vue是怎么进行默认配置的',
            href: 'https://www.daozhao.com/8849.html',
          },
          {
            title: 'webpack笔记——hook执行时call的是什么',
            href: 'https://www.daozhao.com/8845.html',
          },
          {
            title: '从vuecli3学习webpack记录（二）webpack分析',
            href: 'https://www.daozhao.com/8767.html',
          },
          {
            title: '从vuecli3学习webpack记录（零）整体流程',
            href: 'https://www.daozhao.com/8809.html',
          },
        ],
      },
      qr: {
        title: '关注道招网公众帐号',
        image: 'https://www.baidu.com/img/baidu_jgylogo3.gif'
      },
    };
  },
  methods: {
    onClick() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
