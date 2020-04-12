<template>
  <li :style="{backgroundColor: backgroundColor}">
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'LiItem',
    props: ['bgColor', 'isActive'],
    computed: {
      backgroundColor() {
        return this.isActive ? '#df3473' : this.bgColor;
      }
    }
  }
</script>
