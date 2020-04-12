<template>
  <div class="archiveList">
    <div>月份存档</div>
    <links :data="archiveList" class="hover"></links>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'ArchiveLinks',
    computed: {
      ...mapState(['archiveList'])
    }
  }
</script>
