<template>
  <div
    class="mask"
    id="mask"
    :class="{ show: visible }"
    @click="TOGGLE_COLLAPSE(true)"
  ></div>
</template>
<script>
  import {mapMutations} from 'vuex';
  export default {
    name: 'DZMask',
    props: ['visible'],
    data() {
      return {
        // visible: false
      };
    },
    methods: {
      ...mapMutations(['TOGGLE_LOADING', 'TOGGLE_COLLAPSE']),
    }
  };

</script>
