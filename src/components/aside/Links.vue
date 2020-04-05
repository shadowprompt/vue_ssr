<template>
  <div class="scroll-wrap flex-col">
    <ul class="links">
      <li
        v-for="(item, index) in data"
        :key="'li-' + index"
        class="waves-block waves-effect"
      >
        <a
          :href="item.path"
          :target="item.target ? item.target : '_self'"
          class="inline-link"
        >
          <i :class="['fa', 'fa-' + item.icon]"></i>
          <span class="name">{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Links',
    props: ['data'],
  }
</script>
