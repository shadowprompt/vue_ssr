<template>
  <section class="block-item" :style="{minWidth: minWidth,height: height}" v-if="content">
    <h5 class="title">{{content.title}}</h5>
    <template v-if="Array.isArray(content.list)">
      <p v-for="item in content.list">
        <a :href="item.href" class="pointer inline-a">{{item.title}}</a>
      </p>
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
        default: '200px',
      },
      maxWidth: {
        default: '200px',
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
