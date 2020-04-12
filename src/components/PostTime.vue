<template>
  <time><a :href="'/date/' + dateUrl" class="inline-a">{{date}}</a> </time>
</template>

<script>
  export default {
    name: 'PostTime',
    props: ['dateUrl', 'date']
  };
</script>
