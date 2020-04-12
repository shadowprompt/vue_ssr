<template>
  <span class="author-item">{{data.display_name}}</span>
</template>

<script>
  export default {
    name: 'PostAuthor',
    props: ['data']
  };
</script>
