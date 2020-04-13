<template>
  <span>
    <template v-if="data.href">
      <a :href="data.href" :target="data.target" class="inline-a">{{ data.title }}</a>
    </template>
    <template v-else>
      <span class="inline-span">{{ data.title }}</span>
    </template>
  </span>
</template>

<script>
  export default {
    name: 'SpanA',
    props: ['data']
  };
</script>
