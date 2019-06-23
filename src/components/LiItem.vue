<template>
  <li class="tag-item" :style="{backgroundColor: bgColor}">
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'LiItem',
    props: ['bgColor'],
  }
</script>
