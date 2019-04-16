<template>
  <div class="brand-wrap">
    <div class="brand">
      <a href="/" class="avatar waves-effect waves-circle waves-light">
        <img :src="avatarUrl" />
      </a>
      <hgroup class="introduce">
        <h5 class="nickname">普若木特</h5>
        <a
          href="mailto:634206017@qq.com"
          title="634206017@qq.com"
          class="mail"
        >634206017@qq.com</a
        >
      </hgroup>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DZProfile',
    data() {
      return {
        avatarUrl: 'https://www.baidu.com/img/baidu_resultlogo@2.png',
      };
    }
  }
</script>
