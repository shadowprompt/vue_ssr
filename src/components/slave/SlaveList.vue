<template>
  <section class="slave-container" :class="isOpen ? 'open' : ''">
    <i class="arrow-right" @click="onClick"></i>
    <recent-list></recent-list>
    <block :content="qr"></block>
    <block :content="wechatGroup"></block>
    <Ad type="slave"/>
  </section>
</template>

<script>
import Ad from '../common/Ad';
export default {
  name: 'SlaveList',
  components: {
    Ad,
  },
  data() {
    return {
      isOpen: true,
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
