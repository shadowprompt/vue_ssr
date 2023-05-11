<template>
  <section class="block-item" :style="{minWidth: minWidth,height: height}" v-if="content">
    <h5 class="title" v-if="content.title">{{content.title}}</h5>
    <template v-if="Array.isArray(content.list)">
      <links :data="content.list"></links>
    </template>
    <template v-if="content.image">
      <img :src="content.image" :style="{maxWidth: maxWidth}"/>
    </template>
  </section>
</template>

<script>
  export default {
    name: 'Block',
    props: {
      minWidth: {
        default: '240px',
      },
      maxWidth: {
        default: '240px',
      },
      height: {
        default: ''
      },
      content: {
        required: true,
        type: [Object],
      }
    },
  };
</script>
