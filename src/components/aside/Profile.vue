<template>
  <div class="brand-wrap">
    <div class="brand">
      <div class="avatar waves-effect waves-circle waves-light">
        <img :src="avatarUrl" />
      </div>
        <h5 class="nickname">锅巴匆匆</h5>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    data() {
      return {
        avatarUrl: '/_res/avatar.jpg',
      };
    }
  }
</script>
