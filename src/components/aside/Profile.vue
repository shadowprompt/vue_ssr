<template>
  <div class="brand-wrap">
    <div class="brand">
      <div class="avatar waves-effect waves-circle waves-light">
        <img :src="avatarUrl" />
      </div>
        <h5 class="nickname">普若木特</h5>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    data() {
      return {
        avatarUrl: '/owner.jpg',
      };
    }
  }
</script>
