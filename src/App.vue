<template>
  <div id="app">
    <router-view></router-view>
    <div id="subscribe-area">
      <div id="subscribe-area-close"></div>
      <div class="subscribe-btn">安装</div>
      <HMS />
    </div>
  </div>
</template>

<script>
import HMS from './HMS.vue';
export default {
  name: 'App',
  components: {
    HMS,
  }
};
</script>
