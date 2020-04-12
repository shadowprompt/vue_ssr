<template>
  <section class="slave-container" :class="isOpen ? 'open' : ''">
    <i class="arrow-right" @click="onClick"></i>
    <recent-list></recent-list>
    <block :content="qr"></block>
  </section>
</template>

<script>
export default {
  name: 'SlaveList',
  data() {
    return {
      isOpen: true,
      qr: {
        title: '关注道招网公众帐号',
        image: '/qrcode.jpg',
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
