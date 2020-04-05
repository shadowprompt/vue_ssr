<template>
  <div id="goto" @click="handleGoto"><i class="fa fa-arrow-up"></i></div>
</template>

<script>
  export default {
    name: 'Jumper',
    methods: {
      handleGoto() {
        window.scrollTo(0, 0);
      },
    }
  };
</script>
