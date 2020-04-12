<template>
  <aside id="menu" :class="{ show }">
    <div class="inner flex-row-vertical">
      <profile></profile>
      <div class="scroll-wrap flex-col">
        <menu-list></menu-list>
        <archive-list></archive-list>
      </div>
    </div>
  </aside>
</template>

<script>
  import profile from './Profile';
  import MenuList from './MenuList';
  import ArchiveList from './ArchiveList';
export default {
  name: 'AsideMenu',
  props: ['show'],
  components: {
    profile,
    MenuList,
    ArchiveList,
  },
  data() {
    return {

    };
  }
};
</script>
