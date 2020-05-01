<template>
  <div class="tip">
    <span>如果您发现本文排版有问题，可以先点击下面的链接切换至老版进行查看！！！</span>
    <h4><span-a :data="info"></span-a></h4>
  </div>
</template>

<script>
  export default {
    name: 'Tip',
    props: ['data'],
    computed: {
      info() {
        return {
          title: this.data.post_title,
          href: `/${this.data.ID}.php`
        }
      },
    },
  };
</script>
