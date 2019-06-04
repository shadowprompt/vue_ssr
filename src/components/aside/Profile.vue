<template>
  <div class="brand-wrap">
    <div class="brand">
      <a href="/" class="avatar waves-effect waves-circle waves-light">
        <img :src="avatarUrl" />
      </a>
        <h5 class="nickname">普若木特</h5>
        <a
          href="mailto:634206017@qq.com"
          title="634206017@qq.com"
          class="mail"
        >634206017@qq.com</a
        >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DZProfile',
    data() {
      return {
        avatarUrl: require('../../assets/logo.png'),
      };
    }
  }
</script>
