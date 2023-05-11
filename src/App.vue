<template>
  <div id="app">
    <router-view></router-view>
<!--    <PWA />-->
<!--    <PWA_HMS />-->
    <Subscribe />
  </div>
</template>

<script>
import PWA from './PWA.vue';
import PWA_HMS from './PWA_HMS.vue';
import Subscribe from './components/common/Subscribe.vue';
export default {
  name: 'App',
  components: {
    PWA,
    PWA_HMS,
    Subscribe,
  }
};
</script>
