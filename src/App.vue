<template>
  <div id="app">
    <router-view></router-view>
<!--    <PWA_HMS />-->
    <Subscribe />
  </div>
</template>

<script>
import PWA_HMS from './PWA_HMS.vue';
import Subscribe from './components/common/Subscribe.vue';
export default {
  name: 'App',
  components: {
    PWA_HMS,
    Subscribe,
  }
};
</script>
