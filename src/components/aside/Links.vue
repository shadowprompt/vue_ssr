<template>
  <div class="scroll-wrap flex-col">
    <ul class="nav">
      <li
        v-for="(item, index) in data"
        :key="'li-' + index"
        class="waves-block waves-effect"
      >
        <a
          :href="item.path"
          :target="item.target ? item.target : '_self'"
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
    name: 'DZLinks',
    props: ['data'],
  }
</script>
