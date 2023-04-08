<template>
  <div id="app">
    <router-view></router-view>
    <div id="subscribe-area">
      <div id="subscribe-area-close"></div>
      <PWA />
      <PWA_HMS />
    </div>
  </div>
</template>

<script>
import PWA from './PWA.vue';
import PWA_HMS from './PWA_HMS.vue';
export default {
  name: 'App',
  components: {
    PWA,
    PWA_HMS,
  }
};
</script>
