<template>
  <span>
    <template v-if="data.href">
      <a :href="data.href" :target="data.target" class="inline-a">{{ data.text }}</a>
    </template>
    <template v-else>{{ data.text }}</template>
  </span>
</template>

<script>
  export default {
    name: 'SpanA',
    props: ['data']
  };
</script>
