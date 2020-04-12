<template>
  <ul class="links">
    <li
      v-for="(item, index) in data"
      :key="'li-' + index"
      class="waves-effect"
    >
      <a
        :href="item.href"
        :target="item.target ? item.target : '_self'"
        class="inline-link"
      >
        <i v-if="item.icon" :class="['fa', 'fa-' + item.icon]"></i>
        <span class="name">{{ item.title }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Links',
  props: ['data'],
};
</script>
