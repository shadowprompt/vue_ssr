<template>
  <section class="slave-container" :class="isOpen ? 'open' : ''">
    <i class="arrow-right" @click="onClick"></i>
    <recent-list></recent-list>
    <SubscribePanel />
    <block :content="qr"></block>
    <block :content="link"></block>
<!--    <block :content="wechatGroup"></block>-->
    <Ad type="slave"/>
  </section>
</template>

<script>
import Ad from '../common/Ad';
import SubscribePanel from '../common/SubscribePanel';
export default {
  name: 'SlaveList',
  components: {
    Ad,
    SubscribePanel,
  },
  data() {
    return {
      isOpen: true,
      link: {
        title: '友情链接',
        list: [{
          title: '运动记录转换工具',
          target: '_target',
          href: 'https://convert.fit'
        }]
      },
      qr: {
        title: '关注道招网公众帐号',
        image: '/_res/qrcode.jpg',
      },
      wechatGroup: {
        title: '联系博主',
        image: '/_res/wechat.jpg',
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
